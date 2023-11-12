import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getCategory = createAsyncThunk(
    'category/getCategory',
    async ()=>{
        const res = await customAxios.get('products/getCategories');
        return res.data;
    }
)

export const addCategory = createAsyncThunk(
    'category/addCategory',
    async (data)=>{
        await customAxios.post('products/addCategories',data);
        const res = await customAxios.get('products/getCategories');
        return res.data;
    }
)