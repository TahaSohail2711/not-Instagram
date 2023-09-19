const db = require('../models')
const Comment = db.Comment

module.exports = {
  async createComment(body, userId, postId) {
    try {
      const comment = await Comment.create({
        body,
        userId,
        postId,
      })
      return comment
    } catch (error) {
      throw new Error('Failed to create comment.')
    }
  },

  async getCommentsForPost(postId) {
    try {
      const comments = await Comment.findAll({
        where: { postId },
        include: [
          { model: db.User, as: 'user', attributes: ['id', 'username'] },
        ],
      })
      return comments
    } catch (error) {
      throw new Error('Failed to retrieve comments for post.')
    }
  },

  async getCommentForPostAndUser(postId, userId) {
    try {
      const comment = await Comment.findOne({
        where: { postId, userId },
        include: [
          { model: db.User, as: 'user', attributes: ['id', 'username'] },
        ],
      })
      return comment
    } catch (error) {
      throw new Error('Failed to retrieve comment.')
    }
  },

  async updateComment(commentId, body) {
    try {
      const comment = await Comment.findByPk(commentId)

      if (!comment) {
        throw new Error('Comment not found.')
      }

      comment.body = body
      await comment.save()

      return comment
    } catch (error) {
      throw new Error('Failed to update comment.')
    }
  },

  async deleteComment(commentId) {
    try {
      const comment = await Comment.findByPk(commentId)

      if (!comment) {
        throw new Error('Comment not found.')
      }

      await comment.destroy()
    } catch (error) {
      throw new Error('Failed to delete comment.')
    }
  },
}
