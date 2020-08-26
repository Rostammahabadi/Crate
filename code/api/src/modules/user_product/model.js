'use strict'
module.exports = function(sequelize, DataTypes) {
  let UserProduct = sequelize.define('user_products', {
    userId: {
      type: DataTypes.INTEGER
    },
    productId: {
      type: DataTypes.INTEGER
    },
    kept: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  })
  UserProduct.associate = function (models) {
    UserProduct.belongsTo(models.User)
    UserProduct.belongsTo(models.Product)
  }
  return UserProduct
}
