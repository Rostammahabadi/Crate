module.exports = {
	up: function (queryInterface, Sequelize) {
  	return Promise.all([
    	queryInterface.addColumn('users', 'description', {
    	type: Sequelize.STRING
    	}),
    	queryInterface.addColumn('users', 'address', {
    	type: Sequelize.STRING
    	}),
    	queryInterface.addColumn('users', 'image',{
    	type: Sequelize.STRING
    	})
  	]);
	},
	down: function (queryInterface, Sequelize) {
  	return Promise.all([
      queryInterface.removeColumn('users', 'description'),
      queryInterface.removeColumn('users', 'address'),
      queryInterface.removeColumn('users', 'image')
    ]);
	}
};
