import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzas',
    async ({inputValue, page, sortType, categoriesType}) => {
        const { data } = await axios.get(`https://6318d403f6b281877c77bfdc.mockapi.io/items?${inputValue ? ('&search=' + inputValue) : ''}&page=${page}&sortBy=${sortType}&order=desc&limit=4&${
            (categoriesType > 0) ? ('category=' + categoriesType) : '' }`)
      return data;
    }
  )


const initialState = {
  status: 'loading',
  items: [],
}
const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    addPizzas: (state, action) => {
      state.items = action.payload
    }
  },
  extraReducers: {
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
    }
  }
})

export const { addPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;