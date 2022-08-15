import React from 'react'
import { graphQLClient, getProducts } from '../queries/Queries'
import { socket } from '../features/socketConnection/connection'
import Products from './Products'
import { useDispatch } from 'react-redux'
import { loadProducts } from '../features/slices/productSlice'
import '../App.css'



import { Product } from '../types/types'
import NavBar from './NavBar'

const Home = () => {

 
  const dispatch = useDispatch()

  graphQLClient.request(getProducts).then((data:[Product]) => dispatch(loadProducts(data)))


  socket.on("update list", () => {
    graphQLClient.request(getProducts).then((data:[Product]) => dispatch(loadProducts(data)))
  })

  return (
    <div className='homContainer'>
      <NavBar/>
      <Products />
    </div>
  )
}

export default Home