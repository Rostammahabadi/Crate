'use strict'

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

  // for user to update delivery date will need to add column to this table with next delivery date 

  Subscription.associate = function(models) {
    Subscription.belongsTo(models.User)
    Subscription.belongsTo(models.Crate)
  }

  return Subscription
}

// All existing crates are a monthly subscription, therefore if a user signs up for a subscription (and therefore gets an order shipped to them on that day) then a future order for the same day in next month is created. I don't think we need to store this information, but can just use the most recent userProduct as a reference.
