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

app.get('/cadastro', function(req, res, next){
	fs.readFile('public/user.json', 'utf-8', function(err, data){
		var usuarios = JSON.parse(data);		
		res.status(200);		
		res.send(usuarios);
	});
});

app.get('/cadastro/:pos', function(req, res, next){
	var codigo = parseInt(req.params.pos);
	fs.readFile('public/user.json', 'utf-8', function(err, data){
		var usuariosCadastrados = JSON.parse(data);
		for(usuario in usuariosCadastrados){
			if(usuariosCadastrados[usuario].codigo == codigo){				
				return res.status(200).send(usuariosCadastrados[usuario]);
			}
		}		
		res.status(404);
		res.send('Usuário não encontrado');
	});
});

app.put('/cadastro/:pos', function(req, res, next){
	var func = req.body;
	var codigo = parseInt(req.params.pos);
	fs.readFile('public/user.json', 'utf-8', function(err, data){
		var usuariosCadastrados = JSON.parse(data);
		var usuarioExiste = false;
		for(usuario in usuariosCadastrados){
			if(usuariosCadastrados[usuario].codigo == codigo){
				usuariosCadastrados[usuario] = func;
				usuarioExiste = true;
			}
		}
		if(usuarioExiste){
			fs.writeFile('public/user.json', JSON.stringify(usuariosCadastrados), 'utf-8', function(err){
				if(err){
					return console.log(err);
				}
				console.log('gravado user.json');
			});
			res.sendStatus(201);
		}else{
			res.status(404).send('Usuário não existe.');
		}
	});
});

app.delete('/cadastro/:pos', function(req, res, next){
	var codigo = parseInt(req.params.pos);
	fs.readFile('public/user.json', 'utf-8', function(err, data){
		var usuariosCadastrados = JSON.parse(data);
		var usuarioExiste = false;
		for(usuario in usuariosCadastrados){
			if(usuariosCadastrados[usuario].codigo == codigo){
				usuariosCadastrados.splice(usuario, 1);
				usuarioExiste = true;
			}
		}
		if(usuarioExiste){
			fs.writeFile('public/user.json', JSON.stringify(usuariosCadastrados), 'utf-8', function(err){
				if(err){
					return console.log(err);
				}
				console.log('gravado user.json');
			});
			res.sendStatus(204);
		}else{
			res.status(404).send('Usuário não existe.');
		}
	});
});

var server = app.listen(port, hostname, function(){
	console.log("Serv.Estatico em http://%s:%s", hostname, port);
});