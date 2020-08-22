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

  User.associate = function(models) {
    User.hasMany(models.Subscription)
  }

  return User
}

// Each key above (name, e-mail, etc.) is an attribute for the user resource. We will need to create more attributes for the user (i.e. columns in the table) for profilePicture, description, and shipping address.

// The hasMany association is similar to what we would see in a Rails application. In order to track their purchases we will need to create a new resource for userProducts (still haven't decided on what exactly to name this resource, but a joins table seems like a good starting place) and create a hasMany relationship between user and products through this resources.

// None of the current attributes are optional. We will need to determine whether the attributes we are adding can default to null. That process is explained here: https://sequelize.readthedocs.io/en/latest/docs/models-definition/

// User subscriptions should(?) indicate how often a user recieves products, which will be how we know when the next order is coming so they can adjust it 
