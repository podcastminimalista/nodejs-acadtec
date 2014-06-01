module.exports = function(app){

	var home = app.controllers.home;

	app.route('/').get(home.index);
}