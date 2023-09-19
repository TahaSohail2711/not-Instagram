module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    public_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    imageableType: {
      type: DataTypes.ENUM('User', 'Post', 'Story'),
      allowNull: false,
    },
    imageableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  })

  Image.associate = (models) => {
    Image.belongsTo(models.User, {
      foreignKey: 'imageableId',
      constraints: false,
      as: 'user',
    })

    Image.belongsTo(models.Post, {
      foreignKey: 'imageableId',
      constraints: false,
      as: 'post',
    })

    Image.belongsTo(models.Story, {
      foreignKey: 'imageableId',
      constraints: false,
      as: 'story',
    })
  }

  return Image
}
