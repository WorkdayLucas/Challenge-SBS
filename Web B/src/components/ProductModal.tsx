import Box from '@mui/material/Box';
import CreateProductForm from './CreateProductForm';

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
	return (
		<article className={`modal ${isOpen && 'is-open'}`} >
			<Box sx={style}>
				<CreateProductForm close={closeModal}/>
			</Box>
		</article>
	);
};

export default ProductModal;
