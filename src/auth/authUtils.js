'use strict'

const JWT = require('jsonwebtoken');
// viết create token ở đây 
// payload -> mang theo khối lượng gì đó để chúng ta mã hoá để đẩy trong file token 
const createTokenPair = async (payload, publicKey, privateKey)=>{
    try{
        //step 1: create accesstoken through privateKey
        // privateKey ko luu vao DB no chi dien ra 1 lan khi chung ta sign in or chung ta login thanh cong no se dc day qua browser
        const accessToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days'
        })

        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days'
        })
        
        // publicKey dùng để giải mã -> publicKey lấy từ mongose DB 
        JWT.verify(accessToken, publicKey, (error, decode)=>{
            if(error){
                console.error(`error verify:  `, error)
            }else{
                console.log('decode:  '+ decode);
            }
        })


        return {accessToken, refreshToken}

    }catch(error){
        return null;
    }
}

module.exports = {
    createTokenPair
}
/*
nếu như bthg ta sử dụng một cái key secret  để vừa sign vừa verify -> thì nó là một sai lầm phổ biến hiện nay
-> khi họ bắt được cái Key secret của chúng ta thì người ta có thể verify chữ ký của chúng ta đồng thời -> Họ có thể tạo ra chữ ký của chúng ta
 vì vậy ta phải tách ra làm 2 key là private & public key 
*/