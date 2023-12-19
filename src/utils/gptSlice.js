import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name:"gpt",
    initialState:{
        showGptSearch:false,
        gptSuggestedMovies:null,
        gptSearchResults:null,
    },
    reducers:{
        toggleGptSearch:(state,action) => {
            state.showGptSearch = !state.showGptSearch
        },
        addGptSuggestedMovies:(state,action) => {
            const {movies,gptMovieResults} = action.payload
            state.gptSuggestedMovies = movies
            state.gptSearchResults = gptMovieResults
        }
    }
})

export const {toggleGptSearch,addGptSuggestedMovies} = gptSlice.actions

export default gptSlice.reducer