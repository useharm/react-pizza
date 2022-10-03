import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import fetchSlicer from './slices/fetchSlicer';
import { useDispatch } from 'react-redux';



export type RootState = ReturnType<typeof store.getState>;
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizza: fetchSlicer,
  },
})


type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;