import { createSlice } from "@reduxjs/toolkit"

const timerSlice = createSlice({
    name: "timerSlice",
    initialState: {
        isEnd: false,
        days: null,
        hours: null,
        minutes: null,
        seconds: null
    },
    reducers: {
        updateCount(state, action) {
            const diff = new Date(action.payload.date) - new Date()
            if (diff <= 0) {
                clearInterval(action.payload.timerId)
            }

            state.days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
            state.hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
            state.minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
            state.seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;

            if (state.days === 0 && state.hours === 0 && state.minutes === 0 && state.seconds === 1) {
                state.isEnd = true
            } else if (state.seconds > 1) {
                state.isEnd = false
            }
        }
    }
})

export const { updateCount } = timerSlice.actions

export default timerSlice.reducer