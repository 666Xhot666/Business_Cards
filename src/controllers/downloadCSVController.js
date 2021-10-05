const { get } = require('https')
const getUsers = (page) => {
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
const downloadCSVController = (req, res) => {
  try {
    Promise.all([getUsers(1), getUsers(2)]).then((data) => {
      const users = []
      const headers = ['first_name, last_name, email']
      data.map((obj) => obj.data.map((user) => users.push(user)))
      const rows = users.map(
        (user) => `${user.first_name},${user.last_name},${user.email}`
      )
      const csvString = headers.concat(rows).join('\n')
      res.attachment('users.csv')
      res.send(csvString)
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = downloadCSVController
