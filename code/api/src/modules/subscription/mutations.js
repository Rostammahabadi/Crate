// Imports
import { GraphQLInt , GraphQLString } from 'graphql'
// App Imports
import SubscriptionType from './types'
import { create, remove, updateNextOrder } from './resolvers'

// Subscription create
export const subscriptionCreate = {
  type: SubscriptionType,
  args: {
    crateId: {
      name: 'crateId',
      type: GraphQLInt
    }
  },
  resolve: create
}

// Subscription remove
export const subscriptionRemove = {
  type: SubscriptionType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}

// nextOrder Update
export const nextOrderUpdate = {
  type: SubscriptionType,
  args: {
    nextOrder: {
      name: 'nextOrder',
      type: GraphQLString
    },
    user: {
      name: 'user',
      type: GraphQLInt
    },
    crate: {
      name: 'crate',
      type: GraphQLInt
    }
  },
  resolve: updateNextOrder
}
