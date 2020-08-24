// Imports
import { Sequelize } from 'sequelize'

// App Imports
import { NODE_ENV } from '../config/env'
// pulls in database connection for 
import databaseConfig from '../config/database.json'

// Load database config
const databaseConfigEnv = databaseConfig[NODE_ENV]

// Create new database connection
const connection = new Sequelize(databaseConfigEnv.database, databaseConfigEnv.username, databaseConfigEnv.password, {
  host: databaseConfigEnv.host,
  dialect: databaseConfigEnv.dialect,
  logging: false
})
// ^^^ handles connecting the database

// Test connection
console.info('SETUP - Connecting database...')

//authenticates connection to database on validation
connection
  .authenticate()
  .then(() => {
    console.info('INFO - Database connected.')
  })
  .catch(err => {
    console.error('ERROR - Unable to connect to the database:', err)
  })

export default connection
