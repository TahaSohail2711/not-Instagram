// authMiddleware.js
const jwt = require('jsonwebtoken')
require('dotenv').config()

function authenticateToken(req, res, next) {
  const token = req.headers.token

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' })
    }
    next()
  })
}

module.exports = authenticateToken
