const router = require('express').Router()
const likeServices = require('../services/like')

router.patch('/toggle-like', async (req, res) => {
  const { userId, likeableId, likeableType } = req.body

  try {
    const like = await likeServices.toggleLike(userId, likeableId, likeableType)
    res.status(201).json(like)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create like.' })
  }
})

router.get('/count/post/:postId', async (req, res) => {
  const { postId } = req.params
  try {
    const likeCount = await likeServices.getLikeCount(postId)
    res.status(200).json(likeCount)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve like count.' })
  }
})

router.get('/count/comment/:commentId', async (req, res) => {
  const { commentId } = req.params
  try {
    const likeCount = await likeServices.getCommentLikeCount(commentId)
    res.status(200).json(likeCount)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve like count.' })
  }
})

router.get('/count/story/:storyId', async (req, res) => {
  const { storyId } = req.params
  try {
    const likeCount = await likeServices.getStoryLikeCount(storyId)
    res.status(200).json(likeCount)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve like count.' })
  }
})

router.get('/post/:postId/:userId', async (req, res) => {
  const { postId, userId } = req.params

  try {
    const like = await likeServices.getLike(postId, userId)
    res.status(200).json(like)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve like.' })
  }
})

router.get('/comment/:commentId/:userId', async (req, res) => {
  const { commentId, userId } = req.params

  try {
    const like = await likeServices.getCommentLike(commentId, userId)
    res.status(200).json(like)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve like.' })
  }
})

router.get('/story/:storyId/:userId', async (req, res) => {
  const { storyId, userId } = req.params

  try {
    const like = await likeServices.getStoryLike(storyId, userId)
    res.status(200).json(like)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve like.' })
  }
})

module.exports = router
