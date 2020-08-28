'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('subscriptions', [
      {
        userId: 1,
        crateId: 1,
        nextOrder: "2012-01-01",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        crateId: 2,
        nextOrder: "2012-01-02",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('subscriptions', null, {});
  }
}
