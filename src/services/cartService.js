import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const addCart = createAsyncThunk(
    'cart/addCart',
    async (data)=>{
        const res = await customAxios.post(`carts`,data);
        return res.data;
    }
)

export const showCart = createAsyncThunk(
    'cart/showCart',
    async (data)=>{
        const res = await customAxios.get(`carts/${data}`);
        return res.data;
    }
)

export const deleteCart = createAsyncThunk(
    'cart/deleteCart',
    async (data)=>{
        const res = await customAxios.delete(`carts?cartId=${data}`);
        if(res.data === 'Sản phẩm đã được xóa thành công.') {
            return data
        }
        return 'Server error';
    }
)
