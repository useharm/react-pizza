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
      console.log(state.status);
    },
    [fetchPizzas.pending]: (state) => {   //////// NEED TO FIX
      state.status = "loading";
      console.log(state.status);
    },
    [fetchPizzas.rejected]: (state) => {    ////////// NEED TO FIX (error with successful fetch)
      state.status = "error";
      console.log(state.status);
    }
  }
})

export const { addPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;