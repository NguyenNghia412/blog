const { checkSchema } = require("express-validator");

const createUserValidateSchema = checkSchema({
    username: {
        exists: {
            errorMessage: "Username không được bỏ trống",
            options: {
                checkFalsy: true,
            }
        },
    },
    password: {
        exists: {
            errorMessage: "Mật khẩu không được bỏ trống",
        },
        isLength: {
            options: {
                min: 6,
                max: 32
            },
            errorMessage: "Mật khẩu phải có độ dài từ 6 đến 32 ký tự",
        },
    },
    email: {
        isEmail: {
            errorMessage: 'Email không hợp lệ',
        }
    },
    phone: {
        isLength: {
            options: {
                max: 10
            },
            errorMessage: 'Số điện thoại phải là 10 ký tự'
        }
    }
});

module.exports = {
    createUserValidateSchema
}