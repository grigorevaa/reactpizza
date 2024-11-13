import { CartItem } from '../../redux/slices/cart/types';

type ReturnType = {
	cart: CartItem[];
	totalPrice: number;
};

export const getCartFromLS = (): ReturnType => {
	const dataCart = localStorage.getItem('cart');
	const cart = dataCart ? JSON.parse(dataCart) : [];
	const dataTotalPrice = localStorage.getItem('totalPrice');
	const totalPrice = dataTotalPrice ? JSON.parse(dataTotalPrice) : [];
	return {
		cart,
		totalPrice,
	};
};
