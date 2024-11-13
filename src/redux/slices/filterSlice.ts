import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
	RATING_DESC = '-rating',
	RATING_ASC = 'rating',
	PRICE_DESC = '-price',
	PRICE_ASC = 'price',
	TITLE = 'title',
}

export type SortListItem = {
	name: string;
	sortProperty: SortPropertyEnum;
};

interface FilterSliceState {
	searchValue: string;
	categoryId: number;
	currentPage: number;
	sort: SortListItem;
}

const initialState: FilterSliceState = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности (по возр.)',
		sortProperty: SortPropertyEnum.RATING_ASC,
	},
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId: (state, action: PayloadAction<number>) => {
			state.categoryId = action.payload;
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		},
		setSortType: (state, action: PayloadAction<SortListItem>) => {
			state.sort = action.payload;
		},
		changePage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setFilters: (state, action: PayloadAction<FilterSliceState>) => {
			if (Object.keys(action.payload).length) {
				state.categoryId = Number(action.payload.categoryId);
				state.currentPage = Number(action.payload.currentPage);
				if (action.payload.sort) {
					state.sort.sortProperty = action.payload.sort.sortProperty;
					state.sort.name = action.payload.sort.name;
				}
			} else {
				state.currentPage = 1;
				state.categoryId = 0;
				state.sort = {
					name: 'популярности (по возр.)',
					sortProperty: SortPropertyEnum.RATING_ASC,
				};
			}
		},
	},
});

export const selectFilter = (state: RootState) => state.filter;
// Action creators are generated for each case reducer function
export const {
	setCategoryId,
	setSortType,
	changePage,
	setFilters,
	setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
