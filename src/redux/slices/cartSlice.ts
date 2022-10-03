import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";



type CartPizza = {
        id: number;
        price: number;
        name: string;
        imageUrl: string;
        size: number;
        type: string;
        count: number;
      }
interface cartSliceState {
    totalPrice: number;
    totalCount: number;
    items: CartPizza[];
}



const initialState: cartSliceState = {
    items: [],
    totalPrice: 0,
    totalCount: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartPizza>) => {
            const findItem = state.items.find(prev => prev.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
               }, 0)
               state.totalCount = state.items.reduce((sum, obj) => {
                 return obj.count + sum
               }, 0)
        },
        itemIncrement: (state, action: PayloadAction<number>) => {
            const increment = state.items.find(prev => prev.id === action.payload)
            if (increment) increment.count++;
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
               }, 0)
               state.totalCount = state.items.reduce((sum, obj) => {
                 return obj.count + sum
               }, 0)
        },
        itemDecrement: (state, action: PayloadAction<number>) => {
            const decrement = state.items.find(prev => prev.id === action.payload)
            if (decrement) decrement.count > 1 && decrement.count--;
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
               }, 0)
               state.totalCount = state.items.reduce((sum, obj) => {
                 return obj.count + sum
               }, 0)
        },
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
               }, 0)
               state.totalCount = state.items.reduce((sum, obj) => {
                 return obj.count + sum
               }, 0)
        },
        deleteItem: (state, action: PayloadAction<number>) => {
           state.items = state.items.filter(prev => prev.id !== action.payload);
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
               }, 0)
               state.totalCount = state.items.reduce((sum, obj) => {
                 return obj.count + sum
               }, 0)
        }
    }
})
export const cartSelector = (state: RootState) => state.cart;
export const cartItemsSelector = (id: number) => (state: RootState) => state.cart.items.find(prev => prev.id === id);
export const { addItem, itemIncrement, itemDecrement, clearCart, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;