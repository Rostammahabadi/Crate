// Imports
import { GraphQLString, GraphQLInt } from 'graphql'

// This file defines how the fields in the user database are updated.

// App Imports
// Note this is grabing from the types and resolvers files within the user directory
import { UserType } from './types'
import { create, remove } from './resolvers'

// Create
export const userSignup = {
  type: UserType,
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },

    email: {
      name: 'email',
      type: GraphQLString
    },

    password: {
      name: 'password',
      type: GraphQLString
    }
  },
  resolve: create
}
// This deletes a user of a given id, the functionality is in the resolver, under the remove 

// Remove
export const userRemove = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}
