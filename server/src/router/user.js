const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const userService = require('../services/user')
const { isEmail } = require('../utils/index')

router.post('/signup', async (req, res) => {
  try {
    const user = await userService.addUser(req.body)

    jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1d',
      },
      (err, token) => {
        if (err) {
          res.status(400).json(err)
        } else {
          res.status(200).json({ user, token })
        }
      }
    )

    jwt.sign(
      { user },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1d',
      },
      (err, token) => {
        if (err) {
          res.status(400).json(err)
        } else {
          res.status(201).header({ token: token }).json(user)
        }
      }
    )
  } catch (error) {
    console.error('Error:', error)
    res.status(500).send('Internal Server Error')
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    let userId

    if (isEmail(email)) {
      userId = await userService.getUserByEmail(email, password)
    } else {
      const username = email
      userId = await userService.getUserByUsername(username, password)
    }

    if (userId != -1 && userId != -2) {
      jwt.sign(
        { userId },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '1d',
        },
        (err, token) => {
          if (err) {
            res.status(400).json(err)
          } else {
            res.status(200).json({ userId, token })
          }
        }
      )
    }
  } catch (error) {
    console.log(req)
    res.status(500).send('Internal Server Error')
  }
})

router.get('/all', async (req, res) => {
  try {
    const users = await userService.getAllUsers()
    res.status(200).send(users)
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const user = await userService.getUserByPk(id)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.put('/updateProfile', async (req, res) => {
  try {
    const updatedUser = await userService.updateUserProfile(req.body)
    res.status(201).json(updatedUser)
  } catch (error) {
    res.status(400).json(error.message)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { fullname, privacy, bio } = req.body
    const updatedUser = await userService.updateUser(id, fullname, privacy, bio)
    res.status(201).json(updatedUser)
  } catch (error) {
    res.status(401).json(error.message)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    await userService.deleteUserByPk(id)
    res.status(200).send(`User: ${id} deleted`)
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

router.post('/getUsername/:id', async (req, res) => {
  const id = req.params.id
  try {
    const username = await userService.getUsername(id)
    res.status(200).send(username)
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

module.exports = router
