'use strict';
import moment from 'moment'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('crates', [
      {
        name: 'Clothes for Men',
        description: 'A monthly supply of trendy clothes for men.',
        createdAt: moment(),
        updatedAt: moment()
      },
      {
        name: 'Clothes for Women',
        description: 'A monthly supply of trendy clothes for women.',
        createdAt: moment(),
        updatedAt: moment()
      },
      {
        name: 'Accessories for Men',
        description: 'A monthly supply of trendy accessories for men',
        createdAt: moment(),
        updatedAt: moment()
      },
      {
        name: 'Accessories for Women',
        description: 'A monthly supply of trendy accessories for women',
        createdAt: moment(),
        updatedAt: moment()
      },
      {
        name: 'Clothes and Accessories for Men',
        description: 'A monthly supply of trendy clothes and accessories for men',
        createdAt: moment(),
        updatedAt: moment()
      },
      {
        name: 'Clothes and Accessories for Women',
        description: 'A monthly supply of trendy clothes and accessories for women',
        createdAt: moment(),
        updatedAt: moment()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('crates', null, {});
  }
}