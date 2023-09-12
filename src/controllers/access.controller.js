'use strict'

const AccessService = require("../services/access.service");

// viết bằng ES6 viết bằng class
class AccessController {

    signUp = async (req, res, next)=>{
        try{

            console.log(`signup:::: `, req.body)
            return res.status(201).json(await AccessService.signUp(req.body))
        }catch(error){
            next(error);
        }
    }

}

module.exports = new AccessController()

/*
   200 oke
   201 create
*/