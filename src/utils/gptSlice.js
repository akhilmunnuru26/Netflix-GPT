import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name:"gpt",
    initialState:{
        showGptSearch:false,
        gptSuggestedMovies:null,
        gptSearchResults:null,
        // openaikey removed — OpenAI key is no longer collected in the UI
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
        // addOpenAIKey reducer removed
    }
})

export const { toggleGptSearch, addGptSuggestedMovies } = gptSlice.actions

export default gptSlice.reducer