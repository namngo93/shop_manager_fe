import {createSlice} from "@reduxjs/toolkit";

import {addCategory, editCategory, findByCategorytId, getCategory} from "../../services/categoryService";



const initialState = {
   categories:[],
   category:{}
}
const categorySlice = createSlice({
        name:'category',
        initialState,
        extraReducers: builder => {
            builder.addCase(getCategory.fulfilled, (state, action) => {
                state.categories = action.payload

            });

            builder.addCase(addCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload)

            });

            builder.addCase(editCategory.fulfilled, (state, action) => {
                const indexToModify = state.categories.findIndex(item => item.categoryId === action.payload.categoryId);
                if (indexToModify !== -1) {
                    state.categories[indexToModify] = action.payload;
                }
            });

            builder.addCase(findByCategorytId.fulfilled, (state, action) => {
                state.category = action.payload
            });
        }

    }

)

export default categorySlice.reducer;