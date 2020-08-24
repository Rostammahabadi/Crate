'use strict'
// Eric *
// This defines the crate datatypes, field, names and relationships. It has the fields name, and description.
// There is also a has many association with subscriptions
module.exports = function(sequelize, DataTypes) {
  let Crate = sequelize.define('crates', {
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    }
  })

  Crate.associate = function(models) {
    Crate.hasMany(models.Subscription)
  }

  return Crate
}
