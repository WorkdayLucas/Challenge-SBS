import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { getProducts, graphQLClient } from '../queries/Queries';
import { DataProducts } from '../types/types';
import { loadProducts, selectProductsInput, setProductsInput, selectResetPage } from '../features/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';


import { Obj } from 'reselect/es/types';
import { socket } from '../features/socketConnection/connection';

export default function PaginationControlled() {
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  const resetPage = useSelector(selectResetPage)
  const producInput = useSelector(selectProductsInput)
  const dispatch = useDispatch()
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // React.useEffect(()=>{
  //   graphQLClient.request(getProducts, {name: producInput.name}).then((data:DataProducts) => setCount(Math.ceil(data.products.length/6)))
  // },[])

  React.useEffect(()=>{
    dispatch(setProductsInput({...producInput, limit:6, skip: 6*(page-1)}))
    // console.log(producInput)
    // graphQLClient.request(getProducts, producInput).then((data:DataProducts) => dispatch(loadProducts(data)))
  },[page])

  React.useEffect(()=>{
    graphQLClient.request(getProducts, {name: producInput.name}).then((data:DataProducts) => setCount(Math.ceil(data.products.length/6)))
    setPage(1)
    // console.log("se actualiza")
  },[resetPage])
 

  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={count} page={page} onChange={handleChange} />
    </Stack>
  );
}