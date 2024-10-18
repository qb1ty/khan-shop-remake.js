import { configureStore } from "@reduxjs/toolkit"

import themeReducer from "./redux-slice/themeSlice"
import carouselReducer from "./redux-slice/carouselSlice"
import timerReducer from "./redux-slice/timerSlice"
import salesReducer from "./redux-slice/salesSlice"
import categoriesReducer from "./redux-slice/categoriesSlice"
import languageReducer from "./redux-slice/languageSlice"
import menuReducer from "./redux-slice/menuSlice"
import bestSalesReducer from "./redux-slice/bestSalesSlice"
import productsReducer from "./redux-slice/productsSlice"
import registerReducer from "./redux-slice/registerSlice"
import profileReducer from "./redux-slice/profileSlice"
import cartReducer from "./redux-slice/cartSlice"

export const url = 'http://127.0.0.1:8000'
export const store = configureStore({
    reducer: {
        theme: themeReducer,
        carousel: carouselReducer,
        timer: timerReducer,
        sales: salesReducer,
        categories: categoriesReducer,
        lang: languageReducer,
        menu: menuReducer,
        best: bestSalesReducer,
        products: productsReducer,
        register: registerReducer,
        profile: profileReducer,
        cart: cartReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    })
})