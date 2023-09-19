module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 4,
        isAlphanumeric: true,
      },
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
      defaultValue: '...',
    },
    gender: {
      type: DataTypes.ENUM('M', 'F', 'Others'),
      allowNull: false,
    },
    privacy: {
      type: DataTypes.ENUM('Public', 'Private'),
      allowNull: false,
      defaultValue: 'Public',
    },
    dob: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  })

  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: 'userId',
      as: 'posts',
    })

    User.hasMany(models.Image, {
      foreignKey: 'imageableId',
      constraints: false,
      as: 'images',
    })

    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      as: 'comment',
    })

    User.hasMany(models.Story, {
      foreignKey: 'userId',
      as: 'stories',
    })
  }

  return User
}
