// Imports
//hooks up the actual database, remember connecting this in another file so this must just set it up
// ya looks like models is grabbing this connection and shoving it into a pretty format for the different
// resolvers to use
import { Sequelize } from 'sequelize'

// App Imports
import { NODE_ENV } from '../config/env'
import databaseConfig from '../config/database.json'

// Load database config
const databaseConfigEnv = databaseConfig[NODE_ENV]

// Create new database connection
// Connecting a specific users database
const connection = new Sequelize(databaseConfigEnv.database, databaseConfigEnv.username, databaseConfigEnv.password, {
  host: databaseConfigEnv.host,
  dialect: databaseConfigEnv.dialect,
  logging: false
})

// Test connection
// Just words so user doesn't go crazy
console.info('SETUP - Connecting database...')
// might have braken this not sure
connection
// guessing that the env variables play some role in this perhaps, if the user does not exist maybe it doesnot give them a database or connection
//to their database, so the database is associated with a given user based on that databaseConfigEnv perhaps
  .authenticate()
  .then(() => {
    console.info('INFO - Database connected.')
  })
  .catch(err => {
    console.error('ERROR - Unable to connect to the database:', err)
  })

export default connection
