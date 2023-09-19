const router = require('express').Router()
const commentServices = require('../services/comment')

router.post('/create', async (req, res) => {
  try {
    const { body, userId, postId } = req.body
    const comment = await commentServices.createComment(body, userId, postId)
    res.status(201).json(comment)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create comment.' })
  }
})

router.get('/all/:postId', async (req, res) => {
  const { postId } = req.params

  try {
    const comments = await commentServices.getCommentsForPost(postId)
    res.status(200).json(comments)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve comments for post.' })
  }
})

router.get('/:postId/:userId', async (req, res) => {
  const { postId, userId } = req.params

  try {
    const comment = await commentServices.getCommentForPostAndUser(
      postId,
      userId
    )
    if (!comment) {
      res.status(404).json({ error: 'Comment not found.' })
    } else {
      res.json(comment)
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve comment.' })
  }
})

router.patch('/:id', async (req, res) => {
  const commentId = req.params.id
  const { body } = req.body

  try {
    const updatedComment = await commentServices.updateComment(commentId, body)
    res.json(updatedComment)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update comment.' })
  }
})

router.delete('/:id', async (req, res) => {
  const commentId = req.params.id

  try {
    await commentServices.deleteComment(commentId)
    res.json({ message: 'Comment deleted successfully.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to delete comment.' })
  }
})

module.exports = router
