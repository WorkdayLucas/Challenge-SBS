import React, { useEffect } from 'react'
import { getProducts, graphQLClient } from '../queries/Queries';
import { socket } from '../features/socketConnection/connection'
import Products from './Products'
import { useDispatch, useSelector } from 'react-redux'
import { activateResetPage, loadProducts, selectProductsInput, setPagesCount, setProductsInput } from '../features/slices/productSlice'
import { DataProducts } from '../types/types'
import PaginationControlled from './Pagination'


const Home = () => {

  const producInput = useSelector(selectProductsInput)

  const dispatch = useDispatch()

  socket.on("update list", () => {
    dispatch(setProductsInput(producInput))
    graphQLClient.request(getProducts, { name: "", limit:0, skip:0 }).
    then((data: DataProducts) => { dispatch(setPagesCount(Math.ceil(data.products.length / 6))) })
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