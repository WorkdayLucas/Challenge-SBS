import { GraphQLClient, gql } from 'graphql-request'

const endpoint = `${process.env.REACT_APP_API || "http://localhost:3001/"}api-products/`

export const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
        authorization: 'Bearer MY_TOKEN',
    },
})

export const getProducts = gql`
query GetProducts($name: String){
  products(input: {name : $name}) {
    _id
    key
    name
    description
    price
    img
  }
}
`

export const createProduct = gql`
    mutation CreateProduct($name: String!, $description: String!, $price: Float!, $img: String!) {
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

export const updateProduct = gql`
    mutation UpdateProduct($_id: ID!, $name: String!, $description: String!, $price: Float!, $img: String!) {
        updateProduct (
            _id: $_id,
            input: {
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
