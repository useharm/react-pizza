import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoriesType: 0,
  sortType: {name: 'популярности', sortProperty: 'rating'},
  page: 1,
}

export const filterSlice = createSlice({
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
    }
  },
})

export const { setCategory, setSort, setPage } = filterSlice.actions;

export default filterSlice.reducer;