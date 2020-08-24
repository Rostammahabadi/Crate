// Imports
import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import { UserType } from './types'
import { create, remove } from './resolvers'

// This is where the data from the front end post request goes when it hits the API (if create or remove). It requires the resolvers which in turn require the `setup/models` which figures out which resources to create.

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

// These mutuations allow us to update the user resource for a given user. Currently we are only creating and destroying, but based on the assigned feature we will have to be able to update as well.

// The attributes (args) that a user will be able to update are shipping address and email address.

// In order for update to function, we will need to create an update action in the resolvers file
