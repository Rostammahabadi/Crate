'use strict'

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

  // ^^ keys are attr/types for the user 
  // add missing features to be implemented (bio, img, address, orders)
  // this will be adding columns in the table for the user
  // define which attr need to be required vs optional (null value by default )?

  User.associate = function(models) {
    User.hasMany(models.Subscription)
  }
  // ^^ this defines a hasMany relation from User to Subscriptions
  // do we need a User.associate with Purchases in order to keep track of items kept?  

  return User
}