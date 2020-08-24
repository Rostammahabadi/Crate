'use strict'
// Eric *
// This is where the relationships for subscriptions are created it has two fields userId and crateId
// this crates a one to many belongs to relationship to user and crate
// Subscription
module.exports = function(sequelize, DataTypes) {
  let Subscription = sequelize.define('subscriptions', {
    userId: {
      type: DataTypes.INTEGER
    },
    crateId: {
      type: DataTypes.INTEGER
    }
  })
  // This is the belongs to relationship to user and crate for a given subscription
  Subscription.associate = function(models) {
    Subscription.belongsTo(models.User)
    Subscription.belongsTo(models.Crate)
  }

  return Subscription
}
