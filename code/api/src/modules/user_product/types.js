import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList } from 'graphql'
// App Imports
import { UserType } from '../user/types'
import { ProductType } from '../product/types'
const UserProductsType = new GraphQLObjectType({
  name: 'user_products',
  description: 'UserProducts Type',
  fields: () => ({
    id: { type: GraphQLInt },
    user: {type: UserType },
    product: { type: ProductType },
    kept: { type: GraphQLBoolean}
  })
})
