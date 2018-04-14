var url = require('url');

module.exports = function (req, res) {
	var createUrl = url.parse(req.url).pathname == "/usuarios/create";
	var	updateUrl = !createUrl;

	req.assert('nome', 'Informe o seu Nome.').notEmpty();
	if (createUrl) {
		req.assert('email', 'E-mail inválido.').isEmail();
		req.assert('password', 'Sua senha deve conter de 6 à 10 caracteres.').len(6, 10);
	}
	req.assert('site', 'Site não é uma URL válida.').isURL();

	var validateErrors = req.validationErrors() || [];

	// verificar se a senha confere
	if (req.body.password != req.body.password_confirmar) {
		validateErrors.push({ msg : 'Senha não confere.' });
	}

	console.log(validateErrors);

	if (validateErrors.length > 0) {
		validateErrors.forEach(function(e) {
			req.flash('erro', e.msg);
		});
		return false;
	} else {
		return true;
	}
}