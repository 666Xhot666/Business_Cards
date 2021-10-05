const { Router } = require('express')
const userController = require('../controllers/usersController.js')
const usersRouter = Router()
usersRouter.get('/', userController)
module.exports = usersRouter
