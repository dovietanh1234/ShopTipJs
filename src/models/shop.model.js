'use strict'

// !mdbgum + tab để tạo schema có sẵn cho nhanh
const {model, Schema, Types} = require('mongoose'); // Erase if already required

// chạy dự án phải tạo collection shop & shops
const DOCUMENT_NAME = 'Shop'
const COLLECTION_NAME = 'Shops'
var shopSchema = new Schema({
    name:{
        type:String,
        trim: true,
        maxLength: 150
    },
    email:{
        type:String,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['active', 'inactive'],
        default: 'inactive'
    },
    verify: { // verify account is exist 
        type: Schema.Types.Boolean,
        default: false
    },
    roles: { // authenticate
        type: Array,
        default: []
    }
},{
    timeseries: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, shopSchema);