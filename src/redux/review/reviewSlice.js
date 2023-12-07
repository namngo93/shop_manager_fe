import {
    getReviews,
    createReview,
    editReview,
    replyReview,
    deleteReview
} from "../../services/reviewService";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    reviews:[]
};

const cartSlice = createSlice({
        name:'cart',
        initialState,
        extraReducers: builder => {
            builder.addCase(getReviews.fulfilled, (state, action) => {
                state.reviews = action.payload

            });
            builder.addCase(createReview.fulfilled, (state, action) => {
                state.reviews.push(action.payload) 

            });
            builder.addCase(editReview.fulfilled, (state, action) => {
                state.reviews = action.payload
            });

            builder.addCase(replyReview.fulfilled, (state, action) => {
                state.reviews = action.payload
            });

            builder.addCase(deleteReview.fulfilled, (state, action) => {
                state.reviews = state.reviews.filter(item => item.reviewId !== action.payload);
            });

        }
    }
);

export default cartSlice.reducer;