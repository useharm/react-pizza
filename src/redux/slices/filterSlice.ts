import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';


export type SetSearchType = {
  categoryId: number;
  sortId: Sort;
  pageId: number;
}

export type Sort = {
  name: string;
  sortProperty: 'rating' | 'price' | 'name';
};

interface filterSliceState {
  categoriesType: number;
  sortType: Sort;
  page: number;
  searchValue?: string;
}

const initialState: filterSliceState = {
  categoriesType: 0,
  sortType: {name: 'популярности', sortProperty: 'rating'},
  page: 1,
  searchValue: '',
}
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.categoriesType = action.payload
    },
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sortType = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setSearch: (state, action: PayloadAction<SetSearchType>) => {
      state.categoriesType = Number(action.payload.categoryId);
      state.sortType = action.payload.sortId;
      state.page = Number(action.payload.pageId)
    },
    setInputValue: (state, action) => {
      state.searchValue = action.payload;
    }
  },
})
export const searchTypeSelector = (state: RootState) => state.filter.sortType;
export const searchSelector = (state: RootState) => state.filter;
export const { setCategory, setSort, setPage, setSearch, setInputValue } = filterSlice.actions;

export default filterSlice.reducer;