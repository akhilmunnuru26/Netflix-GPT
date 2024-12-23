import { createSlice } from "@reduxjs/toolkit";
import { OPENAI_KEY } from "./constants"; 

const gptSlice = createSlice({
    name:"gpt",
    initialState:{
        showGptSearch:false,
        gptSuggestedMovies:null,
        gptSearchResults:null,
        openaikey:OPENAI_KEY,
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