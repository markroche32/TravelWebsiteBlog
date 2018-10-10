var bcrypt = require('bcrypt');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'webpackcli'
});

connection.connect(function() {
	console.log("Database posts connected");
});


module.exports.findAll = function(callback) {
	connection.query("SELECT * FROM posts ORDER BY id DESC", callback);
}


module.exports.addPost = function(data, callback) {
	connection.query("INSERT INTO posts SET ?", data, callback);
}

module.exports.updatePost = function(data, callback) {
	connection.query("UPDATE posts SET ? WHERE id = '" + data.id + "'", data, callback);
}

module.exports.findByUsername = function(username, callback) {
	connection.query("SELECT * FROM posts WHERE username = '" + username + "'", callback);
}

module.exports.findByUsernamePassword = function(username, password, callback) {
	connection.query("SELECT * FROM posts WHERE username = '" + username + "' AND password = '" + password + "'", callback);
}


module.exports.findByID = function(postid, callback) {
	connection.query("SELECT * FROM posts WHERE id = '" + postid + "'", callback);
}

module.exports.deleteByID = function(postid, callback) {
	connection.query("DELETE FROM posts WHERE id = '" + postid + "'", callback);
}

module.exports.encrypt = function(data, callback) {
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(data.password, salt, callback);
	})
}

module.exports.sendResponse = function(success, res) {
	if(success) {
		res.send({'success': 'true'});
	} else {
		res.send({'success': 'false'});
	}
}