import {
    getOrder,
    editOrder,
    orderDetail
} from "../../services/orderService";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    order:{},
    orderDetail:[],
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
                const indexToModify = state.orders.findIndex(item => item.orderId === action.payload.orderId);
                if (indexToModify !== -1) {
                    state.orders[indexToModify] = action.payload;
                }
            });
            builder.addCase(orderDetail.fulfilled, (state, action) => {
                state.order = action.payload.order;
                state.orderDetail = action.payload.orderDetail;

            });
        }
}
)

export default orderSlice.reducer;