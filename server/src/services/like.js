const db = require('../models')
const Like = db.Like

module.exports = {
  async toggleLike(userId, likeableId, likeableType) {
    try {
      const existingLike = await Like.findOne({
        where: {
          userId: userId,
          likeableId: likeableId,
          likeableType: likeableType,
        },
      })

      if (existingLike) {
        existingLike.value = !existingLike.value
        await existingLike.save()

        return existingLike.value
      } else {
        const newLike = await Like.create({
          value: true,
          userId,
          likeableId,
          likeableType,
        })

        return newLike.value
      }
    } catch (error) {
      throw new Error('Failed to toggle like.')
    }
  },

  async getLike(postId, userId) {
    try {
      const like = await Like.findOne({
        where: {
          userId: userId,
          likeableId: postId,
          likeableType: 'Post',
        },
      })

      if (like) {
        return like.value
      } else {
        return false
      }
    } catch (error) {
      throw new Error('Failed to retrieve like.')
    }
  },

  async getCommentLike(commentId, userId) {
    try {
      const like = await Like.findOne({
        where: {
          userId: userId,
          likeableId: commentId,
          likeableType: 'Comment',
        },
      })

      if (like) {
        return like.value
      } else {
        return false
      }
    } catch (error) {
      throw new Error('Failed to retrieve like.')
    }
  },

  async getStoryLike(storyId, userId) {
    try {
      const like = await Like.findOne({
        where: {
          likeableId: storyId,
          likeableType: 'Story',
          userId: userId,
        },
      })
      return like ? like.value : false
    } catch (error) {
      throw new Error('Failed to get like status for story.')
    }
  },

  async getLikeCount(postId) {
    try {
      const likeCount = await Like.count({
        where: {
          likeableId: postId,
          likeableType: 'Post',
          value: true,
        },
      })
      return likeCount
    } catch (error) {
      throw new Error('Failed to retrieve like count.')
    }
  },

  async getCommentLikeCount(commentId) {
    try {
      const likeCount = await Like.count({
        where: {
          likeableId: commentId,
          likeableType: 'Comment',
          value: true,
        },
      })
      return likeCount
    } catch (error) {
      throw new Error('Failed to retrieve like count.')
    }
  },

  async getStoryLikeCount(storyId) {
    try {
      const likeCount = await Like.count({
        where: {
          likeableId: storyId,
          likeableType: 'Story',
          value: true,
        },
      })
      return likeCount
    } catch (error) {
      throw new Error('Failed to retrieve like count.')
    }
  },
}
