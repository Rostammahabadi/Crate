// Imports
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql'

// App Imports
// grabs all the methods from the resolvers so getall, get user by id, login, and get gender along with data types
import { UserType, UserLoginType, UserGenderType } from './types'
import { getAll, getById, login, getGenders } from './resolvers'
// Grab the users, shoves resolver for method below type
// All
export const users = {
  type: new GraphQLList(UserType),
  resolve: getAll
}
// Grab a user
// By ID
export const user = {
  type: UserType,
  args: {
    id: { type: GraphQLInt }
  },
  resolve: getById
}
// Can a user login
// Auth
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
