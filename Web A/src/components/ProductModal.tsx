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
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					{product.name}
				</Typography>
				<Typography variant="body2">
					{`${product.description}`}
				</Typography>
				<Typography variant="body2">
					{`$ ${product.price}`}
				</Typography>

			</Box>
		</article>
	);
};

export default ProductModal;
