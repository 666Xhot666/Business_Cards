const {request} = require('https')
const HOST_API = process.env.HOST_API
const CUSTOMER_PATH = process.env.CUSTOMER_PATH

const authCustomer = ({credentials, clientId}) => {
  const requestBody = {'type': 'credentials'}
  const requestType = "auth"
  const headers = {
      'x-dw-http-method': 'POST',
      'x-dw-content-id': 'req3',
      'x-dw-resource-path': 'true',
      'x-dw-resource-path-extension': 'customers/auth',
      'x-dw-client-id': clientId,
      'Authorization': `Basic ${credentials}`,
  }
  const requestOptions = {
    hostname: HOST_API,
    path: `${CUSTOMER_PATH}/${requestType}`,
    method: 'POST',
    headers,
    // agent: false
  }
  return new Promise((resolve,reject) => {
    try {
      const req = request(requestOptions, (response) => {
        const authorizationToken = response.headers.authorization
        let data = ''
        response.on('data', (chunk) => (data += chunk))
        response.on('end', () => resolve({authorizationToken, ...JSON.parse(data)}))
      })
      req.on('error', (error) => {
        throw new Error(`problem with request: ${error.message}`)
      });
      req.write(JSON.stringify(requestBody))
      req.end()
    } catch (error) {
      reject(error)
    }
  })
} 


const authCustomerService = (credentials) => {
  const clientId = process.env.CLIENT_ID
  return new Promise((resolve,reject) => {
    authCustomer({credentials,clientId})
    .then((data) => {
      const {authorizationToken, customer_id} = data
      resolve({authorizationToken, customer_id})
    })
    .catch(error => {
      reject({error: error.message})
    })
  })
}

module.exports = {authCustomerService}