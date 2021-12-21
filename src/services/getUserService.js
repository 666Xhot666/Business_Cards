const { request } = require('https')
const HOST_API = process.env.HOST_API
const CUSTOMER_API = process.env.CUSTOMER_PATH
const CLIENT_ID = process.env.CLIENT_ID

const getUserService = (customerCredentials) => {
  const {authorizationToken, customer_id} = customerCredentials
  const headers = {
      'Authorization': `${authorizationToken}`,
  }  
  const requestOptions = {
    hostname: HOST_API,
    path: `${CUSTOMER_API}/${customer_id}`,
    method: 'GET',
    headers
  }

  return new Promise((resolve, reject) => {
    try {
      const req = request(requestOptions, (response) => {
        let data = ''
        response.on('data', (chunk) => (data += chunk))
        response.on('end', () => resolve({ ...JSON.parse(data) }))
      })
      req.on('error', (error) => {
        throw new Error(`problem with request: ${error.message}`)
      });
      req.end()
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = getUserService
