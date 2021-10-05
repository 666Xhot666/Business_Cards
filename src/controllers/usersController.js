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
const userController = (req, res) => {
  const { page } = req.query
  getUsers(page)
    .then((data) => {
      const { data: users, total_pages } = { ...data }
      if (!users.length) return res.json({ message: 'All user are listed' })

      return res.json({ users, total_pages })
    })
    .catch((err) => res.status(400).json({ message: 'Can`t load users list' }))
}

module.exports = userController
