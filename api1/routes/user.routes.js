const express = require('express');
const userController = require('../controllers/user.controller');
const passport = require('passport');
const { createUserValidateSchema } = require('../middleware/validation/user/createUser.validate');
const { validate } = require('../middleware/validation/error.validate');
const router = express.Router();

router.post('/token', passport.authenticate('local', {
    session: false,
}), userController.login);
router.post('/user/register', createUserValidateSchema, validate, userController.register);

module.exports = router;