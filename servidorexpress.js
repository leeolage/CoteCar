var express = require('express');
var morgan = require('morgan');
var app = express();
app.use(morgan('dev'));

var hostname = 'localhost';
var port = 8081;

app.use(express.static('public'));

var server = app.listen(port, hostname, function(){
	console.log("Serv.Estatico em http://%s:%s", hostname, port);
});