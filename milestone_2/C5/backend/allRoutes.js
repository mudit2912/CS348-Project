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
  database: process.env.MYSQL_DATABASE
});

// Initialize Session
router.use(session({
  name: 'powerlifty.session',
	secret: '99965324ed67870143ff56894b5115a513cfa3359ffd48f851c1ca90014946b6',
	cookie: {
		maxAge: 60000 * 60 * 12, // 12 hours
		secure: false,
    sameSite: "lax"
	},
	saveUninitialized: true,
  resave: false
}));
router.use(authPassport.initialize());
router.use(authPassport.session());

// Auth Function
function verifyAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.json({'auth': false});
}


/*
*   Route Handlers
*/


/* Auth Requests */
router.get('/auth/status', verifyAuth, (req, res) => {
  return res.json({ 'auth': true });
});

router.post('/auth/login', authPassport.authenticate('local', {
  failureMessage: true,
  failWithError: true
}),
function(req, res, next) {
  return res.json({ ok: true, location: '/' });
},
function(err, req, res, next) {
  if (err.status !== 401) {
    return res.json({ ok: false, location: '!401' });
  }
  return res.json({ ok: false, location: '/login' });
});

router.post('/auth/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) {
      return res.json({ok: false});
    }
    return res.json({ok: true});
  });
});

router.post('/auth/signup', async function (req, res, next) {
  dbpool.getConnection((connect_err, conn)=>{
    if (connect_err) return res.status(500).json({msg: 'Error connecting to the database.'});
    
    const person_query_str = 'INSERT INTO Person (first_name, last_name, gender, date_of_birth) VALUES (?,?,?,?);';
    conn.query(person_query_str, [req.body.first_name, req.body.last_name, req.body.gender, req.body.date_of_birth],
      (person_err, result, a) => {
        if (person_err) return res.status(500).json({msg: 'Error creating Person.'});
        
        const user_query_str = ' INSERT INTO User (id, username, email, pw) VALUES (?, ?, ?, ?);';
        conn.query(user_query_str, [result.insertId, req.body.username, req.body.email, req.body.password],
          (user_err, results, b) => {
            if (user_err) return res.status(500).json({msg: 'Error creating User.'});
            return res.status(200).json({success: true});
          }
        );
      }
    );
  });
});

/* User Requests */

router.post('/user/info', async function (req, res, next) {
  dbpool.getConnection((connect_err, conn)=>{
    if (connect_err) return res.status(500).json({msg: 'Error connecting to the database.'});

    const query_str = 'SELECT username, pfp_url, bio FROM User WHERE username=?;';
    conn.query(query_str, [req.body.username],
      (query_err, result, fields) => {
        if (query_err) return res.status(500).json({msg: 'Error querying Users.'});
        if (result.length === 0) return res.status(404).json({msg: 'Username not found.'});
        return res.status(200).json({username: result[0].username, pfp_url: result[0].pfp_url, bio: result[0].bio});
      }
    );
  });
});

/* Leaderboard Requests */

router.post('/toplifts/global', async function (req, res, next) {
  dbpool.getConnection((connect_err, conn)=>{
    if (connect_err) return res.status(500).json({msg: 'Error connecting to the database.'});

    const query_str = 'SELECT id, first_name, last_name, totalkg FROM Person, Lifts WHERE Person.id = Lifts.powerlifter_id ORDER BY totalkg DESC LIMIT ?;';
    conn.query(query_str, [req.body.limit],
      (query_err, result, fields) => {
        console.log(query_err);
        if (query_err) return res.status(500).json({msg: 'Error querying DB.'});
        if (result.length === 0) return res.status(404).json({msg: 'No lifts found.'});
        return res.status(200).json(result);
      }
    );
  });
});

router.post('/toplifts/national', async function (req, res, next) {
  dbpool.getConnection((connect_err, conn)=>{
    if (connect_err) return res.status(500).json({msg: 'Error connecting to the database.'});

    const query_str = 'SELECT id, first_name, last_name, totalkg FROM Person, Lifts WHERE Person.id = Lifts.powerlifter_id AND meet_id IN (SELECT meet_id FROM Meet WHERE country = ?) ORDER BY totalkg DESC LIMIT ?;';
    conn.query(query_str, [req.body.country, req.body.limit],
      (query_err, result, fields) => {
        console.log(query_err);
        if (query_err) return res.status(500).json({msg: 'Error querying DB.'});
        if (result.length === 0) return res.status(404).json({msg: 'No lifts found.'});
        return res.status(200).json(result);
      }
    );
  });
});

/* Catch all non-defined requests */

router.get('/*', (req, res) => {
  res.sendStatus(502);
})

module.exports = router;
