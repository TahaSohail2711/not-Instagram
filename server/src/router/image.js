const router = require('express').Router()
const imageService = require('../services/image')

router.post('/create', async (req, res) => {
  try {
    const { image, imageableType, imageableId } = req.body
    const result = await imageService.addImage(
      image,
      imageableType,
      imageableId
    )
    res.status(201).json(result)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.get('/post/all', async (req, res) => {
  try {
    const images = await imageService.getAllImagesWithPosts()
    res.status(200).json(images)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching images' })
  }
})

router.get('/post/:userId', async (req, res) => {
  const { userId } = req.params
  try {
    const result = await imageService.getUserPosts(userId)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/story/all', async (req, res) => {
  try {
    const images = await imageService.getAllImagesWithStory()
    res.status(200).json(images)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching images' })
  }
})

router.get('/user/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    const imageUrl = await imageService.getUserProfileImage(userId)
    res.status(200).json({ url: imageUrl })
  } catch (error) {
    console.error('Error fetching user profile image:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.patch('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const { image, imageableType } = req.body
    const result = await imageService.updateUserImage(
      userId,
      image,
      imageableType,
      userId
    )
    res.status(201).json(result)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.delete('/:id', async (req, res) => {
  const imageId = req.params.id
  try {
    await imageService.deleteImage(imageId)
    res.json({ message: 'Image deleted successfully.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to delete image.' })
  }
})

module.exports = router
