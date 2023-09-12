'use strict'

const mongoose = require('mongoose');
 // check how many connect:
 const { countConnect } = require('../helper/check.connect'); // chi sd trong khi check status cua server 
 const { db: {host, name, port} } = require('../configs/config.mongodb');

const connectString = `mongodb://${host}:${port}/${name}`;

// áp dụng single turn pattern + strategy pattern (sau này)
    class Database {
        // nếu init trong này có thể sử dụng strategy pattern để connect tới nhiều DB 

        // gọi vào class constructor được khởi tạo đầu tiên
        constructor(){
            this.connect()
        }

        // có thể thay thế 'type' bằng oracle, mysql, sql server ...
        // tạo hàm connect
        connect( type = 'mongodb' ){

// ở cái đoạn này -> sau này tập chung vào code nghiệp vụ business Model service nó sẽ phát huy tác dụng 
// Nó sẽ Print lại all hoạt động của chúng ta -> khi chúng ta query             
            if( 1 === 1 ){
                mongoose.set('debug', true)
                mongoose.set('debug', {color: true})
            }
            // if( 1 == 1 ) ->  môi trường dev nó sẽ print ra log còn product thì thôi!

            mongoose.connect(connectString, {
                maxPoolSize: 50
            })
                .then(_ => {console.log(`connected MongoDB by single turn pattern success`),
                countConnect(); // goi ham check how many connect in here 
            })
                .catch(error => console.log(`error connected`))
        }

        // tạo hàm getInstance nếu kết DB rồi thì chạy vào instance 
        // nếu chưa khởi tạo một DB mới 
        static getInstance(){
            if( !Database.instance ){
                Database.instance = new Database()
            }

            return Database.instance;
        }

    }

    const instanceMongodb = Database.getInstance();

    module.exports = instanceMongodb;