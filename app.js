var express      = require('express'),
    path         = require('path'),
    favicon      = require('serve-favicon'),
    logger       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    load         = require('express-load'),
    session      = require('express-session'),
    mongoose     = require('mongoose'),
    flash        = require('express-flash'),
    validator    = require('express-validator'),
    moment       = require('moment');

// conexão com mongo db
mongoose.connect('mongodb://localhost/acadtec', function (err){
  if(err) {
    console.log('Erro ao conectar com mongodb: ' + err);
  } else {
    console.log('Conexão efetuada com sucesso!')
  }
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(validator());
app.use(cookieParser());
app.use(session({ secret: 'acadeteccurso' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

// helpers
app.use(function(req, res, next) {
  res.locals.session  = req.session.usuario;
  res.locals.isLogged = !!req.session.usuario;
  res.locals.moment   = moment;
  next();
});

load('models').then('controllers').then('routes').into(app);

// //middlewares
// app.use(errors.notfound);
// app.use(errors.serverError);

const port = '3000';

app.listen(port, function() {
  console.log('Application running on port ' + port);
});
