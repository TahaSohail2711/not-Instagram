const router = require('express').Router()
const followerServices = require('../services/follow')
const { Op } = require('sequelize')
const { User, Follow } = require('../models')

router.post('/follow/:id', async (req, res) => {
  try {
    const followerId = req.body.userId
    const followingId = req.params.id

    const result = await followerServices.followReq(followerId, followingId)

    res.status(200).json(result)
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while following the user.' })
  }
})

router.post('/unfollow/:id', async (req, res) => {
  try {
    const followerId = req.body.userId
    const followingId = req.params.id

    await Follow.destroy({
      where: { followerId, followingId },
    })

    res.status(200).json({ message: 'You have unfollowed this user.' })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while unfollowing the user.' })
  }
})

router.post('/accept/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const { followingId } = req.body
    const result = await followerServices.acceptReq(userId, followingId)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/reject/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const { followingId } = req.body
    const result = await followerServices.rejectReq(userId, followingId)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/requested/:userId', async (req, res) => {
  try {
    const userId = req.params.userId

    const followingUsers = await Follow.findAll({
      where: { followerId: userId, status: { [Op.ne]: 'accepted' } },
      include: [{ model: User, as: 'following' }],
    })

    const followingList = followingUsers.map((follow) => follow.following)

    res.status(200).json(followingList)
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching following users.' })
  }
})

router.get('/requests/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const result = await followerServices.getRequestsByUser(userId)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/following/:userId', async (req, res) => {
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
})

router.get('/followers/:userId', async (req, res) => {
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
})

module.exports = router
