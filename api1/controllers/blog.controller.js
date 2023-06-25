const blogServices = require("../services/blog.services");

/**
 * Đăng blog
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const createBlog = async (req, res, next) => {
    try {
        const data = await blogServices.createBlog(req.body, req.user);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

/**
 * CẬP NHẬT BLOG
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const updateBlog = async (req, res, next) => {
    try {
        const data = await blogServices.updateBlog(req.body, req.user);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

/**
 * PHÂN TRANG BLOG
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getPagingBlog = async (req, res, next) => {
    try {
        const data = await blogServices.getPagingBlog(req.query);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

/**
 * GET 1 BLOG
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getBlog = async (req, res, next) => {
    try {
        const data = await blogServices.getBlog(req.params);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

/**
 * XOÁ MỀM BLOG
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const deleteBlog = async (req, res, next) => {
    try {
        const data = await blogServices.deleteBlog(req.params);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    createBlog,
    getPagingBlog,
    getBlog,
    updateBlog,
    deleteBlog,
}