// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { getCartFromLS } from '../../components/utils/getCartFromLS';
// import { RootState } from '../store';

// export type CartItem = {
// 	id: string;
// 	title: string;
// 	price: number;
// 	imageUrl: string;
// 	type: string;
// 	size: number;
// 	count?: number;
// };

// type ShortCartItem = {
// 	id: string;
// 	price: number;
// };

// interface CartSliceState {
// 	totalPrice: number;
// 	cart: CartItem[];
// }

// const cartData = getCartFromLS();

// const initialState: CartSliceState = {
// 	cart: cartData.cart,
// 	totalPrice: Number(cartData.totalPrice),
// };

// export const cartSlice = createSlice({
// 	name: 'cart',
// 	initialState,
// 	reducers: {
// 		addProductToCart: (state, action: PayloadAction<CartItem>) => {
// 			const findItem = state.cart.find(item => item.id === action.payload.id);
// 			if (findItem?.count) {
// 				findItem.count++;
// 			} else {
// 				state.cart.push({
// 					...action.payload,
// 					count: 1,
// 				});
// 			}

// 			state.totalPrice += action.payload.price;
// 		},
// 		addOneItem: (state, action: PayloadAction<ShortCartItem>) => {
// 			const findItem = state.cart.find(item => item.id === action.payload.id);
// 			if (findItem?.count) {
// 				findItem.count++;
// 			}
// 			state.totalPrice += action.payload.price;
// 		},

// 		removeOneItem: (state, action: PayloadAction<ShortCartItem>) => {
// 			const findItem = state.cart.find(item => item.id === action.payload.id);
// 			if (findItem?.count) {
// 				findItem.count--;
// 			}
// 			state.totalPrice -= action.payload.price;
// 			if (findItem?.count === 0) {
// 				state.cart = state.cart.filter(item => item.id !== action.payload.id);
// 			}
// 		},

// 		removeProductFromCart: (state, action: PayloadAction<ShortCartItem>) => {
// 			const findItem = state.cart.find(item => item.id === action.payload.id);
// 			if (findItem?.count) {
// 				state.totalPrice -= action.payload.price * findItem.count;
// 			}

// 			state.cart = state.cart.filter(item => item.id !== action.payload.id);
// 		},

// 		clearCart: state => {
// 			state.cart = [];
// 			state.totalPrice = 0;
// 		},
// 	},
// });

// export const selectCart = (state: RootState) => state.cart;
// export const selectCartItemById = (id: string) => (state: RootState) =>
// 	state.cart.cart.find(item => item.id === id);

// export const {
// 	addProductToCart,
// 	removeProductFromCart,
// 	clearCart,
// 	addOneItem,
// 	removeOneItem,
// } = cartSlice.actions;

// export default cartSlice.reducer;
