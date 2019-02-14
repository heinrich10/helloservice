const express = require('express');
const responseTime = require('response-time');
const errorHandler = require('api-error-handler');
const wrap = require('amk-wrap');

const auth = require('./middlewares/auth');
const HelloController = require('./controllers/hello_controller');

module.exports = () => {
	const app = express();

	const helloController = new HelloController();

	app.use(responseTime());
	app.get('/hello', auth(), wrap(helloController.hello));
	app.use(errorHandler());

	return app;
};
