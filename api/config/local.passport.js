const LocalStrategy = require('passport-local').Strategy;
const _userService = require('../services/users.services');

module.exports = new LocalStrategy(async (username, password, done) => {
    try {
        var success = await _userService.login({username, password});
        if (!success) {
            return done(null, false);
        }
        return done(null, true);    
    } catch (error) {
        done(error);
    }
    
})