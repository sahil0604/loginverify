var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var semail = require('./senmail.js')
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'Sikander@786',
	database : 'nodelogin'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});
app.get('/email.html', function(request, response) {
	response.sendFile(path.join(__dirname + '/email.html'));
});
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.post('/forget', function(request, response) {
  var email = request.body.email;
  if(email) {
    connection.query('SELECT password FROM accounts WHERE email = ?', [email], function(error, results, fields) {
			if (results.length > 0) {
        semail.senemail(results[0].password,email);
				response.send('Password sent to email ');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
    
  }else {
		response.send('Please enter email!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(3000);