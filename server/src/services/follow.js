const db = require('../models')
const User = db.User
const Follow = db.Follow

module.exports = {
  async followReq(followerId, followingId) {
    try {
      const existingFollow = await Follow.findOne({
        where: { followerId, followingId },
      })

      if (existingFollow) {
        return 'You are already Following User'
      }

      const res = await Follow.create({
        followerId,
        followingId,
        status: 'pending',
      })

      return res
    } catch (err) {
      throw err
    }
  },

  async acceptReq(followerId, followingId) {
    try {
      const updateFields = { status: 'accepted' }
      const options = {
        returning: true,
        where: { followerId, followingId },
      }
      const [updatedRows, [updatedFollow]] = await Follow.update(
        updateFields,
        options
      )

      if (updatedRows === 0) {
        throw new Error('User not found')
      }
      return 'Request Accepted'
    } catch (err) {
      throw err
    }
  },

  async rejectReq(followerId, followingId) {
    try {
      const updateFields = { status: 'rejected' }
      const options = {
        returning: true,
        where: { followerId, followingId },
      }
      const [updatedRows, [updatedFollow]] = await Follow.update(
        updateFields,
        options
      )

      if (updatedRows === 0) {
        throw new Error('User not found')
      }
      return 'Request Rejected'
    } catch (err) {
      throw err
    }
  },

  async unfollow(followerId, followingId) {
    try {
      const res = await Follow.destroy({
        where: { followerId, followingId },
      })
      return res
    } catch (err) {
      throw err
    }
  },

  async getRequestedToFollow(userId) {
    try {
      const followingUsers = await Follow.findAll({
        where: { followerId: userId },
        include: [{ model: User, as: 'following' }],
      })

      const followingList = followingUsers.map((follow) => follow.following)

      res.status(200).json(followingList)
    } catch (error) {
      res
        .status(500)
        .json({ error: 'An error occurred while fetching following users.' })
    }
  },

  async getRequestsByUser(userId) {
    try {
      const req = await Follow.findAll({
        where: { followingId: userId, status: 'pending' },
        include: [{ model: User, as: 'follower' }],
      })
      const reqList = req.map((follow) => follow.follower)
      return reqList
    } catch (err) {
      throw err
    }
  },

  async getFollowing(req, res) {
    try {
      const userId = req.params.userId

      const followingUsers = await Follow.findAll({
        where: { followerId: userId, status: 'accepted' },
        include: [{ model: User, as: 'following' }],
      })

      const followingList = followingUsers.map((follow) => follow.following)

      res.status(200).json(followingList)
    } catch (error) {
      res
        .status(500)
        .json({ error: 'An error occurred while fetching following users.' })
    }
  },

  async getFollowers(req, res) {
    try {
      const userId = req.params.userId

      const followers = await Follow.findAll({
        where: { followingId: userId, status: 'accepted' },
        include: [{ model: User, as: 'follower' }],
      })

      const followersList = followers.map((follow) => follow.follower)

      res.status(200).json(followersList)
    } catch (error) {
      res
        .status(500)
        .json({ error: 'An error occurred while fetching followers.' })
    }
  },
}
