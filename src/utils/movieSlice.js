import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name:"movies",
    initialState:{
        nowPlayingMovies:null,
        videoTrailer:null,
        popularMovies:null,
        upcomingMovies:null,
        topRatedMovies:null,
    },
    reducers:{
        addNowPlayingMovies : (state,action) => {
            state.nowPlayingMovies = action.payload
        },
        addVideoTrailer : (state,action) => {
            state.videoTrailer = action.payload
        },
        addPopularMovies : (state,action) => {
            state.popularMovies = action.payload
        },
        addUpcomingMovies : (state,action) => {
            state.upcomingMovies = action.payload
        },
        addTopRatedMovies : (state,action) => {
            state.topRatedMovies = action.payload
        },

    }
})


export const {addNowPlayingMovies,addVideoTrailer,addPopularMovies,addUpcomingMovies, addTopRatedMovies} = movieSlice.actions
 
export default movieSlice.reducer