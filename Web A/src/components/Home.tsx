import React, { useEffect } from 'react'
import { getProducts, graphQLClient } from '../queries/Queries';
import { socket } from '../features/socketConnection/connection'
import Products from './Products'
import { useDispatch, useSelector } from 'react-redux'
import { loadProducts, selectProductsInput, setProductsInput } from '../features/slices/productSlice'
import { DataProducts } from '../types/types'
import PaginationControlled from './Pagination'


const Home = () => {

  const producInput = useSelector(selectProductsInput)

  const dispatch = useDispatch()
  // graphQLClient.request(getProducts, {limit: 6, skip: 0}).then((data:[Product]) => dispatch(loadProducts(data)))

  socket.on("update list", () => {
    dispatch(setProductsInput(producInput))
    // graphQLClient.request(getProducts, producInput).then((data:DataProducts) => dispatch(loadProducts(data)))
  })

  useEffect(()=>{
    console.log("home", producInput)
    graphQLClient.request(getProducts, producInput).then((data:DataProducts) => dispatch(loadProducts(data)))
  },[producInput])

  return (
    <div className='homContainer'>
      <Products />
      <PaginationControlled/>
    </div>
  )
}

export default Home