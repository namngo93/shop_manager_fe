import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (page)=>{
        const res = await customAxios.get('products');
        return res.data;
    }
)

export const findByProductId = createAsyncThunk(
    'products/findByProductId',
    async (data)=>{
        const res = await customAxios.get('products/'+data);
        return res.data;
    }
)

export const findByConditions = createAsyncThunk(
    'products/findByConditions',
    async (data)=>{
        const res = await customAxios.get(`products/findByConditions/search?productName=${data.productName}&categoryId=${data.categoryId}`);
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
        const res = await customAxios.delete('products/'+ data);
        if(res.status === 200){
            return data
        }
    }
)

export const editProduct = createAsyncThunk(
    'products/editProduct',
    async (data)=>{
        const res = await customAxios.put('products/' + data.productId,data);
        if(res.status === 200){
            return data
        } 
    }
)