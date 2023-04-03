// Get environment variables
require('dotenv').config();

// Dependencies
const express = require('express');
var router = express.Router();
const session = require('express-session');

// Passport Strategy Imports
const authPassport = require('./auth/authStrategy.js');

// DB Imports
const mysql = require('mysql2');

// Establish connection to DB
const dbpool = mysql.createPool({
  connectionLimit: 10,
  host: 'mysqldb',
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Initialize Session
router.use(
  session({
    name: 'powerlifty.session',
    secret: '99965324ed67870143ff56894b5115a513cfa3359ffd48f851c1ca90014946b6',
    cookie: {
      maxAge: 60000 * 60 * 12, // 12 hours
      secure: false,
      sameSite: 'lax',
    },
    saveUninitialized: true,
    resave: false,
  })
);
router.use(authPassport.initialize());
router.use(authPassport.session());

// Auth Function
function verifyAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.json({ auth: false });
}

/*
 *   Route Handlers
 */

/* Auth Requests */

router.get('/auth/status', verifyAuth, (req, res) => {
  return res.json({ auth: true });
});

router.post(
  '/auth/login',
  authPassport.authenticate('local', {
    failureMessage: true,
    failWithError: true,
  }),
  function (req, res, next) {
    return res.json({ ok: true, location: '/' });
  },
  function (err, req, res, next) {
    if (err.status !== 401) {
      return res.json({ ok: false, location: '!401' });
    }
    return res.json({ ok: false, location: '/login' });
  }
);

router.post('/auth/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return res.json({ ok: false });
    }
    return res.json({ ok: true });
  });
});

router.post('/auth/signup', async function (req, res, next) {
  dbpool.getConnection((connect_err, conn) => {
    if (connect_err)
      return res.status(500).json({ msg: 'Error connecting to the database.' });

    const person_query_str =
      'INSERT INTO Person (first_name, last_name, gender, date_of_birth) VALUES (?,?,?,?);';
    conn.query(
      person_query_str,
      [
        req.body.first_name,
        req.body.last_name,
        req.body.gender,
        req.body.date_of_birth,
      ],
      (person_err, result, a) => {
        if (person_err)
          return res.status(500).json({ msg: 'Error creating Person.' });

        const user_query_str =
          ' INSERT INTO User (id, username, email, pw) VALUES (?, ?, ?, ?);';
        conn.query(
          user_query_str,
          [
            result.insertId,
            req.body.username,
            req.body.email,
            req.body.password,
          ],
          (user_err, results, b) => {
            if (user_err)
              return res.status(500).json({ msg: 'Error creating User.' });
            return res.status(200).json({ success: true });
          }
        );
      }
    );
  });
});

/* User Requests */

router.post('/user/info', async function (req, res, next) {
  dbpool.getConnection((connect_err, conn) => {
    if (connect_err)
      return res.status(500).json({ msg: 'Error connecting to the database.' });

    const query_str =
      'SELECT username, pfp_url, bio FROM User WHERE username=?;';
    conn.query(query_str, [req.body.username], (query_err, result, fields) => {
      if (query_err)
        return res.status(500).json({ msg: 'Error querying Users.' });
      if (result.length === 0)
        return res.status(404).json({ msg: 'Username not found.' });
      return res.status(200).json({
        username: result[0].username,
        pfp_url: result[0].pfp_url,
        bio: result[0].bio,
      });
    });
  });
});

/* Home Feed */

router.post('/home/getfeed', verifyAuth, async function (req, res, next) {
  dbpool.getConnection((connect_err, conn) => {
    if (connect_err)
      return res.status(500).json({ msg: 'Error connecting to the database.' });

    const query_str =
      'SELECT User.username, User.pfp_url, Lifts.best3benchkg, Lifts.best3squatkg, Lifts.best3deadliftkg, Lifts.totalkg, M.name, M.date FROM Favourites AS fav JOIN Lifts ON fav.powerlifter_id = Lifts.powerlifter_id JOIN Meet AS M ON Lifts.meet_id = M.meet_id JOIN User ON fav.powerlifter_id = User.id WHERE fav.user_id IN (SELECT id FROM User WHERE username = ?) ORDER BY M.date DESC;';
    conn.query(query_str, [req.user.username], (query_err, result, fields) => {
      console.log(query_err);
      if (query_err) return res.status(500).json({ msg: 'Error querying DB.' });
      if (result.length === 0)
        return res
          .status(404)
          .json({ msg: 'No favorited lifters / lifts found.' });
      return res.status(200).json(result);
    });
  });
});

/* Head to Head Requests */

