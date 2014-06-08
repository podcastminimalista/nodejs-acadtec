var url = require('url');

module.exports = function(req,res,app){
	var usuarioModel = app.models.usuarios;
	var creatingUser = url.parse(req.url).pathname == "/usuarios/create";	
  	var updatingUser = !creatingUser;   	

  	req.assert('nome', 'Informe seu Nome.').notEmpty();  	  	
  	req.assert('email', 'E-mail inválido.').isEmail();  	
  	req.assert('blog', 'Blog é uma url inválida.').isURL();
  
  	if(creatingUser || (updatingUser && req.body.password)){
    	req.assert('password', 'Sua senha deve conter 6 ou 10 caracteres.').len(6, 10);
  	}    	

  	var validationErrors = req.validationErrors() || [];

  	//Verifica se as senhas são iguais
  	if (req.body.password != req.body.passwordConfirmation){
    	validationErrors.push({msg:"Senha e Confirmar Senha não confere."});
  	}
  	
  	if (validationErrors.length > 0){    		
    	validationErrors.forEach(function(e){
      		req.flash('erro', e.msg);      		      		
    	});
    	return false;
  	}
  	return true;
}