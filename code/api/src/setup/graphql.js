// Imports
import graphqlHTTP from 'express-graphql'

// App Imports
import serverConfig from '../config/server.json'
import authentication from './authentication'
import schema from './schema'
//^^^ adds all authentication + queries/mutations from schema 
// passes schema on graphQL request below
// this is where the server is defined 

// Setup GraphQL
export default function (server) {
  console.info('SETUP - GraphQL...')

  server.use(authentication)

  // API (GraphQL on route `/`)
  server.use(serverConfig.graphql.endpoint, graphqlHTTP(request => ({
    schema,
    graphiql: serverConfig.graphql.ide,
    pretty: serverConfig.graphql.pretty,
    context: {
      auth: {
        user: request.user,
        isAuthenticated: request.user && request.user.id > 0
      }
    }
  })))
}
