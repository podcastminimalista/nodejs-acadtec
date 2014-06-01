var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

module.exports = function(){

	var usuarioSchema = mongoose.Schema({
		nome: String,
		email: String,
		password: String,
		data_cad: {type: Date, default: Date.now}
	});

	usuarioSchema.methods.generateHash = function(password) {
    	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	};

	return mongoose.model('Usuarios',usuarioSchema);
}