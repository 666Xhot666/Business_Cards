const { get } = require('https')

const getUsersService = (page) => {
  return new Promise((resolve, reject) => {
    try {
      get(`${process.env.USERS_API}?page=${page}`, (response) => {
        let data = ''
        response.on('data', (chunk) => (data += chunk))
        response.on('end', () => resolve({ ...JSON.parse(data) }))
      })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = getUsersService
