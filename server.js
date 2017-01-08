var express = require('express');  
var app = express();  
var path = require('path');
var server = require('http').Server(app);
app.use(express.static(path.resolve(__dirname, 'test')));
app.use('/vendor',express.static(path.resolve(__dirname, 'bower_components')));
app.use('/src',express.static(path.resolve(__dirname, 'src')));
app.use('/data',express.static(path.resolve(__dirname, 'data')));
server.listen(3225, function() {
	var addr = server.address();
	console.log("Corriendo servidor de pruebas en 127.0.0.1:"+ addr.port+"\nUse esta URL en su navegador para visualizar resultados de las pruebas automatizadas");
});
app.use(function(req, res, next) {
  res.status(404).send({code:404,message:"No existe la ruta!"});
});