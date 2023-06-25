const env = require('./env');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.JWT_SECRET_KEY
}
// opts.jwtFromRequest = ;
// opts.secretOrKey = 'secret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

module.exports = new JwtStrategy(opts, function (jwt_payload, done) {
    return done(null, jwt_payload?.data);
})