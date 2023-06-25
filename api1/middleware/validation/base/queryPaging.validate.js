const { checkSchema } = require("express-validator");

const queryPagingValidateSchema = checkSchema({
    pageNumber: {
        isNumeric: {
            errorMessage: 'Số trang phải là số'
        },
        custom: {
            options: value => {
                if (value < 1) {
                    return Promise.reject('Số trang phải lớn hơn 0');
                }
                return true;
            }
        }
    },
    pageSize: {
        isNumeric: {
            errorMessage: 'Số bản ghi phải là số'
        },
        custom: {
            options: value => {
                if (value < 1) {
                    return Promise.reject('Số bản ghi 1 trang phải lớn hơn 0');
                }
                return true;
            }
        }
    },
});

module.exports = {
    queryPagingValidateSchema
}