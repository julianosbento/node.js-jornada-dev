module.exports = function (app) {
	var home = app.controllers.home;
	var autenticar = require ('../middleware/autenticar');
	app.route('/')
    .get(home.login)
		.post(home.autentication);
	app.route('/home').get(autenticar, home.index);
	app.route('/logout').get(autenticar, home.logout);
};