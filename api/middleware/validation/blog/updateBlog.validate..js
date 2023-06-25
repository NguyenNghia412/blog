const { checkSchema } = require("express-validator");

const updateBlogValidateSchema = checkSchema({
    id: {
        exists: {
            errorMessage: "Id bài tin không được bỏ trống",
            options: {
                checkFalsy: true,
            }
        },
    },
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
    updateBlogValidateSchema
}