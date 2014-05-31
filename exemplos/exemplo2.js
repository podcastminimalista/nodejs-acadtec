var http     = require('http')
	,arquivo = require('fs');

var server = http.createServer(function(req,res){
	res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});

	arquivo.readFile(__dirname+'/arquivos/index.html',function(err, html){
		if (err) {
			res.write('Arquivo index.html não encontrado.');
		}else{
			res.write(html);
		}		
		res.end();
	});	
});

server.listen(3000, function(){
	console.log('Servidor rodando...');
});