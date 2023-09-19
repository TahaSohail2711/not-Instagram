module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    followingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
      defaultValue: 'pending',
    },
  })

  Follow.associate = (models) => {
    Follow.belongsTo(models.User, {
      foreignKey: 'followerId',
      as: 'follower',
    })

    Follow.belongsTo(models.User, {
      foreignKey: 'followingId',
      as: 'following',
    })
  }

  return Follow
}
