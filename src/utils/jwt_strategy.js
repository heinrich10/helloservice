
const jwt = require('jsonwebtoken');
const ErrorObject = require('amk-error');

const registry = require('../lib/registry');

module.exports = (token, cb) => {
	jwt.verify(token, registry.pubKey, (err, decoded) => {
		if (err) {
			return cb(new ErrorObject(err.message, 401));
		}
		cb(err, decoded, { scope: 'all' });
	});
};
