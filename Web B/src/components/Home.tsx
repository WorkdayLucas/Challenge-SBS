import React from 'react'
import { graphQLClient, getProducts } from '../queries/Queries'
import { socket } from '../features/socketConnection/connection'
import Products from './Products'
import { useDispatch } from 'react-redux'
import { loadProducts } from '../features/slices/productSlice'

import { useProductModal } from './useProductModal';
import ProductModal from './ProductModal';

import Button from '@mui/material/Button';
import { Product } from '../types/types'

const Home = () => {

  const [isOpenModal, openModal, closeModal] = useProductModal(false)
  const dispatch = useDispatch()

  graphQLClient.request(getProducts).then((data:[Product]) => dispatch(loadProducts(data)))

  socket.on("delete product", () => {
    graphQLClient.request(getProducts).then((data:[Product]) => dispatch(loadProducts(data)))
  })

  return (
    <div>
      <Products />
      <Button variant="contained" size="small" onClick={openModal}>
        +
      </Button>
      <ProductModal isOpen={isOpenModal} closeModal={closeModal}/>

    </div>
  )
}

export default Home