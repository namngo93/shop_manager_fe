import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getOrder = createAsyncThunk(
    'order/getOrder',
    async (data)=>{
        const res = await customAxios.get(`orders/${data}`);
        return res.data;
    }
)

export const getAllOrder = createAsyncThunk(
    'order/getAllOrder',
    async ()=>{
        const res = await customAxios.get(`orders`);
        return res.data;
    }
)

export const addOrder = createAsyncThunk(
    'order/addOrder',
    async (data)=>{
        const res = await customAxios.post('orders',data);
        return res.data;
    }
)

export const findByStatus = createAsyncThunk(
    'order/findByStatus',
    async (data)=>{
        const res = await customAxios.get(`orders/find-by-status/${data}`);
        return res.data;
    }
)

export const editOrder = createAsyncThunk(
    'order/editOrder',
    async (data)=>{
        const res = await customAxios.put(`orders/${data}`);
        return res.data;
    }
)