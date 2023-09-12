'use strict'

const mongoose = require('mongoose');
const { db: {host, name, port} } = require('../configs/config.mongodb'); // su dung file config luu gia tri nhay cam

const connectString = `mongodb://${host}:${port}/${name}`;
mongoose.connect(connectString)
    .then(_ => console.log(`connected MongoDB success`))
    .catch(error => console.log(`error connected`))

if( 1 === 1 ){
    mongoose.set('debug', true)
    mongoose.set('debug', {color: true})
}

module.exports = mongoose