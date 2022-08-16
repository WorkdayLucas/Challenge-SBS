import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useProductModal } from './useProductModal';
import ProductModal from './ProductModal';

import { graphQLClient, getProducts } from '../queries/Queries'
import { Product } from '../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts, selectIsEditing } from '../features/slices/productSlice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));



const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function NavBar() {

  const [menuVisivility, setMenuVisivility] = useState(false)

  const [isOpenModal, openModal, closeModal] = useProductModal(false)

  const [search, setSearch] = useState("")

  const dispatch = useDispatch()

  const isEditing = useSelector(selectIsEditing)

  const handleChange = (e: any) => {
    setSearch(e.target.value.trimStart())
  }

  const handleSearch = () => {
    graphQLClient.request(getProducts, {name: search})
    .then((data:[Product]) =>{dispatch(loadProducts(data))})
    .catch((err)=>{console.log(err)})
  }

  const handleEnter = (e: any) =>{
    if(e.key==="Enter" && search.trim() !== ""){
      handleSearch()
    }
  }

useEffect(()=>{
  if(isEditing){
    openModal()
  }
},[isEditing])


  return (
    <Box sx={{ flexGrow: 1, position: "fixed", width: "100%", zIndex: 1000 }}>
      <AppBar position="static">
        <Toolbar>
          
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => {
              setMenuVisivility(!menuVisivility)
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, fontSize: "1.7rem" }}
          >
            Products
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              value={search}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleChange}
              onKeyDown={handleEnter}
            />
          </Search>

          <AddCircleIcon sx={{
            color: green[500],
            cursor: "pointer",
            '&:hover': {
              backgroundColor: 'primary.main',
              opacity: [0.9, 0.8, 0.7],
            },
          }} onClick={openModal} />
          <ProductModal isOpen={isOpenModal} closeModal={closeModal} />

        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          zIndex: 1000,
          left: menuVisivility ? 0 : -300,
          top: 0,
          width: 300,
          padding: 0,
          height: "100%",
          backgroundColor: 'primary.dark',
          transition: ".3s",
          right: "calc(100% - 100px)"
        }}
      >
        <Box sx={{
          display: "flex",
          marginTop: "1rem",
          alignItems: "center",
          height: "1.2rem",
          width: "100%",
          position: "fixed"
        }}>
          <ArrowBackIcon
            sx={{
              position: "relative",
              left: 0,
              fontSize: 20,
              color: "rgb(230, 230, 230)",
              '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
              },
            }}
            onClick={() => {
              setMenuVisivility(!menuVisivility)
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { sm: 'block' },
              color: "rgb(230, 230, 230)",
            }}
          >
            Menu
          </Typography>
        </Box>
      </Box>

    </Box >
  );
}