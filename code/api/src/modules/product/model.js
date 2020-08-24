'use strict'
// Eric *
// This defines the product datatypes, field, names and relationships. A given product has a
// name, slug, description, type, gender, and image. We could probably do something with the gender here.
// There are also no relationships associated with a given model. 
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
