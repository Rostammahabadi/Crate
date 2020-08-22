'use strict'

// Product
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

// Add belongs to relationship for products belongs to user through userProducts

// userProducts will need to not only associate product with user, but also track date (which it does automatically) and whether a product was returned (Boolean). The latter can be updated so a product can be updated to "returned".
