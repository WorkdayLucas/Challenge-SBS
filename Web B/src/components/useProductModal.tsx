import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadProductToEdit } from '../features/slices/productSlice';

export const useProductModal = (initialValue = false) => {
	const [isOpen, setIsOpen] = useState(initialValue);
	const dispatch = useDispatch()

	const openModal = () => setIsOpen(true);
	const closeModal = () => {
		dispatch(loadProductToEdit({
			img: "",
			name: "",
			description: "",
			price: null,
			_id: "",
			key: 0,
			set: false
		}))
		setIsOpen(false)};

	return [isOpen, openModal, closeModal] as const;
};