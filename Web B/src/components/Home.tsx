import React from 'react'
import { request, gql } from 'graphql-request'
import Products from './Products'
import { useDispatch } from 'react-redux'
import { loadProducts } from '../features/slices/productSlice'

import { useProductModal } from './useProductModal';
import ProductModal from './ProductModal';

import Button from '@mui/material/Button';

const Home = () => {

  const [isOpenModal, openModal, closeModal] = useProductModal(false)
  const dispatch = useDispatch()

  const query = gql`
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
  request('http://localhost:3001/api-products', query).then((data) => dispatch(loadProducts(data)))

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