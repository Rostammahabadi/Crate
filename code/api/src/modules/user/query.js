// Imports
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql'

// App Imports
import { UserType, UserLoginType, UserGenderType } from './types'
import { getAll, getById, login, getGenders } from './resolvers'

// All
export const users = {
  type: new GraphQLList(UserType),
  resolve: getAll
}

// By ID
export const user = {
  type: UserType,
  args: {
    id: { type: GraphQLInt }
  },
  resolve: getById
}

// Auth
// this needs an addition of args to Email, Address, Bio Description, Image
// could also get an array of products delivered, products kept, current subscriptions?
// Does the address need to be required here? and if yes, do we need to update the login page as well? 
export const userLogin = {
  type: UserLoginType,
  args: {
    email: {
      name: 'email',
      type: GraphQLString
    },

    password: {
      name: 'password',
      type: GraphQLString
    },

    role: {
      name: 'role',
      type: GraphQLString
    }
  },
  resolve: login
}

// Genders
export const userGenders = {
  type: new GraphQLList(UserGenderType),
  resolve: getGenders
}
