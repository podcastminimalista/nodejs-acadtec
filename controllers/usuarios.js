var moment    = require('moment');
var validacao = require('../validators/usuarios');

module.exports = function(app){
	var Usuario = app.models.usuarios;

	var UsuarioController = {
		index: function(req,res){
			Usuario.find(function(err,data){
				if(err){
					req.flash('erro', 'Erro ao cadastrar: '+err);
					res.render('usuarios/index',{lista: null});		
				}
				res.render("usuarios/index", {lista: data, moment: moment});
			});			
		},

		create: function(req,res){
			res.render('usuarios/create', {user : new Usuario()});
		},
		
		post: function(req,res){			
			if(validacao(req,res,app)){
				var model      = new Usuario();
				model.nome     = req.body.nome;
				model.blog     = req.body.blog;
				model.email    = req.body.email;
				model.password = model.generateHash(req.body.password);
				Usuario.findOne({'email': model.email}, function(err,data){
					if(data){
						req.flash('erro', 'E-mail encontra-se cadastrado, tente outro.');
  						res.render('usuarios/create', {user: model});
					}else{
						model.save(function(err){				 
							if(err){						
								req.flash('erro', err);
  								res.render('usuarios/create', {user: model});
							}else{
								req.flash('info','Usuário cadastrado com sucesso!');
								res.redirect('/usuarios');
							}				
						});
					}
				});				
			}else{
				res.render('usuarios/create', {user: req.body});
			}						
		},

		show: function(req,res){
			Usuario.findById(req.params.id, function(err,data){
				if(err){
					req.flash('erro', 'Erro ao carregar usuário: '+err);
					res.redirect('/usuarios');
				}else{
					res.render('usuarios/show',{usuario: data, moment: moment});
				}
			});
		}
	}

	return UsuarioController;
}