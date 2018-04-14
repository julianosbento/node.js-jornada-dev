module.exports = function (req, res) {
	req.assert('email', 'E-mail inválido').isEmail();
	req.assert('password', 'Sua senha deve conter de 6 à 10 caracteres');

	var validateErrors = req.validationErrors() || [];

	if (validateErrors.length > 0) {
		validateErrors.forEach(function(e) {
			req.flash({ 'erro' : e.msg })
		});
		return false;
	} else {
		return true;
	}
}