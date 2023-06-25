const categoryService = require('../services/category.services');

/**
 * TẠO MỚI DANH MỤC
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const createCategory = async (req, res, next) => {
    try {
        const data = await categoryService.addCategory(req.body);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

/**
 * GET LIST DANH MỤC
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getCategory = async (req, res, next) => {
    try {
        const data = await categoryService.getListCategory();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createCategory,
    getCategory
}