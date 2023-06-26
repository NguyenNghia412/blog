const express = require('express');
const passport = require('passport');
const { postFile } = require('../controllers/files.controller');
const router = express.Router();

/**
 * UPLOAD FILE
 */
router.post('/files', passport.authenticate('jwt', {
    session: false,
}), postFile );

module.exports = router;