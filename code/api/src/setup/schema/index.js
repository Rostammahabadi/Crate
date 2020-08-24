// Imports
import { GraphQLSchema } from 'graphql'

// App Imports
// grab the get and edit stuff along with the correspond resolver method already attached and the data types
import query from './queries'
// Also I am wanting that schema that all the actions work off of
import mutation from './mutations'

// Schema
// Lets show everything together so it looks nice an pretty and call that our schema
const schema = new GraphQLSchema({
  query,
  mutation
})

export default schema
