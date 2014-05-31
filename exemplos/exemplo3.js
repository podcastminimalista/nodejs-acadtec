var http = require('http');
var url  = require('url');

var server = http.createServer(function(req,res){
	res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'});
	
	if(req.url == '/'){
		res.write('<h1>Página -> Home</h1>');
	}else if(req.url == '/clientes'){
		res.write('<h1>Página -> Clientes</h1>');
	}
	else{
		res.write('<h1>404 - Página não encontrada!</h1>');	
	}

	//Usando url
	var result = url.parse(req.headers.host + req.url);
	res.write('href: '+result.href);

	res.end();	
});

server.listen(3000,function(){
	console.log('Servidor rodando...');
});