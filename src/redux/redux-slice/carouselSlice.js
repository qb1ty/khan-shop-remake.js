import { createSlice } from "@reduxjs/toolkit"

const carouselSlice = createSlice({
    name: 'carousel',
    initialState: {
        sliders: [{id: 1,image: "/iphone.webp",title: "Iphone-16"},{id: 2,image: "/samsung.webp",title: "Iphone-16"},{id: 3,image: "/ps-5.webp",title: "Iphone-16"}],
        paginations: [],
        currentSlideIndex: 0,
    },
    reducers:  {
        moveingSlide(state, action) {
            const width = action.payload.container.clientWidth
            if (action.payload.direction === 'right') {
                state.paginations[state.currentSlideIndex].active = false
                state.currentSlideIndex++
                if (state.currentSlideIndex > state.sliders.length - 1) {
                    state.currentSlideIndex = 0
                }
                state.paginations[state.currentSlideIndex].active = true
                action.payload.slidebar.style.transform = `translateX(-${state.currentSlideIndex * width}px)`
            } else if (action.payload.direction === 'left') {
                state.paginations[state.currentSlideIndex].active = false
                state.currentSlideIndex--
                if (state.currentSlideIndex < 0) {
                    state.currentSlideIndex = state.sliders.length - 1
                }
                state.paginations[state.currentSlideIndex].active = true
                action.payload.slidebar.style.transform = `translateX(-${state.currentSlideIndex * width}px)`
            }
        },
        addPagination(state) {
            const newPaginations = state.sliders.map((_, i) => ({
                id: i,
                active: false,
            }));
        
            newPaginations[0].active = true

            return {
                ...state,
                paginations: newPaginations
            }
        },
        changeSlide(state, action) {
            state.paginations[state.currentSlideIndex].active = false
            state.currentSlideIndex = action.payload.index
            state.paginations[state.currentSlideIndex].active = true

            const width = action.payload.container.clientWidth
            action.payload.slidebar.style.transform = `translateX(-${state.currentSlideIndex * width}px)`
        }
    }
})

export const { moveingSlide, addPagination, changeSlide } = carouselSlice.actions

export default carouselSlice.reducer