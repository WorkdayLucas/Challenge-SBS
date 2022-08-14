import { GraphQLClient, gql } from 'graphql-request'

const endpoint = 'http://localhost:3001/api-products/'

export const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
        authorization: 'Bearer MY_TOKEN',
    },
})

export const products = gql`
{
  products {
    _id
    name
    description
    price
    img
  }
}
`

export const createProduct = gql`
    mutation CreateProduct($name: String!, $description: String!, $price: Int!, $img: String!) {
        createProduct (input: {
            name: $name,
            description: $description
            price: $price
            img: $img
            }) {
            _id
            name
            description
            price
            img
        }
    }
`

export const deleteProduct = gql`
    mutation DeleteProduct($_id: ID!) {
        deleteProduct (_id: $_id) {
            _id
            name
            description
            price
            img
        }
    }
`
