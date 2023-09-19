const db = require('../models')
const User = db.User

const emailExists = async (email) => {
  return (await User.findOne({ where: { email } })) !== null
}

const usernameExists = async (username) => {
  return (await User.findOne({ where: { username } })) !== null
}

const addUser = async (data) => {
  const userData = {
    username: data.username || '',
    email: data.email || '',
    password: data.password || '',
    fullname: data.fullname || '',
    bio: data.bio || '...',
    gender: data.gender || '',
    privacy: data.privacy || '',
    dob: data.dob || new Date('January 01, 2000'),
  }

  try {
    const isEmailTaken = await emailExists(userData.email)
    const isUsernameTaken = await usernameExists(userData.username)

    if (isEmailTaken) {
      throw new Error('Email already exists')
    }
    if (isUsernameTaken) {
      throw new Error('Username already exists')
    }

    const user = await User.create(userData)

    return user.dataValues
  } catch (error) {
    throw error
  }
}

const getAllUsers = async () => {
  return await User.findAll()
}

const getUserByPk = async (id) => {
  return await User.findOne({ where: { id } })
}

const updateUserProfile = async (user) => {
  try {
    const updatedUser = await User.update(user, { where: { id: user.id } })
    return updatedUser
  } catch (error) {
    throw error
  }
}

const updateUser = async (userId, fullname, privacy, bio) => {
  const updateFields = { fullname, privacy, bio }
  const options = { returning: true, where: { id: userId } }

  const [updatedRows, [updatedUser]] = await User.update(updateFields, options)

  if (updatedRows === 0) {
    throw new Error('User not found')
  }

  return updatedUser
}

const deleteUserByPk = async (id) => {
  await User.destroy({ where: { id } })
}

const getUserByEmail = async (email, password) => {
  try {
    const user = await User.findOne({
      where: { email: email },
      attributes: ['id', 'password'],
    })
    if (!user) {
      return -1
    }
    if (user.password === password) {
      return user.id
    } else {
      return -2
    }
  } catch (err) {
    console.error('Error:', err)
    throw err
  }
}
const getUserByUsername = async (username, password) => {
  try {
    const user = await User.findOne({
      where: { username: username },
      attributes: ['id', 'password'],
    })
    if (!user) {
      return -1
    }
    if (user.password === password) {
      return user.id
    } else {
      return -2
    }
  } catch (err) {
    console.error('Error:', err)
    throw err
  }
}

const getUsername = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: ['username'] })
  return user ? user.username : null
}

module.exports = {
  addUser,
  getAllUsers,
  getUserByPk,
  updateUserProfile,
  deleteUserByPk,
  getUsername,
  updateUser,
  getUserByUsername,
  getUserByEmail,
}
