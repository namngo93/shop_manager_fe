import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getReviews = createAsyncThunk(
    'review/getReviews',
    async (data)=>{
        const res = await customAxios.get("reviews/"+ data);
        return res.data;
    }
)

export const createReview = createAsyncThunk(
    'review/createReview',
    async (data)=>{
        const res = await customAxios.post("reviews", data);
        return res.data;
    }
)

export const editReview = createAsyncThunk(
    'review/editReview',
    async (data)=>{
        const res = await customAxios.put("reviews/editReview", data);
        return res.data;
    }
)

export const replyReview = createAsyncThunk(
    'review/replyReview',
    async (data)=>{
        const res = await customAxios.put("reviews/replyReview", data);
        return res.data;
    }
)

export const deleteReview = createAsyncThunk(
    'review/deleteReview',
    async (data)=>{
        const res = await customAxios.delete("reviews/" +data);
        if(res.status === 200){
            return data
        }
    }
)