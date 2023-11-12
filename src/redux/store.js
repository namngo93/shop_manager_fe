import {configureStore} from "@reduxjs/toolkit";
import blogsReducer from "./products/productsSlice";
import userReducer from "./user/userSlice";
import categoriesReducer from "./category/categorySlice";
import ordersReducer from "./order/orderSlice";


export const store = configureStore({
    reducer: {

        products: blogsReducer,
        user:userReducer,
        categories:categoriesReducer,
        orders: ordersReducer
    }
})