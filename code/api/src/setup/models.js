// Imports
// This controlls teh database connections so it talks to database so the rest of the files
// such as the resolvers can call database methods off of them
import Sequelize from 'sequelize'

// App Imports
import databaseConnection from './database'

const models = {
  User: databaseConnection.import('../modules/user/model'),
  Product: databaseConnection.import('../modules/product/model'),
  Crate: databaseConnection.import('../modules/crate/model'),
  Subscription: databaseConnection.import('../modules/subscription/model')
}

// Less sure here, maybe set the connection for teh databbase so the User model would be associated with teh user database?
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

models.sequelize = databaseConnection
models.Sequelize = Sequelize

export default models
