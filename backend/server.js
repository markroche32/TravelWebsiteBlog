var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var mysql = require('mysql');

var path = require('path');
var cors = require('cors')

//app.use(cors.permission)
// Initialize Express App
var app = express();

// Use Cors
app.use(cors());

// Use Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
//app.use('/', express.static(__dirname));
//app.use('/src', express.static(__dirname + '/src'));
///app.use('/src/styles', express.static(__dirname + '/src' + '/styles'));

app.use(express.static('uploads'));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/uploads', express.static('uploads'));

// Import API Routes
app.use(require('./api/user_api'));
app.use(require('./api/post_api'));

port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log("listening to port " + port);
})

