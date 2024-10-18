import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "themeSlice",
    initialState: {
        darkMode: JSON.parse(localStorage.getItem("theme")) || false
    },
    reducers: {
        toggleTheme(state, action) {
            state.darkMode = action.payload
        }
    }
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer