'use strict'

// file sử dụng framework lodash để trả về dữ liệu cho client gọn nhẹ hơn 
// lodash nguoi ta hay ky hieu bang gach duoi
const _ = require('lodash');

// viết để tái sử dụng lại:
const getInfoData = ({ fields = [], object = {} }) => {
    return _.pick( object, fields )
}

module.exports = {
    getInfoData
}