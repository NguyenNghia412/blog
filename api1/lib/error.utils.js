/**
 * THÔNG BÁO LỖI
 * @param {*} code 
 * @param {*} msg 
 */
const throwError = (code) => {
    const err = new Error('Có sự cố xảy ra');
    err.code = code;
    Object.keys(ERROR_CODE).forEach(key => {
        const error = ERROR_CODE[key];
        if (error.code === code) {
            err.msg = error.msg;
        }
    })
    throw err;
}

const ERROR_CODE = {
    USERNAME_SDT_EMAIL_DA_DUOC_DUNG: { code: 1, msg: 'Username, sdt hoặc email đã được sử dụng để đăng ký'},
    PASSWORD_KO_CHINH_XAC: {code: 2, msg: 'Mật khẩu không chính xác'},
    USER_NOT_FOUND: {code: 3, msg: 'Tài khoản không tồn tại'},
    CATEGORY_NOT_FOUND: {code: 4, msg: 'Danh mục không tồn tại'},
    CATEGORY_NAME_DUPLICATE: {code: 5, msg: 'Tên danh mục đã có'},
}

module.exports = { throwError, ERROR_CODE }