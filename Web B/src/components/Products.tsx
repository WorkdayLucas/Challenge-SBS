import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectProducts } from '../features/slices/productSlice'
import { Product } from '../types/types'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { graphQLClient, deleteProduct } from '../queries/Queries'
import { socket } from '../features/socketConnection/connection';


import './Products.css'



const Products = () => {



  const products: [Product] | [] = useSelector(selectProducts)
  console.log(products)

  const handleDelete = (id: String) => {
    graphQLClient.request(deleteProduct, { _id: id })
    socket.emit("delete product")
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right"></TableCell>
            <TableCell align="right">Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Setings</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              // key={product.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img className='productImg' src={`${product.img}`} alt={`${product.name}`}/>
              </TableCell>
              <TableCell align="right">{product._id}</TableCell>
              <TableCell align="right">{product.name}</TableCell>
              <TableCell align="right">{"$" + product.price}</TableCell>
              <TableCell align="right">{product.description}</TableCell>
              <TableCell align="right">
                <Button variant="contained" size="small">
                  Edit
                </Button>
                <IconButton aria-label="delete" onClick={() => { handleDelete(product._id) }}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Products