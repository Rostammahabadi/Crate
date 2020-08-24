'use strict'
// This model will need to be updated to a hasMany through reltaionship with product
// therefore we can call user (specific id) .Products which acts like activerecord
// We will also need to add description, image, and shipping address
// User
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('users', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.TEXT
    },
    role: {
      type: DataTypes.TEXT
    }
  })

  User.associate = function(models) {
    User.hasMany(models.Subscription)
  }

  return User
}
