import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getCategory = createAsyncThunk(
    'category/getCategory',
    async ()=>{
        const res = await customAxios.get('categories');
        return res.data;
    }
)

export const addCategory = createAsyncThunk(
    'category/addCategory',
    async (data)=>{
        const res = await customAxios.post('categories',data);
        return res.data;
    }
)

export const editCategory = createAsyncThunk(
    'category/editCategory',
    async (data)=>{
        const res = await customAxios.put('categories/' + data.categoryId,data);
        if(res.status === 200){
            return data
        } 
    }
)

export const findByCategorytId = createAsyncThunk(
    'category/findByCategorytId',
    async (data)=>{
        const res = await customAxios.get('categories/'+data);
        return res.data;
    }
)