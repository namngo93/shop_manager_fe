import {
    addCart,
    addOrder, countCart, deleteCart,
    editOrder,
    findByIdUser,
    findByStatus,
    getOrder,
    showCart
} from "../../services/orderService";
import {createSlice} from "@reduxjs/toolkit";



const initialState = {
    order:[],
    cart:[],
    orders:[],
    countCart:'',
}
const orderSlice = createSlice({
        name:'order',
        initialState,
        extraReducers: builder => {
            builder.addCase(countCart.fulfilled, (state, action) => {
                state.countCart = action.payload

            });
            builder.addCase(addOrder.fulfilled, (state, action) => {
                state.order = action.payload

            });
            builder.addCase(getOrder.fulfilled, (state, action) => {
                state.orders = action.payload

            });
            builder.addCase(editOrder.fulfilled, (state, action) => {
                state.orders = action.payload

            });
            builder.addCase(findByStatus.fulfilled, (state, action) => {
                state.order = action.payload

            });
            builder.addCase(findByIdUser.fulfilled, (state, action) => {
                state.orders = action.payload

            });

            builder.addCase(addCart.fulfilled, (state, action) => {
                state.cart = action.payload

            });
            builder.addCase(showCart.fulfilled, (state, action) => {
                state.cart = action.payload

            });

        }
}
)

export default orderSlice.reducer;