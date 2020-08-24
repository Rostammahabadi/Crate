// Imports
import { GraphQLString, GraphQLInt, GraphQLList } from 'graphql'

// App Imports
// get teh product types and the gender stuff
import { ProductType, ProductTypesType } from './types'
import { getAll, getBySlug, getById, getRelated, getTypes } from './resolvers'
//here are methods
// Give mee all the products
// Products All
export const products = {
  type: new GraphQLList(ProductType),
  resolve: getAll
}

// give me a product based on a slug I shove at you
// Product By slug
export const product = {
  type: ProductType,
  args: {
    slug: { type: GraphQLString }
  },
  resolve: getBySlug
}

// give me a product based on an id a shove at you
// Product By ID
export const productById = {
  type: ProductType,
  args: {
    productId: { type: GraphQLInt }
  },
  resolve: getById
}

// For related products method and stuff
// Products Related
export const productsRelated = {
  type: new GraphQLList(ProductType),
  args: {
    productId: { type: GraphQLInt }
  },
  resolve: getRelated
}

// So list of all types for all the products go here
// Product Types
export const productTypes = {
  type: new GraphQLList(ProductTypesType),
  resolve: getTypes
}
