const router = require('express').Router()
const storyServices = require('../services/story')

router.post('/create', async (req, res) => {
  const { userId } = req.body

  try {
    const story = await storyServices.createStory(userId)
    res.status(201).json(story)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create story.' })
  }
})

router.get('/user/:id', async (req, res) => {
  const { id } = req.params

  try {
    const stories = await storyServices.getStoriesForUser(id)
    res.json(stories)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve stories for user.' })
  }
})

router.get('/all', async (req, res) => {
  try {
    const stories = await storyServices.getAllStories()
    res.json(stories)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve all stories.' })
  }
})

router.get('/feed/:id', async (req, res) => {
  const { id } = req.params

  try {
    const stories = await storyServices.getStoriesForFeed(id)
    res.json(stories)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve stories for feed.' })
  }
})

module.exports = router
