'use strict'

const keyTokenModel = require("../models/keyToken.model");


//viet ham create tokem
class KeyTokenService {
    
    static createKeyToken = async ({userId, publicKey})=>{
        try{
            // publicKey -> sinh ra boi thuat toan bat doi xung (no la buffer chưa dc hash)
            // chuyen thanh string to save in DB 
            const publicKeyString = publicKey.toString();
            const tokens = await keyTokenModel.create({
                user: userId,
                publicKey: publicKeyString
            })
            // neu co tạo đc tokens thi return ve publicKeyString neu ko return về null
             return tokens ? tokens.publicKey : null

        }catch(error){
            return null;
        }
    }

}

module.exports = KeyTokenService