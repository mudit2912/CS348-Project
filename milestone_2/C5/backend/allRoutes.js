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
  return res.json({ auth: true, username: req.user.username });
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

router.post('/user/favourite/toggle', async function (req, res, next) {
  dbpool.getConnection((connect_err, conn) => {
    if (connect_err) return res.status(500).json({msg: 'Error connecting to the database.'});
    const check_query_str = 'SELECT user_id FROM Favourites WHERE user_id=? AND powerlifter_id=?;';
    conn.query(check_query_str, [req.body.userId, req.body.targetId], (check_err, check_result, check_fields) => {
      if (check_err) {
        return res.status(500).json({msg: 'Database query error.'});
      }
      if (check_result && check_result[0] && check_result[0].user_id !== undefined) {
        // Remove favorite
        const delete_query_str = 'DELETE FROM Favourites WHERE user_id=? AND powerlifter_id=?;';
        conn.query(delete_query_str, [req.body.userId, req.body.targetId], (delete_err, delete_result, delete_fields) => {
          if (delete_err) {
            return res.status(500).json({msg: 'Error unfavouriting user.'});
          }
          else return res.status(200).json({msg: 'Successfully unfavourited user.'});
        });
      } else {
        // Add favorite
        const insert_query_str = 'INSERT INTO Favourites (user_id, powerlifter_id) VALUES (?,?);';
        conn.query(insert_query_str, [req.body.userId, req.body.targetId], (insert_err, insert_result, insert_fields) => {
          if (insert_err) {
            return res.status(500).json({msg: 'Error favouriting user.'});
          }
          else return res.status(200).json({msg: 'Successfully favourited user.'});
        });
      }
    });
  });
});

router.post('/user/info', async function (req, res, next) {
  dbpool.getConnection((connect_err, conn) => {
    if (connect_err)
      return res.status(500).json({ msg: 'Error connecting to the database.' });

    const query_str =
      'SELECT username, pfp_url, bio, id FROM User WHERE username=?;';
    conn.query(query_str, [req.body.username], (query_err, result, fields) => {
      if (query_err) {
        return res.status(500).json({ msg: 'Error querying Users.' });
      }
      if (result.length === 0) {
        return res.status(404).json({ msg: 'Username not found.' });
      }

      const id_query_str = 'SELECT id FROM User WHERE username=?;';
      conn.query(id_query_str, [req.user.username], (id_err, id_result, id_fields) => {
        const fav_status_str = 'SELECT user_id FROM Favourites WHERE user_id=? AND powerlifter_id=?';
        conn.query(fav_status_str, [id_result[0].id, result[0].id], (fav_err, fav_result, fav_fields) => {
          const is_faved = fav_result?.[0]?.user_id ? true : false;
          return res.status(200).json({
            username: result[0].username,
            pfp_url: result[0].pfp_url,
            bio: result[0].bio,
            faved: is_faved,
            userId: id_result[0].id,
            targetId: result[0].id
          });
        });
      });
    });
  });
});

