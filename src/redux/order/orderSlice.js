import {
    editOrder,
    findByIdUser,
    findByStatus,
    getOrder,
} from "../../services/orderService";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    order:[],
    orders:[],
}
const orderSlice = createSlice({
        name:'order',
        initialState,
        extraReducers: builder => {
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
        }
}
)

export default orderSlice.reducer;