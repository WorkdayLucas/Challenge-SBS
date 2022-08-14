import React from 'react'
import { request, gql } from 'graphql-request'
import Products from './Products'
import { useDispatch } from 'react-redux'
import { loadProducts } from '../features/slices/productSlice'

const Home = () => {


    const dispatch = useDispatch()

    const query = gql`
    {
      products {
        _id
        name
        description
      }
    }
    `
    request('http://localhost:3001/api-products', query).then((data) => dispatch(loadProducts(data)))

  return (
    <div>
        <Products/>
    </div>  
  )
}

export default Home