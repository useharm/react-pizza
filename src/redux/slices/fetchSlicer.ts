import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export type PizzaFilters = {
  inputValue: string;
  page: number;
  sortType: string;
  categoriesType: number;
}

interface Pizza {
  id: number;
  imageUrl: string;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
 }


export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzas',
    async ({inputValue, page, sortType, categoriesType}: PizzaFilters) => {
        const { data } = await axios.get(`https://6318d403f6b281877c77bfdc.mockapi.io/items?${inputValue ? ('&search=' + inputValue) : ''}&page=${page}&sortBy=${sortType}&order=desc&limit=4&${
            (categoriesType > 0) ? ('category=' + categoriesType) : '' }`)
      return data as Pizza[];
    }
  )



interface fetchSliceState {
  status: 'success' | 'loading' | 'error'; //enum
  items: Pizza[];
}


const initialState: fetchSliceState = {
  status: 'loading',
  items: [],
}
const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    addPizzas: (state, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = "success";
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = "error";
    })
  }
})
export const pizzaItemsSelector = (state: RootState) => state.pizza;
export const { addPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;