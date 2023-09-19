module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    value: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    likeableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    likeableType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  Like.associate = (models) => {
    Like.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    })

    Like.belongsTo(models.Post, {
      foreignKey: 'likeableId',
      constraints: false,
      scope: {
        likeableType: 'Post',
      },
      as: 'post',
    })

    Like.belongsTo(models.Comment, {
      foreignKey: 'likeableId',
      constraints: false,
      scope: {
        likeableType: 'Comment',
      },
      as: 'comment',
    })

    Like.belongsTo(models.Story, {
      foreignKey: 'likeableId',
      constraints: false,
      scope: {
        likeableType: 'Story',
      },
      as: 'story',
    })
  }

  return Like
}
