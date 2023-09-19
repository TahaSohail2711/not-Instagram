module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  })

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    })

    Post.hasMany(models.Image, {
      foreignKey: 'imageableId', // This should match the actual foreign key in the Image table
      constraints: false, // If needed
      as: 'images',
    })
  }

  return Post
}
