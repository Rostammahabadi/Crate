'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_products', [
      {
        productId: 1,
        userId: 1,
        kept: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 2,
        userId: 1,
        kept: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 3,
        userId: 2,
        kept: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 1,
        userId: 2,
        kept: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_products', null, {});
  }
}
