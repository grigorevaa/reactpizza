import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export type FetchPizzasArgs = {
	sortBy: string;
	order: string;
	category: string;
	search: string;
	currentPage: number;
};

type Pizza = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
	rating: number;
};

interface PizzaSliceState {
	pizzas: Pizza[];
	status: Status;
}

const initialState: PizzaSliceState = {
	pizzas: [],
	status: Status.LOADING,
};

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
	'pizza/fetchPizzas',
	async params => {
		const { sortBy, order, category, search, currentPage } = params;

		const { data } = await axios.get<Pizza[]>(
			`https://66f99a1fafc569e13a993c8d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
		);

		return data;
	},
);

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		// setPizzas: (state, action: PayloadAction<Pizza[]>) => {
		// 	state.pizzas = action.payload;
		// },
	},
	extraReducers: builder => {
		builder
			.addCase(fetchPizzas.pending, state => {
				state.status = Status.LOADING;
				state.pizzas = [];
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.status = Status.SUCCESS;
				state.pizzas = action.payload;
			})
			.addCase(fetchPizzas.rejected, state => {
				state.status = Status.ERROR;
				state.pizzas = [];
			});
	},
});

export const selectPizzas = (state: RootState) => state.pizza;

// export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