router.post('/h2h/compare', async function (req, res, next) {
  dbpool.getConnection((connect_err, conn) => {
    if (connect_err)
      return res.status(500).json({ msg: 'Error connecting to the database.' });

    var returnjson = { users: {}, lifts: {} };
    const id_query_str =
      'SELECT id, username, pfp_url, bio FROM User WHERE username IN (?,?);';
    conn.query(
      id_query_str,
      [req.body.liftera, req.body.lifterb],
      (id_query_err, id_result, id_fields) => {
        if (id_query_err)
          return res.status(500).json({ msg: 'Error querying DB.' });
        if (id_result.length !== 2)
          return res
            .status(404)
            .json({ msg: 'One of the lifters was not found!' });

        returnjson.users = id_result;
        const query_str =
          'SELECT s.powerlifter_id as id, m.name as meet_name, m.date as meet_date, m.state as meet_state, m.country as meet_country, best3benchkg, best3squatkg, best3deadliftkg, totalkg, wilks, mccullough, glossbrenner, ipfp_points FROM Scores as s INNER JOIN Meet as m ON s.meet_id = m.meet_id AND s.powerlifter_id = ? INNER JOIN Lifts as l ON s.meet_id = l.meet_id AND l.powerlifter_id = ? UNION SELECT s.powerlifter_id as id, m.name as meet_name, m.date as meet_date, m.state as meet_state, m.country as meet_country, best3benchkg, best3squatkg, best3deadliftkg, totalkg, wilks, mccullough, glossbrenner, ipfp_points FROM (SELECT * from Scores where Scores.powerlifter_id = ?) as s INNER JOIN Meet as m ON s.meet_id = m.meet_id INNER JOIN Lifts as l ON s.meet_id = l.meet_id and l.powerlifter_id = ? ORDER BY meet_date DESC;';
        conn.query(
          query_str,
          [id_result[0].id, id_result[0].id, id_result[1].id, id_result[1].id],
          (query_err, result, fields) => {
            console.log(query_err);
            if (query_err)
              return res.status(500).json({ msg: 'Error querying DB.' });
            if (result.length === 0)
              return res.status(404).json({ msg: 'No lifts found.' });
            returnjson.lifts = result;
            return res.status(200).json(returnjson);
          }
        );
      }
    );
  });
});

/* Leaderboard Requests */

router.post('/toplifts/global', async function (req, res, next) {
  dbpool.getConnection((connect_err, conn) => {
    if (connect_err)
      return res.status(500).json({ msg: 'Error connecting to the database.' });

    const query_str =
      'SELECT id, first_name, last_name, totalkg FROM Person, Lifts WHERE Person.id = Lifts.powerlifter_id ORDER BY totalkg DESC LIMIT ?;';
    conn.query(query_str, [req.body.limit], (query_err, result, fields) => {
      if (query_err) return res.status(500).json({ msg: 'Error querying DB.' });
      if (result.length === 0)
        return res.status(404).json({ msg: 'No lifts found.' });
      return res.status(200).json(result);
    });
  });
});

router.post('/toplifts/national', async function (req, res, next) {
  dbpool.getConnection((connect_err, conn) => {
    if (connect_err)
      return res.status(500).json({ msg: 'Error connecting to the database.' });

    const query_str =
      'SELECT id, first_name, last_name, totalkg FROM Person, Lifts WHERE Person.id = Lifts.powerlifter_id AND meet_id IN (SELECT meet_id FROM Meet WHERE country = ?) ORDER BY totalkg DESC LIMIT ?;';
    conn.query(
      query_str,
      [req.body.country, req.body.limit],
      (query_err, result, fields) => {
        if (query_err)
          return res.status(500).json({ msg: 'Error querying DB.' });
        if (result.length === 0)
          return res.status(404).json({ msg: 'No lifts found.' });
        return res.status(200).json(result);
      }
    );
  });
});

router.post('/users', async function (req, res, next) {
  dbpool.getConnection((connect_err, conn) => {
    if (connect_err)
      return res.status(500).json({ msg: 'Error connecting to the database.' });

    const query_str = `SELECT * FROM User WHERE username LIKE '%${req.body.username}%';`;

    conn.query(query_str, (query_err, query_result, fields) => {
      if (query_err) return res.status(500).json({ msg: query_err });
      if (query_result.length === 0)
        return res.status(404).json({ msg: 'Username not found.' });

      return res.status(200).json({ lifts: query_result });
    });
  });
});

/* Catch all non-defined requests */

router.get('/*', (req, res) => {
  res.sendStatus(502);
});

module.exports = router;
