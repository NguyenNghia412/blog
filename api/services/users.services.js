const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { throwError, ERROR_CODE } = require("../lib/error.utils");
const env = require("../config/env");

/**
 * Đăng nhập
 * @param {*} body 
 * @returns 
 */
const login = async (body) => {
    const { username, password } = body;

    const user = await User.findOne({username}).exec();

    if (user !== null) {
        if (!bcrypt.compareSync(password, user.password)) {
            throwError(ERROR_CODE.PASSWORD_KO_CHINH_XAC.code);
        }

        const secretKey = env.JWT_SECRET_KEY;
        const data = {
            userId: user._id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            displayName: user.displayName,
        };
        const accessToken = jwt.sign({
            data,
        }, secretKey, {
            expiresIn: 60 * 60
        });

        return {
            accessToken
        };
    }
    throwError(ERROR_CODE.USER_NOT_FOUND.code);
}

/**
 * Đăng ký tài khoản
 * @param {*} param0 
 * @returns 
 */
const createUser = async ({ username, password, displayName, email, phone }) => {
    const listUser = await User.find({
        $or: [{ username }, { email }, { phone }]
    }).exec();

    if (listUser.length > 0) {
        throwError(ERROR_CODE.USERNAME_SDT_EMAIL_DA_DUOC_DUNG.code);
    }

    const user = await User.create({
        username,
        password: genPassword(password),
        displayName,
        email,
        phone
    });

    return user;
}

/**
 * SINH MẬT KHẨU
 * @param {*} plaintext 
 * @returns 
 */
const genPassword = (plaintext) => {
    const saltRounds = 10;

    const result = bcrypt.hashSync(plaintext, saltRounds);
    console.log('result: ', result);
    return result;
}

module.exports = {
    login,
    createUser
}