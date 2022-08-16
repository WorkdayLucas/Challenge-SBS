import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentProduct } from '../features/slices/productSlice';


import './ProductModal.css';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	maxHeight: "90vh",
    overflow: "auto",
    '&::-webkit-scrollbar': {
        width: "8px",
    },
    '&::-webkit-scrollbar-track': {
        background: "rgb(236, 239, 240)",
    },

    '&::-webkit-scrollbar-thumb': {
        backgroundColor: "rgb(153, 153, 153)",
        borderRadius: "20px",
    },
};


const ProductModal = ({ children, isOpen, closeModal }: any | void) => {

	const handleModalContainerClick = (event: React.MouseEvent<HTMLElement>) =>
		event.stopPropagation();

	const product = useSelector(selectCurrentProduct)


	return (
		<article className={`modal ${isOpen && 'is-open'}`} onClick={closeModal}>
			<Box sx={style}>
				<Typography variant="body2">
					Id: {`${product._id}`}
				</Typography>
				<img className='modalImg' src={`${product.img}`} />
				<Typography sx={{ fontSize: "1.2rem", color: "#222", fontWeight: "500"  }} color="text.secondary" gutterBottom>
					{product.name}
				</Typography>
				<Typography sx={{marginTop: "1rem" }} variant="body2">
					{`${product.description}`}
				</Typography>
				<Typography sx={{ fontSize: "1.4rem", marginTop: "1rem", color: "#222", fontWeight: "500" }} variant="body2">
					{`$ ${product.price}`}
				</Typography>

			</Box>
		</article>
	);
};

export default ProductModal;
