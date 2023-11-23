import {createSlice} from "@reduxjs/toolkit";
import {login, register} from "../../services/userService";



const initialState = {
    currentUser:JSON.parse(localStorage.getItem('user'))||{role: 0}, // vì App.js đang xét user.role nên phải default {role:0}
    users:[]
}
const userSlice = createSlice({
        name:'user',
        initialState,
        extraReducers: builder => {
            builder.addCase(login.fulfilled, (state, action)=>{
                state.currentUser = action.payload;
                localStorage.setItem('user',JSON.stringify(action.payload))
            });
            builder.addCase(register.fulfilled, (state, action) => {
                state.users.push(action.payload)

            });
        }

    }

)

export default userSlice.reducer;