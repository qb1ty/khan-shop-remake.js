import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../store";

export const fetchBestSales = createAsyncThunk(
    'slice/fetchBestSales',
    async function(_, {rejectWithValue, getState}) {
        try {
            const lim = getState().best.limit

            const response = await axios.get(url + `/api/products/?limit=${lim}&popular=true`)
            const data = await response.data

            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const bestSalesSlice = createSlice({
    name: "bestSalesSlice",
    initialState: {
        populars: [],
        status: null,
        error: null,
        limit: 4
    },
    reducers: {
        setLimit(state, action) {
            state.limit = action.payload.lim
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchBestSales.pending, (state) => {
            state.status = "Loading"
            state.error = null
        }),
        builder.addCase(fetchBestSales.fulfilled, (state, action) => {
            state.status = "Fulfilled"
            if (state.limit === 4) {
                state.populars = action.payload.results
            } else if (state.limit === 16) {
                state.populars = action.payload.results
            }
            state.error = null
        }),
        builder.addCase(fetchBestSales.rejected, (state, action) => {
            state.status = "Rejected"
            state.error = action.payload
        })
    }
})

export const { setLimit } = bestSalesSlice.actions

export default bestSalesSlice.reducer