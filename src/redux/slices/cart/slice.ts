import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../../components/utils/getCartFromLS';
import { CartItem, CartSliceState, ShortCartItem } from './types';

const cartData = getCartFromLS();

const initialState: CartSliceState = {
	cart: cartData.cart,
	totalPrice: Number(cartData.totalPrice),
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProductToCart: (state, action: PayloadAction<CartItem>) => {
			const findItem = state.cart.find(item => item.id === action.payload.id);
			if (findItem?.count) {
				findItem.count++;
			} else {
				state.cart.push({
					...action.payload,
					count: 1,
				});
			}

			state.totalPrice += action.payload.price;
		},
		addOneItem: (state, action: PayloadAction<ShortCartItem>) => {
			const findItem = state.cart.find(item => item.id === action.payload.id);
			if (findItem?.count) {
				findItem.count++;
			}
			state.totalPrice += action.payload.price;
		},

		removeOneItem: (state, action: PayloadAction<ShortCartItem>) => {
			const findItem = state.cart.find(item => item.id === action.payload.id);
			if (findItem?.count) {
				findItem.count--;
			}
			state.totalPrice -= action.payload.price;
			if (findItem?.count === 0) {
				state.cart = state.cart.filter(item => item.id !== action.payload.id);
			}
		},

		removeProductFromCart: (state, action: PayloadAction<ShortCartItem>) => {
			const findItem = state.cart.find(item => item.id === action.payload.id);
			if (findItem?.count) {
				state.totalPrice -= action.payload.price * findItem.count;
			}

			state.cart = state.cart.filter(item => item.id !== action.payload.id);
		},

		clearCart: state => {
			state.cart = [];
			state.totalPrice = 0;
		},
	},
});

export const {
	addProductToCart,
	removeProductFromCart,
	clearCart,
	addOneItem,
	removeOneItem,
} = cartSlice.actions;

export default cartSlice.reducer;
