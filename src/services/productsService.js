import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (page)=>{
        const res = await customAxios.get('products');
        return res.data;
    }
    )



export const findByIdProduct = createAsyncThunk(
    'products/findByIdProduct',
    async (data)=>{
        const res = await customAxios.get('products/findById/'+data);
        return res.data[0];
    }
)

export const findByName = createAsyncThunk(
    'products/findByNameCategory',
    async (data)=>{

        const res = await customAxios.get(`products/search/findByName?search=${data}`);
        return res.data;
    }
)

export const findByNameProduct = createAsyncThunk(
    'products/findByNameProduct',
    async (data)=>{

        const res = await customAxios.get(`products/search/findByNameProduct?search=${data}`);
        return res.data;
    }
)

export const findByPrice = createAsyncThunk(
    'products/findByPrice',
    async (data)=>{

        const res = await customAxios.get(`products/search/findByPrice?min=${data.min}&&max=${data.max}`);
        return res.data;
    }
)



export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (data)=>{
        await customAxios.post('products',data);
        const res = await customAxios.get('products');
        return res.data;
    }
    )

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (data)=>{
        await customAxios.delete('products/'+data);
        const res = await customAxios.get('products');
        return res.data;
    }
)

export const editProduct = createAsyncThunk(
    'products/editProduct',
    async (data)=>{
        await customAxios.put('products/' + data.id,data);
        const res = await customAxios.get('products');
        return res.data;
    }
)