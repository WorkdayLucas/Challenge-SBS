import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectProducts } from '../features/slices/productSlice'
import { Product } from '../types/types'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './Products.css'


const Products = () => {

  const products: [Product] | [] = useSelector(selectProducts)
  console.log(products)



  return (
    <div className='productsContainer'>
      <ul className='productList'>
        {
          products.map((product: Product) => {
            return <li>
              <Card sx={{ maxWidth: 300 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2">
                    {product.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Ver mas</Button>
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