const router = require('express').Router()
const userRouter = require('./user')
const imgRouter = require('./image')
const postRouter = require('./post')
const commentRouter = require('./comment')
const storyRouter = require('./story')
const likeRouter = require('./like')
const followRouter = require('./follow')
// const authMiddleware = require('../middlewares/auth')

router.use('/users', userRouter)

router.use('/images', imgRouter)
router.use('/posts', postRouter)
router.use('/comments', commentRouter)
router.use('/story', storyRouter)
router.use('/likes', likeRouter)
router.use('/friends', followRouter)

module.exports = router
