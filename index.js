/* eslint-disable no-console */

const express = require('express');
const responseTime = require('response-time');
const errorHandler = require('api-error-handler');
const wrap = require('amk-wrap');

const auth = require('./src/middlewares/auth');

const app = express();


// validators
// const HelloValidator = require('./src/validator/hello_validator');

//controllers
const HelloController = require('./src/controllers/hello_controller');

// instantiate controllers
const helloController = new HelloController();

app.use(responseTime());
app.get('/hello', auth, wrap(helloController.hello));
app.use(errorHandler());

app.listen(6020, () => {
	console.log('running');
});
