'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const {getInfoData} = require('../utils/index');

const RoleShop = {
    SHOP:  'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}


class AccessService{

// chung ta se lam viec nhieu voi model & package 
// ta se viet static cho no nhanh, dynamic -> khi goi package . mot cai ra function luon
static signUp = async ( {name, email, password} )=>{
    try{

        // step 1: check if email already exist or not 
        const holderShop = await shopModel.findOne({email}).lean();
        // method: lean() -> giup chung ta query rat nhanh vi no tra ve cho chung ta 1 object js thuan tuy!
        if(holderShop){
            return {
                code: 'xxxx',
                message: 'email already exist'
            }
        }
        // step 2: create account
        const passwordHash =  await bcrypt.hash(password, 10)
        const newShop = await shopModel.create({
            name, email, password: passwordHash, roles: [RoleShop.SHOP]
        })

        //step 3: return refresh token & access token
        if(newShop){
          // created privateKey, publicKey
          // sử dụng crypto trong node js de check -> 'rsa' thuat toan bat doi xung

          // đoạn này bị thiếu cần bổ sung publicKeyEncoding ...   
          const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
              type: 'pkcs1',  //public key cryptoGraphy standards -> tieu chuan ma hoa bat doi xung 
              format: 'pem', //privacy -> mot dinh dang de ma hoa thanh du lieu nhi phan 
              //-> dinh nghia cac cu phap danh cho chu ky cua RSA, là cơ chế mã hoá và giải mã hoá cho rsa 
            },
            privateKeyEncoding: {
              type: 'pkcs1', 
              format: 'pem', 
            }
          })

          console.log({privateKey, publicKey}) // save in DB collection keyStore!

          // save public key vao DB mongose ( public key sẽ chuyển sang hash string lưu vào DB -> chứ RSA public key row ko thể lưu vào mongose DB )
          const publicKeyString = await KeyTokenService.createKeyToken({
            userId: newShop._id,
            publicKey
          })

          // khi mà chúng ta lấy public key từ mongose DB -> thì chúng ta sẽ chuyền thành public key 

          if(!publicKeyString){
            return {
                code: 'xxx',
                message: 'publicString Error',
                status: 'error'
            }
          }

          // neu save public key save thành công vào DB ta sẽ tạo 1 cặp token access token & refresh token -> đẩy về user
          // tạo ra 1 cặp token:
          // và ở đây đưa vào hàm createTokenPair-> phải là một public key đã được .toString() chứ ko phải là một publicKey row
          // tại vì: khi chúng ta lưu cái public token này bằng một cái string





          // khi mà chúng ta lấy public key từ mongose DB ra -> thì chúng ta sẽ chuyền thành public key 
          const publicKeyObject = crypto.createPublicKey( publicKeyString )

          console.log('publicKeyObject: ' + publicKeyObject)



          const tokens = await createTokenPair({userId: newShop._id, email}, publicKeyObject, privateKey)
          console.log('create success:  ' + tokens)

          if(!tokens){
            return {
              code: 500,
              message: 'server error'
            }
          }
          
          // khi nào cần lấy giá trị nào thì bỏ thuộc tính vào ô fields -> object cần lấy thì sử dụng .pick() của lodash 
          return {
            code: 201,
            metadata: {
                shop: getInfoData({ fields: ['_id', 'name', 'email'], object: newShop }),
                tokens
            }
          }

        }

        return {
                code: 200,
                metadata: null
            }

    }catch(error){
        return {
            code: 'xxx',
            message: error.message,
            status: 'error'
        }
    }
}


}

module.exports = AccessService