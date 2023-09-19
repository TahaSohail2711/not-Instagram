const router = require('express').Router()
const postServices = require('../services/post')

router.post('/create', async (req, res) => {
  try {
    const { description, userId } = req.body
    const result = await postServices.createPost(description, userId)
    res.status(201).json(result.dataValues.id)
  } catch (err) {
    console.error('Error:', err)
    res.status(500).json(err)
  }
})

router.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await postServices.getUserPosts(id)
    res.status(200).json(result)
  } catch (err) {
    console.error('Error:', err)
    res.status(500).json(err)
  }
})

router.get('/all', async (req, res) => {
  try {
    const result = await postServices.getAllPosts()
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.patch('/:id', async (req, res) => {
  const postId = req.params.id
  const { description } = req.body
  try {
    const updatedPost = await postServices.updatePost(postId, description)
    res.json(updatedPost)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update comment.' })
  }
})

router.delete('/:id', async (req, res) => {
  const postId = req.params.id
  res.json(postId)
  try {
    await postServices.deletePost(postId)
    res.json({ message: 'Post deleted successfully.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to delete post.' })
  }
})

module.exports = router
