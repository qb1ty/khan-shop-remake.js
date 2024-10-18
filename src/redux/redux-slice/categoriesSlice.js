import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "../store";

export const fetchCategorie = createAsyncThunk(
    "slice/fetchCategorie",
    async function(_, { rejectWithValue }) {
        try {
            const response = await axios.get(url + '/api/products/categories/')
            const data = await response.data


            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const categoriesSlice = createSlice({
    name: 'categoriesSlice',
    initialState: {
        categories: [],
        status: null,
        error: null
    },
    extraReducers: builder => {
        builder.addCase(fetchCategorie.pending, (state) => {
            state.status = "Loading"
            state.error = null
        }),
        builder.addCase(fetchCategorie.fulfilled, (state, action) => {
            const categories = action.payload.map((category) => {
                const path = category.name_en.charAt(0).toLowerCase() + category.name_en.slice(1)

                return {
                    ...category,
                    path: "/categories/" + category.slug,
                    component: category.name_en
                }
            })

            state.categories = categories
            state.status = "Fulfilled"
            state.error = null
        }),
        builder.addCase(fetchCategorie.rejected, (state, action) => {
            state.status = action.error.message
            state.error = action.payload
        })
    }
})

export const { changeCategorie } = categoriesSlice.actions

export default categoriesSlice.reducer