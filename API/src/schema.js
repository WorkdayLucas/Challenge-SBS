import { makeExecutableSchema } from '@graphql-tools/schema'
import { resolvers } from './resolvers';

const typeDefs = [`
  type Query {
    products: [Product]
  }

  type Mutation {
    createProduct(input: ProductInput): Product
    deleteProduct(_id: ID): Product
    updateProduct(_id: ID, input: ProductInput ): Product
  }

  type Product {
    _id: ID
    key: Int!
    name: String!
    description: String!
    price: Int!
    img: String! 
  }

  input ProductInput {
    name: String!
    description: String!
    price: Int!
    img: String!
  }

`];


export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})