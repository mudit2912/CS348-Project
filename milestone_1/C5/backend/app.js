// Dependencies
require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

// Express App Config
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS Config
var corsWL = ['http://localhost:3000', 'http://localhost:8008', 'http://127.0.0.1:8008', 'http://127.0.0.1:3000'];
var corsOptions = {
  origin: function (origin, callback) {
    if (corsWL.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
};

app.use(cors(corsOptions)); //adding cors middleware to the express with above configurations

// Middleware Routes
const allRoutes = require('./allRoutes.js');

app.use('/api', allRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
	console.log(`listening to requests on port ${PORT}`);
});
