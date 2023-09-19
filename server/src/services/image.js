const { Op } = require('sequelize')
const db = require('../models')
const cloudinary = require('../../cloudinary/config')

const Image = db.Image

module.exports = {
  async addImage(image, imageableType, imageableId) {
    try {
      const uploadedImage = await cloudinary.uploader.upload(image, {
        folder: 'notInstagram',
      })
      const result = await Image.create({
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url,
        imageableType,
        imageableId,
      })
      return result
    } catch (err) {
      throw err
    }
  },

  async getAllImagesWithPosts() {
    try {
      const images = await Image.findAll({
        where: {
          imageableType: 'Post',
        },
        include: [
          {
            model: db.Post,
            as: 'post',
            include: {
              model: db.User,
              as: 'user',
              attributes: ['id', 'username', 'privacy'],
            },
          },
        ],
      })
      return images
    } catch (error) {
      throw error
    }
  },

  async getUserPosts(userId) {
    try {
      const images = await Image.findAll({
        where: {
          imageableType: 'Post',
        },
        include: [
          {
            model: db.Post,
            as: 'post',
            where: {
              userId: userId,
            },
            include: {
              model: db.User,
              as: 'user',
              attributes: ['id', 'username', 'privacy'],
            },
          },
        ],
      })
      return images
    } catch (err) {
      throw err
    }
  },

  async getAllImagesWithStory() {
    try {
      const images = await Image.findAll({
        where: {
          imageableType: 'Story',
        },
        include: [
          {
            model: db.Story,
            as: 'story',
            include: {
              model: db.User,
              as: 'user',
              attributes: ['id', 'username', 'privacy'],
            },
          },
        ],
      })
      return images
    } catch (error) {
      throw error
    }
  },

  async getUserProfileImage(userId) {
    try {
      const image = await Image.findOne({
        where: {
          imageableType: 'User',
          imageableId: userId,
        },
      })

      return image ? image.url : null
    } catch (error) {
      console.error('Error fetching user profile image:', error)
      throw error
    }
  },

  async updateUserImage(userId, image, imageableType, imageableId) {
    try {
      const uploadedImage = await cloudinary.uploader.upload(image, {
        folder: 'notInstagram',
      })

      const [updatedImage, created] = await Image.findOrCreate({
        where: { imageableType, imageableId },
        defaults: {
          public_id: uploadedImage.public_id,
          url: uploadedImage.secure_url,
          imageableType,
          imageableId,
        },
      })

      return updatedImage
    } catch (error) {
      throw error
    }
  },

  async deleteImage(imageId) {
    try {
      await Image.destroy({
        where: { id: imageId },
      })
    } catch (error) {
      throw new Error('Failed to delete image.')
    }
  },
}
