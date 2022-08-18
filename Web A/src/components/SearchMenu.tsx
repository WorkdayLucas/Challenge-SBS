import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
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
import { Box } from '@mui/material';
import { height } from '@mui/system';
import { useDispatch } from 'react-redux';
import { activateResetPage, clearSearchInput, setPagesCount, setProductsInput } from '../features/slices/productSlice';
import { getProducts, graphQLClient } from '../queries/Queries';
import { DataProducts } from '../types/types';

export default function SearchMenu({ visibility }: any) {
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const dispatch = useDispatch()

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClick1 = () => {
        setOpen1(!open1);
    };

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                position: "absolute",
                zIndex: 1500,
                marginLeft: "-21rem",
                marginBottom: "-14rem",
                visibility: `${visibility ? "visible" : "hidden"}`
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Params
                </ListSubheader>
            }
        >
            <ListItemButton>
                <ListItemIcon>
                    <RefreshIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Get All"
                    sx={{ color: "black" }}
                    onClick={() => {
                        graphQLClient.request(getProducts, { name: "", limit:0, skip:0 }).
                        then((data: DataProducts) => { dispatch(setPagesCount(Math.ceil(data.products.length / 6))); dispatch(activateResetPage()) })
                        dispatch(setProductsInput({ name: "", limit: 6, skip: 0 }))
                        dispatch(clearSearchInput())
                    }} />
            </ListItemButton>


            <ListItemButton onClick={handleClick1}>
                <ListItemIcon>
                    <SortIcon />
                </ListItemIcon>
                <ListItemText primary="Sort(coming soon)" sx={{ color: "black" }} />
                {open1 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open1} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <SortByAlphaIcon />
                        </ListItemIcon>
                        <ListItemText primary="Alphabetic(coming soon)" sx={{ color: "black" }} />
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
        </List>
    );
}