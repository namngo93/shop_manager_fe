import {
    addCart,
    showCart,deleteCart
} from "../../services/cartService";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    carts:[]
};

const cartSlice = createSlice({
        name:'cart',
        initialState,
        extraReducers: builder => {
            builder.addCase(addCart.fulfilled, (state, action) => {
                state.carts = action.payload

            });
            builder.addCase(showCart.fulfilled, (state, action) => {
                state.carts = action.payload

            });
            builder.addCase(deleteCart.fulfilled, (state, action) => {
                state.carts = state.carts.filter(item => !action.payload.split(',').map(Number).includes(item.cartId));
            });

        }
    }
);

export default cartSlice.reducer;