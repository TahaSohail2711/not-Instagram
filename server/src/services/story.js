const db = require('../models')

const Story = db.Story
const User = db.User
const Image = db.Image

module.exports = {
  async createStory(userId) {
    try {
      const story = await Story.create({
        userId,
      })
      return story
    } catch (error) {
      throw new Error('Failed to create story.')
    }
  },

  async getStoriesForUser(userId) {
    try {
      const stories = await Story.findAll({
        where: { userId },
        include: [
          { model: Image, as: 'image' },
          { model: User, as: 'user', attributes: ['id', 'username'] },
        ],
      })
      return stories
    } catch (error) {
      throw new Error('Failed to retrieve stories for user.')
    }
  },

  async getAllStories() {
    try {
      const stories = await Story.findAll({
        include: [{ model: Image, as: 'image' }],
      })
      return stories
    } catch (error) {
      throw new Error('Failed to retrieve all stories.')
    }
  },
}
