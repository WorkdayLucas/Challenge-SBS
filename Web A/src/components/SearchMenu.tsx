import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SortIcon from '@mui/icons-material/Sort';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CategoryIcon from '@mui/icons-material/Category';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useDispatch, useSelector } from 'react-redux';
import { activateResetPage, clearSearchInput, loadProducts, selectProductsInput, setPagesCount, setProductsInput } from '../features/slices/productSlice';
import { getProducts, graphQLClient } from '../queries/Queries';
import { DataProducts } from '../types/types';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import PriceChangeIcon from '@mui/icons-material/PriceChange';

export default function SearchMenu() {
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [sortAlphabetic, setSortAlphabetic] = React.useState(true)
    const [sortPrice, setSortPrice] = React.useState(true)
    const [filter, setFilter] = React.useState("")


    const productInput = useSelector(selectProductsInput)
    const dispatch = useDispatch()
    const handleClick = () => {
        setOpen(!open);
    };
    const handleClick1 = () => {
        setOpen1(!open1);
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openmenu = Boolean(anchorEl);
    const handleClickmenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    React.useEffect(() => {

    }, [sortAlphabetic])

    return (
        <div>
            <Button
                sx={{ background: "rgb(59, 138, 217,.6)", height: "2.4rem" }}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClickmenu}
            >
                <KeyboardArrowDownIcon sx={{ color: "white", position: "absolute", marginRight: "1.4rem", marginTop: ".2rem" }} />
                <SettingsSuggestIcon sx={{ color: "white", position: "relative", left: ".4rem" }} />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openmenu}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <RefreshIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Get All"
                        sx={{ color: "black" }}
                        onClick={() => {
                            graphQLClient.request(getProducts, { name: "", limit: 0, skip: 0 }).
                                then((data: DataProducts) => { dispatch(setPagesCount(Math.ceil(data.products.length / 6))); dispatch(activateResetPage()); })
                            dispatch(setProductsInput({ name: "", limit: 6, skip: 0, sortField: "", sortDirect: 0 }))
                            dispatch(clearSearchInput())
                            setSortAlphabetic(true)
                            setSortPrice(true)
                            setFilter("")
                        }} />
                </ListItemButton>

                <ListItemButton onClick={handleClick1}>
                    <ListItemIcon>
                        <SortIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sort" sx={{ color: "black" }} />
                    {open1 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open1} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => {
                            setSortAlphabetic(!sortAlphabetic)
                            setFilter("alpha")
                            dispatch(setProductsInput({ ...productInput, limit: 6, skip: 0, sortField: "name", sortDirect: sortAlphabetic ? 1 : -1 }))
                            dispatch(activateResetPage())
                        }}>
                            <ListItemIcon >
                                <SortByAlphaIcon />
                            </ListItemIcon>
                            <ListItemText primary={`Alphabetic ${filter !== "alpha" ? "" : productInput.sortDirect === 1 ? "A-Z" : "Z-A"}`} sx={{ color: "black" }} />
                        </ListItemButton>

                        <ListItemButton sx={{ pl: 4 }} onClick={() => {
                            setSortPrice(!sortPrice)
                            setFilter("price")
                            dispatch(setProductsInput({ ...productInput, limit: 6, skip: 0, sortField: "price", sortDirect: sortPrice ? 1 : -1 }))
                            dispatch(activateResetPage())
                        }}>
                            <ListItemIcon >
                                <PriceChangeIcon />
                            </ListItemIcon>
                            <ListItemText primary={`Price ${filter !== "price" ? "" : productInput.sortDirect === 1 ? "Min-Max" : "Max-Min"}`} sx={{ color: "black" }} />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <FilterAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Filt(coming soon)" sx={{ color: "black" }} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Categoria(coming soon)" sx={{ color: "black" }} />
                        </ListItemButton>
                    </List>
                </Collapse>

            </Menu>
        </div>
    );
}
