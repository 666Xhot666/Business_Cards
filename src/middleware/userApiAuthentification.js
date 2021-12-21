const {authCustomerService} = require('../services/authCustomerService')

const authCustomer = async (req,res,next) => {
  let {credentials} = req.query
  if(!credentials){
    return res.status(400).json({message: 'Customer credentials is no specified'})
  }
  const user = await authCustomerService(credentials)
  if(user.error){
    return res.status(400).json({message: error.message})
  }
  req.body.customer = {...user}
  next()
}

module.exports = {authCustomer}