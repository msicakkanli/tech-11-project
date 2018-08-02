'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const User = require('../models/users')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// set our port
app.set('port', process.env.PORT || 5000);

// mongodb connection
mongoose.connect("mongodb://localhost:27017/testapi");
var db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

// morgan gives us http request logging
app.use(morgan('dev'));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// TODO add additional routes here
var routes = require('../routes/index');
app.use('/', routes);


// uncomment this route in order to test the global error handler
// app.get('/error', function (req, res) {
//   throw new Error('Test error');
// });

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found'
  })
})

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
