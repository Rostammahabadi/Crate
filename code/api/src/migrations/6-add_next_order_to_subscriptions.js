module.exports = {
	up: function (queryInterface, Sequelize) {
  	return Promise.all([
    	queryInterface.addColumn('subscriptions', 'nextOrder', {
    	type: Sequelize.STRING
    	})
  	]);
	},

	down: function (queryInterface, Sequelize) {
  	return Promise.all([
      queryInterface.removeColumn('subscriptions', 'nextOrder')
    ]);
	}
};
