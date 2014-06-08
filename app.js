var express      = require('express');
var path         = require('path');
var favicon      = require('static-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var load         = require('express-load');
var mongoose     = require('mongoose');
var flash 		 = require('express-flash');
var expressValidator = require('express-validator');
var app 		 = express();

//conectar ao banco mongodb
mongoose.connect('mongodb://localhost/acadtec2', function(err){
	if (err){
    	console.log('Erro ao conectar no mongodb: '+err);
  	}
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressValidator());
app.use(cookieParser());
app.use(session({ secret: 'sua-chave-secreta' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

load('models').then('controllers').then('routes').into(app);

//middleware
var erros = require('./middleware/erros');
app.use(erros.notfound);
app.use(erros.serverError);

app.listen(3000, function() {
    console.log('Express server listening on port 3000');
});
