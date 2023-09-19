const dbConfig = require('../../config/dbConfig')
const { Sequelize, DataTypes } = require('sequelize')
const UserModel = require('./user')
const PostModel = require('./post')
const ImageModel = require('./image')
const CommentModel = require('./comment')
const StoryModel = require('./story')
const LikeModel = require('./like')
const FollowModel = require('./follow')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = UserModel(sequelize, Sequelize)
db.Post = PostModel(sequelize, Sequelize)
db.Image = ImageModel(sequelize, Sequelize)
db.Comment = CommentModel(sequelize, Sequelize)
db.Story = StoryModel(sequelize, Sequelize)
db.Like = LikeModel(sequelize, Sequelize)
db.Follow = FollowModel(sequelize, Sequelize)

db.User.associate(db)
db.Post.associate(db)
db.Comment.associate(db)
db.Story.associate(db)
db.Image.associate(db)
db.Like.associate(db)
db.Follow.associate(db)

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('DB Synced')
  })
  .catch((err) => {
    console.error(`Error: ${err}`)
  })

module.exports = db
