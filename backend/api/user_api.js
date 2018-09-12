var express = require('express');
var app = express();

// Import User Module Containing Functions Related To User Data
var user = require('../models/user');

// API Routes
app.get('/', function (req, res) {

	user.findAll(function (err, rows, fields) {

		if (err) throw err;

		//console.log("Mark Info = " + "err = " + JSON.stringify(err) + "rows = " + JSON.stringify(rows) + "fields = " + JSON.stringify(fields));
		res.json(rows);
	})
});


// API Get User By (:id)
app.get('/user/(:id)', function (req, res) {

	var userID = req.params.id;
	user.findByID(userID, function (err, rows, fields) {

		if (err) throw err;

		console.log("Mark Info = " + "err = " + JSON.stringify(err) + "rows = " + JSON.stringify(rows) + "fields = " + JSON.stringify(fields));
		res.json(rows);
	})
});


// API Get User By (:id)
app.get('/usernamePassword/(:username)/(:password)', function (req, res) {
	
		var username = req.params.username;
		var password = req.params.password;
		user.findByUsernamePassword(username, password, function (err, rows, fields) {
	
			if (err) throw err;
	
			console.log("Mark Info = " + "err = " + JSON.stringify(err) + "rows = " + JSON.stringify(rows) + "fields = " + JSON.stringify(fields));
			console.log("row[0] = " + JSON.stringify(rows[0]));
			res.json(rows[0]);
		})
	});



app.delete('/user/(:id)', function (req, res) {

	var userID = req.params.id;
	user.deleteByID(userID, function (err, rows, fields) {

		if (err) throw err;
		console.log(rows);
		user.sendResponse(true, res);
	})

});


app.post('/adduser', function (req, res, next) {

	var data = req.body;

	console.log("user = " + data);
	console.log("user stringify= " + JSON.stringify(data));
	user.findByUsername(data.username, function (err, rows, fields) {
		if (rows.length == 1) {
			user.sendResponse(false, res);
		} 
		else {
			user.addUser(data, function (err, info) {
				if (err) throw err;
				
			    data['id'] = info['insertId'];
			    res.json(data);	
			});
		};
	});
});




app.post('/adduserEncrypt', function (req, res, next) {

	var data = req.body;
	user.findByUsername(data.username, function (err, rows, fields) {
		if (rows.length == 1) {
			user.sendResponse(false, res);
		} else {
			user.encrypt(data, function (err, hash) {
				data = {
					username: data.username,
					hashedpassword: hash
				};
				user.addUser(data, function (err, info) {
					if (err) throw err;
					console.log(info);
					console.log("inserted id = " + info["insertId"]);

					//res.send({'success': 'true', 'id' : info["insertId"]});

					data['id'] = info['insertId'];
					res.json(data);

					//user.sendResponse(true, res);
				});
			});
		};
	});
});

module.exports = app;
