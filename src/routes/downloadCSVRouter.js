const { Router } = require('express')
const downloadCSVController = require('../controllers/downloadCSVController')

const downloadCSVRouter = Router()

downloadCSVRouter.get('/', downloadCSVController)
module.exports = downloadCSVRouter
