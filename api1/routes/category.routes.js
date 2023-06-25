const express = require('express');
const passport = require('passport');
const { createCategory, getCategory } = require('../controllers/category.controller');
const router = express.Router();

router.post('/category', passport.authenticate('jwt', {
    session: false,
}), createCategory);

router.get('/category', passport.authenticate('jwt', {
    session: false,
}), getCategory);

module.exports = router;