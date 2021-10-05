const getUsersService = require('../services/getUsersService')

const userController = (req, res) => {
  const { page } = req.query
  getUsersService(page)
    .then((data) => {
      const { data: users, total_pages } = { ...data }
      if (!users.length) return res.json({ message: 'All user are listed' })

      return res.json({ users, total_pages })
    })
    .catch((err) => res.status(400).json({ message: 'Can`t load users list' }))
}

module.exports = userController
