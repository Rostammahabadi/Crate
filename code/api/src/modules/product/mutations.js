// This file is utilized for the mutation of data in the database
// Such as update, delete, and create
// We will need to add a method in here to update the product that is returned
// in the joins table between the user and the product
// Imports
import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import { ProductType } from './types'
import { create, update, remove } from './resolvers'

// Product create
export const productCreate = {
  type: ProductType,
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },

    slug: {
      name: 'slug',
      type: GraphQLString
    },

    description: {
      name: 'description',
      type: GraphQLString
    },

    type: {
      name: 'type',
      type: GraphQLInt
    },

    gender: {
      name: 'gender',
      type: GraphQLInt
    },

    image: {
      name: 'image',
      type: GraphQLString
    }
  },
  resolve: create
}

// Product update
export const productUpdate = {
  type: ProductType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },

    name: {
      name: 'name',
      type: GraphQLString
    },

    slug: {
      name: 'slug',
      type: GraphQLString
    },

    description: {
      name: 'description',
      type: GraphQLString
    },

    type: {
      name: 'type',
      type: GraphQLInt
    },

    gender: {
      name: 'gender',
      type: GraphQLInt
    },

    image: {
      name: 'image',
      type: GraphQLString
    }
  },
  resolve: update
}

// Product remove
export const productRemove = {
  type: ProductType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}
