import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
    name: "languageSlice",
    initialState: {
        isSelect: false,
        lang: JSON.parse(localStorage.getItem("lang")) || "eu"
    },
    reducers: {
        setIsCloseSelect(state) {
            state.isSelect = false
        },
        setSelect(state) {
            state.isSelect = !state.isSelect
        },
        setLang(state, action) {
            state.lang = action.payload.lang
        }
    }
})

export const { setIsCloseSelect, setSelect, setLang } = languageSlice.actions

export default languageSlice.reducer