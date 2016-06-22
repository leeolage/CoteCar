var express = require('express');
var morgan = require('morgan');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

var hostname = 'localhost';
var port = 8081;

app.use(express.static('public'));

app.get('/cadastro', function(req, res, next){
	fs.readFile('public/user.json', 'utf-8', function(err, data){
		var usuarios = JSON.parse(data);
		
		res.status(200);
		
		res.send(usuarios);
	});
});

app.post('/cadastro', function(req, res, next){
	var func = req.body;
	fs.readFile('public/user.json', 'utf-8', function(err, data){
		var lista = JSON.parse(data);
		lista.push(func);
		
		fs.writeFile('public/user.json', JSON.stringify(lista), 'utf-8', function(err){
			if(err){
				return console.log(err);
			}
			console.log('gravado user.json');
		});
		res.sendStatus(201);
	});
});

var server = app.listen(port, hostname, function(){
	console.log("Serv.Estatico em http://%s:%s", hostname, port);
});