router.put("/updateProfile", async function (req, res) {
  const { id, pfp_url, username, bio } = req.body;

  dbpool.getConnection((connect_err, conn) => {
    if (connect_err) return res.status(500).json({ msg: "Error connecting to the database." });


    const update_query_str = "UPDATE User SET pfp_url = ?, username = ?, bio = ? WHERE username = ?;";
    conn.query(update_query_str, [pfp_url, username, bio, req.user.username], (update_err, result) => {
      if (update_err) return res.status(500).json({ msg: "Error updating User profile." });
      return res.status(200).json({ success: true });
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

router.post('/admin/lifts/new', async function (req, res, next) {
  dbpool.getConnection((connect_err, conn) => {
    if (connect_err) return res.status(500).json({ msg: 'Error connecting to the database.' });
    const id_query_str = 'Select * from Powerlifter as PL join (Select U.id from User as U Join Person as P on P.id = U.id where P.id = ?) as T on PL.id = T.id;';
    conn.query(id_query_str, [req.body.powerlifter_id],
      (id_query_err, id_result, id_fields) => {
        if (id_query_err) return res.status(500).json({ msg: 'Error querying the Powerlifter table.' });
        if (id_result.length == 0) return res.status(404).json({ msg: 'User is not a powerlifter' });

        const id_query_str = 'Select * from Meet where meet_id = ?;';
        conn.query(id_query_str, [req.body.meet_id],
          (id_query_err, id_result, id_fields) => {
            if (id_query_err) return res.status(500).json({ msg: 'Error querying Meet table.' });
            if (id_result.length == 0) return res.status(404).json({ msg: 'Meet does no exist' });

            const query_str = 'INSERT INTO Scores(powerlifter_id, meet_id, wilks, mccullough, glosbrenner, ipfp_points) VALUES(?, ?, ?, ?, ?, ?);';
            conn.query(query_str, [req.body.powerlifter_id, req.body.meet_id, req.body.wilks, req.body.mccullough, req.body.glosbrenner, req.body.ipfp_points],
              (query_err, result, fields) => {
                if (query_err) return res.status(500).json({ msg: 'Error Inserting into Scores table.' });

                const query_str ='INSERT INTO Lifts (powerlifter_id, meet_id, bench1kg, bench2kg, bench3kg, best3benchkg, squat1kg, squat2kg, squat3kg, best3squatkg,deadlift1kg, deadlift2kg, deadlift3kg, best3deadliftkg, totalkg) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
                conn.query(query_str, [req.body.powerlifter_id, req.body.meet_id, req.body.bench1kg, req.body.bench2kg, req.body.bench3kg, req.body.best3benchkg, req.body.squat1kg, req.body.squat2kg, req.body.squat3kg, req.body.best3squatkg, req.body.deadlift1kg, req.body.deadlift2kg, req.body.deadlift3kg, req.body.best3deadliftkg, req.body.totalkg],
                  (query_err, result, fields) => {
                    if (query_err) return res.status(500).json({ msg: 'Error Inserting into Lifts table.' });

                    const query_str ='INSERT INTO Person_Meet_Info (powerlifter_id, meet_id, division, weight_class, place) VALUES(?, ?, ?, ?, ?);';
                    conn.query(query_str, [req.body.powerlifter_id, req.body.meet_id, req.body.divison, req.body.division, req.body.weight_class, req.body.place],
                      (query_err, result, fields) => {
                        if (query_err) return res.status(500).json({ msg: 'Error Inserting into Person_Meet_Info table.' });
                        return res.status(200).json({success: true});                     
                      }
                    );
                  })
              });
          });
      })
  })
})

router.post('/admin/meet/new', async function (req, res, next) {
  dbpool.getConnection((connect_err, conn) => {
    if (connect_err) return res.status(500).json({ msg: 'Error connecting to the database.' });

    const id_query_str = 'select * from Meet where meet_id = ?;';
    conn.query(id_query_str, [req.body.meet_id],
      (id_query_err, id_result, id_fields) => {
        if (id_query_err) return res.status(500).json({ msg: 'Error querying the Meet table.' });
        if (id_result.length != 0) return res.status(404).json({ msg: 'meet_id already in use or meet already exists' });

        const query_str = 'INSERT into Meet(meet_id, name, date, state, country, federation) Values(?, ?, ?, ?, ?, ?);';
        conn.query(query_str, [req.body.meet_id, req.body.name, req.body.date, req.body.state, req.body.country, req.body.federation],
          (query_err, id_result, id_fields) => {
            if (query_err) return res.status(500).json({ msg: 'Error Inserting into Meet table.' });
            return res.status(200).json({ success: true });
          });
      });
  });
})


router.post('/insertLift', async function (req, res, next) {
  dbpool.getConnection((connect_err, conn) => {
    if (connect_err) return res.status(500).json({ msg: 'Error connecting to the database.' });

    const id_query_str = 'Select * from Powerlifter as PL join (Select U.id from User as U Join Person as P on P.id = U.id where U.username = ?) as T on PL.id = T.id;';
    conn.query(id_query_str, [req.user.username],
      (id_query_err, id_result, id_fields) => {
        if (id_query_err) return res.status(500).json({ msg: 'Error querying the Powerlifter table.' });
        if (id_result.length == 0) return res.status(404).json({ msg: 'User is not a powerlifter' });
        var pl_id = id_result[0].id;

        const id_query_str = 'Select * from Meet where meet_id = ?;';
        conn.query(id_query_str, [req.body.meet_id],
          (id_query_err, id_result, id_fields) => {
            if (id_query_err) return res.status(500).json({ msg: 'Error querying Meet table.' });
            if (id_result.length == 0) return res.status(404).json({ msg: 'Meet does no exist' });

            const query_str = 'INSERT INTO Scores(powerlifter_id, meet_id, wilks, mccullough, glosbrenner, ipfp_points) VALUES(?, ?, ?, ?, ?, ?);';
            conn.query(query_str, [pl_id, req.body.meet_id, req.body.wilks, req.body.mccullough, req.body.glosbrenner, req.body.ipfp_points],
              (query_err, result, fields) => {
                if (query_err) return res.status(500).json({ msg: 'Error Inserting into Scores table.' });

                const query_str = 'INSERT INTO Lifts (powerlifter_id, meet_id, bench1kg, bench2kg, bench3kg, best3benchkg, squat1kg, squat2kg, squat3kg, best3squatkg,deadlift1kg, deadlift2kg, deadlift3kg, best3deadliftkg, totalkg) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
                conn.query(query_str, [pl_id, req.body.meet_id, req.body.bench1kg, req.body.bench2kg, req.body.bench3kg, req.body.best3benchkg, req.body.squat1kg, req.body.squat2kg, req.body.squat3kg, req.body.best3squatkg, req.body.deadlift1kg, req.body.deadlift2kg, req.body.deadlift3kg, req.body.best3deadliftkg, req.body.totalkg],
                  (query_err, result, fields) => {
                    if (query_err) return res.status(500).json({ msg: 'Error Inserting into Lifts table.' });

                    const query_str = 'INSERT INTO Person_Meet_Info (powerlifter_id, meet_id, division, weight_class, place) VALUES(?, ?, ?, ?, ?);';
                    conn.query(query_str, [pl_id, req.body.meet_id, req.body.divison, req.body.division, req.body.weight_class, req.body.place],
                      (query_err, result, fields) => {
                        if (query_err) return res.status(500).json({ msg: 'Error Inserting into Person_Meet_Info table.' });
                        return res.status(200).json({ success: true });
                      }
                    );
                  })
              });
          });
      })
  })
})

/* Catch all non-defined requests */

router.get('/*', (req, res) => {
  res.sendStatus(502);
});

module.exports = router;
