const { Router } = require('express')
const userController = require('../controllers/userController.js')
const usersRouter = Router()
usersRouter.get('/', userController)
module.exports = usersRouter
