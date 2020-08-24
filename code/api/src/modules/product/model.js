'use strict'

// Product
// defines the keys/values for the product columns
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    name: {
      type: DataTypes.STRING
    },
    slug: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.INTEGER
    },
    gender: {
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.TEXT
    }
  })
}

// user model has an association tagged
// does this file also need an association. would it be to the user if item is purchased? 
//  User.associate = function(models) {
//   User.hasMany(models.Product)
// }
