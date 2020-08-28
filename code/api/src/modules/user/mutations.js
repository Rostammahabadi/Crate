// Imports
import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import { UserType } from './types'
import { create, remove , updateEmailResolver, updateAddressResolver, updateImageResolver} from './resolvers'

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

// Update Email
export const updateEmail = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },
    email: {
      email: 'email',
      type: GraphQLString
    }
  },
  resolve: updateEmailResolver
}

// Update Address
export const updateAddress = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },
    address: {
      address: 'address',
      type: GraphQLString
    }
  },
  resolve: updateAddressResolver
}

// Upload Image
export const updateImage = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },
    image: {
      image: 'image',
      type: GraphQLString
    }
  },
  resolve: updateImageResolver
}
