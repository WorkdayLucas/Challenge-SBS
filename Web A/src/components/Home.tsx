import React from 'react'
import { graphQLClient, getProducts } from '../queries/Queries'
import Products from './Products'
import { useDispatch } from 'react-redux'
import { loadProducts } from '../features/slices/productSlice'
import { socket } from '../features/socketConnection/connection'
import { Product } from '../types/types'


const Home = () => {

  const dispatch = useDispatch()


  graphQLClient.request(getProducts).then((data:[Product]) => dispatch(loadProducts(data)))

  socket.on("update list", () => {
    graphQLClient.request(getProducts).then((data:[Product]) => dispatch(loadProducts(data)))
  })

  return (
    <div>
      <Products />
    </div>
  )
}

export default Home