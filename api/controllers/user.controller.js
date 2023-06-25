const userService = require('../services/users.services');

const login = async (req, res, next) => {
    try {
        const data = await userService.login(req.body);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

const register = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(200).json({
            user
        })
    } catch (error) {
        next(error);
    }
}


module.exports = {
    login, register
}