module.exports = function(app){

	var usuario = app.controllers.usuarios;

	app.route('/usuarios').get(usuario.index);
}