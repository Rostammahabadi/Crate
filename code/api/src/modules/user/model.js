'use strict'
// Eric *
// This file defines the corresponding datafields and types for a user along with
// any corresponding relationships for the user: in this particular case a user has
// has a name, email, password, and role with the datatypes of the correspoinding fields
// listed below. The user also has many subscriptions

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
  // Eric *
  // This is the users has many relationships to subscriptions
  User.associate = function(models) {
    User.hasMany(models.Subscription)
  }

  return User
}
