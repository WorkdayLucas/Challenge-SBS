import React from 'react'
import { graphQLClient, getProducts } from '../queries/Queries'
import { socket } from '../features/socketConnection/connection'
import Products from './Products'
import { useDispatch } from 'react-redux'
import { loadProducts } from '../features/slices/productSlice'
import '../App.css'



import { Product } from '../types/types'


const Home = () => {

 
  const dispatch = useDispatch()

  graphQLClient.request(getProducts).then((data:[Product]) => dispatch(loadProducts(data))).catch((err)=>{console.log(err)})


  socket.on("update list", () => {
    graphQLClient.request(getProducts).then((data:[Product]) => dispatch(loadProducts(data)))
  })

  return (
    <div className='homContainer'>
      <Products />
    </div>
  )
}

export default Home