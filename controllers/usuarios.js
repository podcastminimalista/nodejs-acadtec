module.exports = function(app){
	var Usuario = app.models.usuarios;

	var UsuarioController = {
		index: function(req,res){
			res.render('usuarios/index');
		}
	}

	return UsuarioController;
}