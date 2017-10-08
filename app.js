/**
* Module dependencies.
*/

const express = require('express');
const    routes = require('./routes');
const http = require('http');
const path = require('path');
const fs = require('fs');

const cors = require('cors')

var app = express();

var fileToUpload;

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.use('/', routes);

http.createServer(app).listen(app.get('port'), '0.0.0.0', function() {
  console.log('Express server listening on port ' + app.get('port'));
});
