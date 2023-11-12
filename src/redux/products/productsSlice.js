import {createSlice} from "@reduxjs/toolkit";
import {
    addProduct,
    deleteProduct,
    editProduct,
    findByIdProduct, findByName, findByNameProduct, findByPrice,
    getProducts
} from "../../services/productsService";


const initialState = {
    products: [],
    product:{},
}
const productsSlice = createSlice({
        name: 'products',
        initialState,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload
            });


            builder.addCase(findByIdProduct.fulfilled, (state, action) => {
                state.product = action.payload
            });

            builder.addCase(findByName.fulfilled, (state, action) => {
                state.products = action.payload
            });
            builder.addCase(findByNameProduct.fulfilled, (state, action) => {
                state.products = action.payload
            });
            builder.addCase(findByPrice.fulfilled, (state, action) => {
                state.products = action.payload
            });

            builder.addCase(addProduct.fulfilled, (state, action) => {
                state.products = action.payload

            });

            builder.addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = action.payload

            });
            builder.addCase(editProduct.fulfilled, (state, action) => {
                state.products = action.payload
            })
        }
    }
)

export default productsSlice.reducer;