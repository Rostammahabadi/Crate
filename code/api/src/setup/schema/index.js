// Imports
import { GraphQLSchema } from 'graphql'

// App Imports
import query from './queries'
import mutation from './mutations'

// Schema
// create the graph ql schema with all the mutations + queries 
const schema = new GraphQLSchema({
  query,
  mutation
})

export default schema
