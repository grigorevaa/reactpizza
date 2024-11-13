export type CartItem = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	type: string;
	size: number;
	count?: number;
};

export type ShortCartItem = {
	id: string;
	price: number;
};

export interface CartSliceState {
	totalPrice: number;
	cart: CartItem[];
}
