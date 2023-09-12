'use strict'

const express = require('express')
const router = express.Router()
const AccessController = require('../../controllers/access.controller')

// các routers về sign up sign in register ...

router.post('/shop/signup', AccessController.signUp)

module.exports = router