import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "../store";

export const fetchProducts = createAsyncThunk(
    "slice/fetchProducts",
    async function(slug, { rejectWithValue }) {
        try {
            const response = await axios.get(url + `/api/products/category/${slug}/products/`)
            const data = await response.data

            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const fetchProduct = createAsyncThunk(
    "slice/fetchProduct",
    async function({slug, id}, {rejectWithValue}) {
        try {
            const header = {
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("access"))}`,
                }
            }
            const response = await axios.get(url + `/api/products/category/${slug}/product/${id}/`, header)
            const data = await response.data

            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const productsSlice = createSlice({
    name: "productSlice",
    initialState: {
        products: [],
        product: null,
        status: null,
        error: null
    },
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "Loading"
            state.error = null
        }),
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload
            state.status = "Fulfilled"
            state.error = null
        }),
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.status = action.error.message
            state.error = action.payload
        }),
        builder.addCase(fetchProduct.pending, (state) => {
            state.status = "Loading"
            state.error = null
        }),
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.product = action.payload
            state.status = "Fulfilled"
            state.error = null
        }),
        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.status = action.error.message
            state.error = action.payload
        })
    }
})

export const {} = productsSlice.actions

export default productsSlice.reducer