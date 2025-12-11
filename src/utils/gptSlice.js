import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name:"gpt",
    initialState:{
        showGptSearch:false,
        gptSuggestedMovies:null,
        gptSuggestedTv: null,
        gptSearchResults:null,
        // openaikey removed — OpenAI key is no longer collected in the UI
    },
    reducers:{
        toggleGptSearch:(state,action) => {
            state.showGptSearch = !state.showGptSearch
        },
        addGptSuggestedMovies:(state,action) => {
            const { movies, tv, gptMovieResults } = action.payload;
            state.gptSuggestedMovies = movies;
            state.gptSuggestedTv = tv || null;
            state.gptSearchResults = gptMovieResults;
        },
        clearGptSearchResults: (state) => {
            state.gptSuggestedMovies = null;
            state.gptSuggestedTv = null;
            state.gptSearchResults = null;
        },
        // addOpenAIKey reducer removed
    }
})

export const { toggleGptSearch, addGptSuggestedMovies, clearGptSearchResults } = gptSlice.actions

export default gptSlice.reducer