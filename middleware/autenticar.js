module.exports = function (req, res, next) {
	if (req.session.usuario) {
		return next();
	}
	return res.redirect('/');
}