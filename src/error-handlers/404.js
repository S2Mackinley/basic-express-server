'use strict';

module.exports = (req, res, next) => {
	res.status(404).send({
		error: 404,
		msg: 'Page not Found',
		route: req.path,
	});
	next();
};
