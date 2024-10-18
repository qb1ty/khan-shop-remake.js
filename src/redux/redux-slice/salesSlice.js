import axios from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { url } from "../store"

export const fetchSlice = createAsyncThunk(
    'slice/fetchSlice',
    async function(_ ,{rejectWithValue}) {
        try {
            const response = await axios.get(url + `/api/products/category/stocks/`)
            const data = await response.data

            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const fetchComment = createAsyncThunk(
    'slice/fetchComment',
    async function({ i, id, category, text }, { rejectWithValue }) {
        try {
            const data = {
                text: text,
                rating: i + 1
            }
            const headers = {
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("access"))}`,
                    'Content-Type': 'application/json',
                }
            }
            const response = await axios.post(url + `/api/products/category/${category}/product/${id}/comment/`, data, headers)
            const res = await response.data

            return res
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const salesSlice = createSlice({
    name: 'salesSlice',
    initialState: {
        sales: [],
        salesTimeEnd: null,
        timeoutId: null,
        status: null,
        error: null
    },
    reducers: {
        moveingSwiper(state, action) {
            // Проверка того, какую кнопку нажал пользователь
            if (action.payload.direction === "left") {
                action.payload.container.scrollLeft += -(action.payload.card.offsetWidth + 56) // Вычитает ширину первой карты + пространство между ними из контейнера прокрутки.
                // Если контейнер находится в начале, и пользователь нажал на кнопку "left", то прокрутка начинается с конца.
                if (action.payload.container.scrollLeft === 0) {
                    action.payload.container.scrollLeft = ((state.sales.length) * action.payload.container.offsetWidth + 500)
                }
            } else if (action.payload.direction === "right") {
                action.payload.container.scrollLeft += (action.payload.card.clientWidth + 56) // Добавляет ширину первой карты + пространство между ними из контейнера прокрутки.
                // Если контейнер находится в конце, и пользователь нажал на кнопку "right", то прокрутка начинается с начала.
                if (Math.ceil(action.payload.container.scrollLeft) === action.payload.container.scrollWidth - action.payload.container.offsetWidth) {
                    action.payload.container.scrollLeft = 0
                }
            }

            // Удаление интервала при нажатии на кнопку
            clearInterval(state.timeoutId)
            if (!action.payload.wrapper.matches(":hover")) {
                if (window.innerWidth < 800) return; // Ничего не возвращаем, если ширина экрана пользователя меньше 800 пикселей.

                // Каждые 3 секунды карусель будет автоматически прокручиваться.
                state.timeoutId = setInterval(() => {
                    action.payload.container.scrollLeft += (action.payload.card.offsetWidth + 56)
                    // Если контейнер находится в конце, то прокрутка начинается с начала.
                    if (Math.ceil(action.payload.container.scrollLeft) === action.payload.container.scrollWidth - action.payload.container.offsetWidth) {
                        action.payload.container.scrollLeft = 0
                    }
                }, 3500)
            }
        },
        autoPlay(state, action) {
            if (window.innerWidth < 800) return; // Ничего не возвращаем, если ширина экрана пользователя меньше 800 пикселей.

            // Каждые 3 секунды карусель будет автоматически прокручиваться.
            state.timeoutId = setInterval(() => {
                action.payload.container.scrollLeft += (action.payload.card.offsetWidth + 56)
                // Если контейнер находится в конце, то прокрутка начинается с начала.
                if (Math.ceil(action.payload.container.scrollLeft) === action.payload.container.scrollWidth - action.payload.container.offsetWidth) {
                    action.payload.container.scrollLeft = 0
                }
            }, 3500)
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchSlice.pending, (state) => {
            state.status = "Loading"
            state.error = null
        }),
        builder.addCase(fetchSlice.fulfilled, (state, action) => {
            state.status = "Fulfilled"
            state.sales = action.payload
            state.error = null
            state.salesTimeEnd = action.payload[0].stock.timestamp
        }),
        builder.addCase(fetchSlice.rejected, (state, action) => {
            state.status = action.error.message
            state.error = action.payload
        }),
        builder.addCase(fetchComment.pending, (state) => {
            state.status = "Loading"
            state.error = null
        }),
        builder.addCase(fetchComment.fulfilled, (state, action) => {
            state.status = "Fulfilled"
            state.error = null
            state.sales = action.payload
        }),
        builder.addCase(fetchComment.rejected, (state, action) => {
            state.status = action.error.message
            state.error = action.payload
        })
    }
})

export const { moveingSwiper, autoPlay } = salesSlice.actions

export default salesSlice.reducer