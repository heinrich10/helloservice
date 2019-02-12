
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;

const jwtStrategy = require('../utils/jwt_strategy');

const strategy = new BearerStrategy(jwtStrategy);

passport.use(strategy);

module.exports = passport.authenticate('bearer', { session: false });
