const { Op } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ttl: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("NOW() + INTERVAL '24 hours'"),
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  })

  Story.associate = (models) => {
    Story.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    })

    Story.hasOne(models.Image, {
      foreignKey: 'imageableId',
      constraints: false,
      scope: {
        imageableType: 'Story',
      },
      as: 'image',
    })
  }

  Story.addHook('beforeFind', (options) => {
    const now = Date.now()
    options.where = {
      ...options.where,
      ttl: {
        [Op.gte]: now,
      },
    }
  })

  return Story
}
