const express = require('express');
const morgan = require('morgan');
const { default: helmet } = require('helmet');
const app = express();
const compression = require('compression');
require('dotenv').config();

// init middleware:
app.use( morgan("dev") )
    // lưu ý: morgan có 5 chế độ (các chế độ này sẽ print thông tin của request trên console.log)
    // chế độ 1: morgan("dev") -> sd cho dev, đầu ra ngắn gọn, code status được tô màu( để phục vụ cho mục đích phát triển )
    // chế độ 2: morgan("combined") -> sd cho product, đi theo tiêu chuẩn của Apache, đầu ra của nhật ký kết hợp với tiêu chuẩn apache (xuất hiện: IP' request, status, time request, method )
    // chế độ 3: morgan("common") -> đổ ra nhật ký chung theo tiêu chuẩn của apache
    // chế độ 4: morgan("short") -> thông báo mặc định ngắn ( chỉ bao gồm thời gian phản hồi )
    // chế độ 5: morgan("tiny") -> print ra status request ngắn nhất 

app.use(helmet());
    //helmet sẽ ngăn chặn bên thứ 3 vào đọc cookie, headers, thông tin công nghệ chúng ta sử dụng … 
app.use(compression())
    // khi chúng ta vận chuyển một dữ liệu lớn nó ví dụ (141kb) sd compression sẽ giảm 100 lần chỉ còn (1,4kb) -> giảm số lượng data được gửi đi
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
    // Sử dụng giúp chuyền dữ liệu qua body -> mở rộng đường chuyền trên url cho phép để chuyền dữ liệu lớn  

// init database:

    //kết nối db level 0
    //require('./dbs/mongoDB.lv0');

    //kết nối db bằng single turn pattern:
    require('./dbs/connect.mongoDB');
    const {checkOverload} = require('./helper/check.connect');
    // gọi hàm để theo dõi server:
    // checkOverload(); 
   
// init routers
app.use('/', require('./routers'))


// handling error




module.exports = app