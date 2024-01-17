import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const login = createAsyncThunk(
    'user/login',
    async (data)=>{
        const res = await customAxios.post('users/login',data);
        return res.data;
    }
    )

export const register = createAsyncThunk(
    'user/register',
    async (data)=>{
        const res = await customAxios.post('users/register',data);
        return res.data;
    }
)

export const getUsers = createAsyncThunk(
    'user/getUsers',
    async ()=>{
        const res = await customAxios.get('users');
        return res.data;
    }
)

export const editUserInfo = createAsyncThunk(
    'user/editUserInfo',
    async (data)=>{
        const res = await customAxios.put('users', data);
        return res.data;
    }
)

export const changePw = createAsyncThunk(
    'user/changePw',
    async (data)=>{
        const res = await customAxios.put('users/changePw', data);
        return res.data;
    }
)

export const sendOTP = createAsyncThunk(
    'user/sendOTP',
    async (data)=>{
        const res = await customAxios.post('users/sendOTP', data);
        return res.data;
    }
)

export const checkUsernameExist = createAsyncThunk(
    'user/checkUsernameExist',
    async (data)=>{
        const res = await customAxios.post('users/checkUsernameExist', data);
        return res.data;
    }
)