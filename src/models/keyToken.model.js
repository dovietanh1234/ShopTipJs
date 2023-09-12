'use strict'

const {model, Schema} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'Keys'

// Declare the Schema of the Mongo model
var KeyTokenSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Shop'
    },
    publicKey:{
        type:String,
        required:true
    },
    refreshToken:{ // chuc nang phat hien hacker da su dung trai phep token nay 
        type:Array,
        default:[]
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

//Export the model
module.exports = model(DOCUMENT_NAME, KeyTokenSchema);

/* nhiệm vụ key store này là chứa Key public của mỗi user trong đó
ta sẽ chứa một cái array gọi là refresh token Đế sau này ta phát hiện đc những token đã
sử dụng rồi chúng ta phát hiện điểm nghi vấn ta sẽ check ở trong này 
nhiệm vụ mang lại tính bảo mật nhất cho hệ thống   */