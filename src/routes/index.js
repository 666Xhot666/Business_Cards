const { Router } = require('express')
const userRouter = require('./userRouter')
const {authCustomer} = require('../middleware')
const router = new Router()

router.use('/user',[authCustomer], userRouter)
module.exports = router
