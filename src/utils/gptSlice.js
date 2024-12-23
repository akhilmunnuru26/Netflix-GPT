import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name:"gpt",
    initialState:{
        showGptSearch:false,
        gptSuggestedMovies:null,
        gptSearchResults:null,
        openaikey:null,
    },
    reducers:{
        toggleGptSearch:(state,action) => {
            state.showGptSearch = !state.showGptSearch
        },
        addGptSuggestedMovies:(state,action) => {
            const {movies,gptMovieResults} = action.payload
            state.gptSuggestedMovies = movies
            state.gptSearchResults = gptMovieResults
        },
        addOpenAIKey: (state,action) => {
            state.openaikey = action.payload
        }
    }
})

export const {toggleGptSearch,addGptSuggestedMovies,addOpenAIKey} = gptSlice.actions

export default gptSlice.reducer