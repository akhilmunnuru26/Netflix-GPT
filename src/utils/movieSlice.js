import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name:"movies",
    initialState: {
        activeHeaderTab: 'movies',
        nowPlayingMovies:null,
        videoTrailer:null,
        popularMovies:null,
        upcomingMovies: null,
        similarMovies:null,
        topRatedMovies:null,
        clickedMovie:null,
        showMovies:true,
        showProfile: false,
        clickedMovieId: null,
        playing: false,
        searchedMovies: null,
        searchMovieInput: null,
        
    },
    reducers: {
        addActiveHeaderTab: (state, action) => {
            state.activeHeaderTab = action.payload
        },
        addSearchedMovieInput: (state, action) => {
            state.searchMovieInput = action.payload
        },
        addSearchedMovies: (state, action) => {
            state.searchedMovies = action.payload
        },
        addNowPlayingMovies : (state,action) => {
            state.nowPlayingMovies = action.payload
        },
        addVideoTrailer : (state,action) => {
            state.videoTrailer = action.payload
        },
        addPopularMovies : (state,action) => {
            state.popularMovies = action.payload
        },
        addSimilarMovies: (state, action) => {
            state.similarMovies = action.payload
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
        addClickedMovieId: (state, action) => {
            state.clickedMovieId = action.payload
        },
        toggleShowMovies:(state) => {
            state.showMovies = !state.showMovies
        },
        togglePlayingMovie: (state) => {
            state.playing = !state.playing
        },
        toggleProfile: (state) => {
            state.showProfile = !state.showProfile
        }

    }
})


export const {addActiveHeaderTab,addSearchedMovieInput,addSearchedMovies, addNowPlayingMovies,togglePlayingMovie,addClickedMovieId,addSimilarMovies,toggleShowMovies,addVideoTrailer,addPopularMovies,addUpcomingMovies, addTopRatedMovies,addClickedMovie,toggleProfile} = movieSlice.actions
 
export default movieSlice.reducer