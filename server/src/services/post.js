const db = require('../models')
const User = db.User
const Post = db.Post

const createPost = async (description, userId) => {
  try {
    const post = await Post.create({ description, userId })
    return post
  } catch (err) {
    throw err
  }
}

const getUserPosts = async (id) => {
  try {
    const posts = await Post.findAll({
      where: { userId: id },
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    })
    return posts
  } catch (err) {
    throw err
  }
}

const getAllPosts = async () => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    })
    return posts
  } catch (err) {
    throw err
  }
}

const updatePost = async (postId, description) => {
  try {
    const post = await Post.findByPk(postId)
    if (!post) {
      throw new Error('Post not found.')
    }
    post.description = description
    await post.save()
    return post
  } catch (error) {
    throw new Error('Failed to update comment.')
  }
}

const deletePost = async (postId) => {
  try {
    await Post.destroy({
      where: { id: postId },
    })
  } catch (error) {
    throw new Error('Failed to delete post.')
  }
}

module.exports = {
  createPost,
  getUserPosts,
  getAllPosts,
  deletePost,
  updatePost,
}
