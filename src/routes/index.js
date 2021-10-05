const { Router } = require('express')
const usersRouter = require('./usersRouter')
const downloadCSVRouter = require('./downloadCSVRouter')
const router = new Router()

router.use('/users', usersRouter)
router.use('/users.csv', downloadCSVRouter)
module.exports = router
