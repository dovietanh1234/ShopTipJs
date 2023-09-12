'use strict'

const mongoose = require('mongoose');
const _SECONDS = 5000;
const os = require('os');
const process = require('process');

// kiểm tra xem có bao nhiêu kết nối
const countConnect = () =>{
    // in mongoose.connections -> co tu 0 - 4 status
    const numConnection = mongoose.connections.length
    console.log(`Number of connection: ${numConnection}`)
}

//check kết nối quá tải:
const checkOverload = () => {
    // check monitor trong vòng mấy second 
    setInterval( ()=>{

        // check co bao nhieu ket noi
        const numConnection = mongoose.connections.length;
        // check CPU  -> chúng ta có bao nhiêu core trong máy tính của chúng ta
        const numCores = os.cpus().length;
        // lấy memory sử dụng:
        const memoryUsage = process.memoryUsage().rss;
  
// lấy memory sd ra chia với kb b thì sẽ ra: mb
        console.log(`Active connection: ${numConnection}`)
        console.log(`Memory usage: ${memoryUsage / 1024 / 1024 } MB`)
        

// ex: máy tôi mỗi core chịu đc 5 connection của mongoose db 
        const mexConnection = numCores * 5;
        // moi core chiu dc 5 connect ví du neu máy lấy ra đc 8 cores: 8 * 5 = 40 connects
        // vậy thì nếu nó vượt quá 40 connect thì ta báo nó bị vấn đề
        if(numConnection > mexConnection){
            console.log(`connection overload detected!`);
        }

    }, _SECONDS) // theo doi moi lan trong vong 5 giay
}

// bỏ file check vào folder dbs ... 
module.exports = {
    countConnect,
    checkOverload
}