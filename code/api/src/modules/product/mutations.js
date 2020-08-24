// Imports
// This describe any changes to parts of the database such as adding, updating, and removing products
import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import { ProductType } from './types'
import { create, update, remove } from './resolvers'
//creating a product of type ProductType with fields name, slug, description, types, gender, image
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
// updating a product with the same fields
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
// deleting a product of type ProductType
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
