
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;

const jwtStrategy = require('../utils/jwt_strategy');

module.exports = () => {
	const strategy = new BearerStrategy(jwtStrategy);

	passport.use(strategy);
	return passport.authenticate('bearer', { session: false });
};
