import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
    name: "menuSlice",
    initialState: {
        isMenu: false,
        isProfileMenu: false,
        isAlert: false
    },
    reducers: {
        setIsOpenMenu(state) {
            state.isMenu = true
        },
        setIsCloseMenu(state) {
            state.isMenu = false
        },
        setIsOpenProfileMenu(state) {
            state.isProfileMenu = true
        },
        setIsCloseProfileMenu(state) {
            state.isProfileMenu = false
        },
        setIsOpenAlert(state) {
            state.isAlert = true
        },
        setIsCloseAlert(state) {
            state.isAlert = false
        }
    }
})

export const { setIsOpenMenu, setIsCloseMenu, setIsOpenProfileMenu, setIsCloseProfileMenu, setIsOpenAlert, setIsCloseAlert } = menuSlice.actions

export default menuSlice.reducer