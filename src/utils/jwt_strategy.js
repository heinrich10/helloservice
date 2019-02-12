
const { readFile } = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const ErrorObject = require('amk-error');

const filePath = path.join(__dirname, '../../sec/pub_key.pem');

module.exports = (token, cb) => {
	readFile(filePath, (err, file) => {
		if (err) {
			return cb(new ErrorObject('something went wrong', 500));
		}
		jwt.verify(token, file, (err1, decoded) => {
			if (err1) {
				return cb(new ErrorObject(err1.message, 401));
			}
			cb(err, decoded, { scope: 'all' });
		});
	});
};
