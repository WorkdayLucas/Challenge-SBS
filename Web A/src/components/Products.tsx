import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts } from '../features/slices/productSlice'
import { Product } from '../types/types'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useProductModal } from './useProductModal';
import ProductModal from './ProductModal';

import { loadCurrentProduct } from '../features/slices/productSlice';

import './Products.css'


const Products = () => {

  const products: [Product] | [] = useSelector(selectProducts)
  const [isOpenModal, openModal, closeModal] = useProductModal(false)

  const dispatch = useDispatch()

  return (
    <div className='productsContainer'>
      <ul className='productList'>
        {
          products.map((product: Product) => {
            return <li key={`${product.key}`}>
              <Card sx={{ width: 350, height: 260, margin: 1 }}>
                <CardContent>
                  <img className='productImg' src={`${product.img}`}/>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2">
                    {`${product.description.substring(0,40)}${product.description.length>40? "..." : ""}`}
                  </Typography>
                  <Typography variant="body2">
                    {`$ ${product.price}`}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={()=>{
                    dispatch(loadCurrentProduct({
                      img: product.img,
                      name: product.name,
                      description: product.description,
                      price: product.price,
                      _id: product._id,
                      key: product.key,
                    }));
                    openModal()
                  }}>Ver mas</Button>
                  <ProductModal 
                  isOpen={isOpenModal} 
                  closeModal={closeModal} 
                  />
                </CardActions>
              </Card>
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default Products