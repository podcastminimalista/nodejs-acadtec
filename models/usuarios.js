var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

module.exports = function(){

	var usuarioSchema = mongoose.Schema({
		nome     : {type: String, trim: true},
		email    : {type: String},
		blog     : {type: String},
		password : {type: String},
		data_cad : {type: Date, default: Date.now}
	});

	usuarioSchema.methods.generateHash = function(password) {
    	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	};

	return mongoose.model('Usuarios',usuarioSchema);
}