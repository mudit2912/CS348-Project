// Dependencies
var Passport = require('passport').Passport;
var LocalStrategy = require('passport-local').Strategy;

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

// Sign In Logic
async function db_verifyUser(username, password, cb) {
    dbpool.getConnection((connect_err, conn)=>{
        if (connect_err) return cb(null, false, { message: 'Error connecting to the database.' });

        const query_str = 'SELECT pw FROM User WHERE username=?;';
        conn.query(query_str, [username],
            (query_err, result, fields) => {
            if (query_err) return cb(null, false, { message: 'Error querying Users.' });
            if (result.length === 0) return cb(null, false, { message: 'Username not found.' });
            if (result[0].pw !== password) return cb(null, false, { message: 'Incorrect password.' });
            return cb(null, {ok: true, username: username});
            }
        );
    });
}

// Initialize and export Passport
var authPassport = new Passport();

authPassport.use(new LocalStrategy(db_verifyUser));

authPassport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { username: user.username });
  });
});

authPassport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

module.exports = authPassport;
