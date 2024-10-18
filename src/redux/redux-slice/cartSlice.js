import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "../store";

export const fetchCart = createAsyncThunk(
    "slice/fetchCart",
    async function(_, {rejectWithValue}) {
        try {
            const response = await axios.get(url + `/api/account/cart/get/?wait=True`, {
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("access"))}`,
                }
            })
            const res = await response.data

            return res
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const fetchAddProductToCart = createAsyncThunk(
    "slice/fetchAddProductToCart",
    async function({ name }, {rejectWithValue}) {
        try {
            const data = {
                name: name,
                quantity: 1,
            }

            const response = await axios.post(url + `/api/account/cart/post/`, data, {
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("access"))}`,
                }
            })

            const res = await response.data

            return res
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const fetchRemoveProduct = createAsyncThunk(
    "slice/fetchRemoveProduct",
    async function({ name }, {rejectWithValue}) {
        try {
            const response = await axios.delete(url + `/api/account/cart/delete/`, {
                data: {
                    name: name
                },
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("access"))}`,
                }
            })

            const result = await response.data

            return result
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const fetchUpdateCart = createAsyncThunk(
    "slice/fetchUpdateCart",
    async function({ name, quantity }, {rejectWithValue}) {
        try {
            const response = await axios.patch(url + `/api/account/cart/patch/`,
                {
                    name: name,
                    quantity: quantity
                },
                {
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("access"))}`, // Убедитесь, что токен правильно взят из localStorage
                    }
                })

            const result = await response.data

            return result
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: {
        carts: [],
        status: null,
        error: null
    },
    reducers: {
        handleUpdateProduct(state, action) {
        }
    },
    extraReducers: buidler => {
        buidler.addCase(fetchCart.pending, (state) => {
            state.status = "Loading"
        }),
        buidler.addCase(fetchCart.fulfilled, (state, action) => {
            state.status = "Fulfilled"
            state.carts = action.payload
        }),
        buidler.addCase(fetchCart.rejected, (state, action) => {
            state.status = action.error.message
        }),
        buidler.addCase(fetchRemoveProduct.pending, (state) => {
            state.status = "Loading"
        }),
        buidler.addCase(fetchRemoveProduct.fulfilled, (state, action) => {
            state.status = "Fulfilled"
            state.carts = action.payload
        }),
        buidler.addCase(fetchRemoveProduct.rejected, (state, action) => {
            state.status = action.error.message
        })
        buidler.addCase(fetchUpdateCart.pending, (state) => {
            state.status = "Loading"
        }),
        buidler.addCase(fetchUpdateCart.fulfilled, (state) => {
            state.status = "Fulfilled"
        }),
        buidler.addCase(fetchUpdateCart.rejected, (state, action) => {
            state.status = action.error.message
            state.error = action.payload
        })
    }
})

export const { handleUpdateProduct } = cartSlice.actions

export default cartSlice.reducer