
const getUserService = require('../services/getUserService')

const userController = async (req, res) => {
 const customerCredentials = req.body.customer
 const customer = await getUserService(customerCredentials)
  return res.json({customer})

}

module.exports = userController
