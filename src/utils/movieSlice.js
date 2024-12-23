import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name:"movies",
    initialState:{
        nowPlayingMovies:null,
        videoTrailer:null,
        popularMovies:null,
        upcomingMovies:null,
        topRatedMovies:null,
        clickedMovie:null,
        showMovies:true,
        showProfile:false,
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
        addClickedMovie: (state,action) => {
            state.clickedMovie = action.payload
        },
        toggleShowMovies:(state,action) => {
            state.showMovies = !state.showMovies
        },
        toggleProfile: (state,action) => {
            state.showProfile = !state.showProfile
        }

    }
})


export const {addNowPlayingMovies,toggleShowMovies,addVideoTrailer,addPopularMovies,addUpcomingMovies, addTopRatedMovies,addClickedMovie,toggleProfile} = movieSlice.actions
 
export default movieSlice.reducer