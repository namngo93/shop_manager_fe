import {createSlice} from "@reduxjs/toolkit";
import {
    addProduct,
    deleteProduct,
    editProduct,
    findByProductId, findByConditions, findByNameProduct, findByPrice,
    getProducts
} from "../../services/productService";


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

            builder.addCase(findByProductId.fulfilled, (state, action) => {
                state.product = action.payload
            });

            builder.addCase(findByConditions.fulfilled, (state, action) => {
                state.products = action.payload
            });

            builder.addCase(findByNameProduct.fulfilled, (state, action) => {
                state.products = action.payload
            });
            
            builder.addCase(findByPrice.fulfilled, (state, action) => {
                state.products = action.payload
            });

            builder.addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload) 

            });

            builder.addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(item => item.productId !== action.payload);
            });
            
            builder.addCase(editProduct.fulfilled, (state, action) => {
                const indexToModify = state.products.findIndex(item => item.productId === action.payload.productId);
                if (indexToModify !== -1) {
                    state.products[indexToModify] = action.payload;
                }
            })
        }
    }
)

export default productsSlice.reducer;