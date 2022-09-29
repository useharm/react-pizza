import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    totalPrice: 0,
    totalCount: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
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
        itemIncrement: (state, action) => {
            const increment = state.items.find(prev => prev.id === action.payload)
            increment.count++;
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
               }, 0)
               state.totalCount = state.items.reduce((sum, obj) => {
                 return obj.count + sum
               }, 0)
        },
        itemDecrement: (state, action) => {
            const decrement = state.items.find(prev => prev.id === action.payload)
            decrement.count > 1 && decrement.count--;
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
        deleteItem: (state, action) => {
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


export const { addItem, itemIncrement, itemDecrement, clearCart, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;