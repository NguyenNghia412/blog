const { checkSchema } = require("express-validator");

const createBlogValidateSchema = checkSchema({
    title: {
        exists: {
            errorMessage: "Tiêu đề bài tin không được bỏ trống",
            options: {
                checkFalsy: true,
            }
        },
    },
    content: {
        exists: {
            errorMessage: "Nội dung không được bỏ trống",
            options: {
                checkFalsy: true,
            }
        },
    },
    category: {
        exists: {
            errorMessage: 'Danh mục không hợp lệ',
            options: {
                checkFalsy: true,
            }
        },
        
    },
});

module.exports = {
    createBlogValidateSchema
}