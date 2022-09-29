import { createSlice } from '@reduxjs/toolkit'
import { list } from '../../components/Sort'

const initialState = {
  categoriesType: 0,
  sortType: {name: 'популярности', sortProperty: 'rating'},
  page: 1,
}
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.categoriesType = action.payload
    },
    setSort: (state, action) => {
      state.sortType = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    setSearch: (state, action) => {
      state.categoriesType = Number(action.payload.categoryId);
      state.sortType = list.find(prev => prev.sortProperty === action.payload.sortId);
      state.page = Number(action.payload.pageId)
    }
  },
})

export const { setCategory, setSort, setPage, setSearch } = filterSlice.actions;

export default filterSlice.reducer;