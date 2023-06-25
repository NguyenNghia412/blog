const express = require('express');
const passport = require('passport');
const { createBlog, getPagingBlog, updateBlog, getBlog, deleteBlog } = require('../controllers/blog.controller');
const { queryPagingValidateSchema } = require('../middleware/validation/base/queryPaging.validate');
const { validate } = require('../middleware/validation/error.validate');
const { updateBlogValidateSchema } = require('../middleware/validation/blog/updateBlog.validate.');
const { createBlogValidateSchema } = require('../middleware/validation/blog/createBlog.validate');
const router = express.Router();

router.post('/blog', passport.authenticate('jwt', {
    session: false,
}), createBlogValidateSchema, validate, createBlog);
router.put('/blog', passport.authenticate('jwt', {
    session: false,
}), updateBlogValidateSchema, validate, updateBlog);
router.delete('/blog/:blogId', passport.authenticate('jwt', {
    session: false,
}), deleteBlog);
router.get('/blog/:blogId', passport.authenticate('jwt', {
    session: false,
}), getBlog);
router.get('/blog', queryPagingValidateSchema, validate, passport.authenticate('jwt', {
    session: false,
}), getPagingBlog);

module.exports = router;