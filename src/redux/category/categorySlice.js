import {createSlice} from "@reduxjs/toolkit";

import {addCategory, getCategory} from "../../services/categoruService";



const initialState = {
   category:[]
}
const categorySlice = createSlice({
        name:'category',
        initialState,
        extraReducers: builder => {
            builder.addCase(getCategory.fulfilled, (state, action) => {
                state.category = action.payload

            });

            builder.addCase(addCategory.fulfilled, (state, action) => {
                state.category = action.payload

            });
        }

    }

)

export default categorySlice.reducer;