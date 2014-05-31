var http = require('http');

//req = request, res = response
var server = http.createServer(function(req,res){
	res.writeHead(200,{'Content-type':'text/plain'});
	res.write('Hello Word!');
	res.end();
});

server.listen(3000, function(){
	console.log('Servidor rodando...');
})