import { createSlice } from "@reduxjs/toolkit";
import { addTopRatedMovies } from "./movieSlice";

const tvSlice = createSlice({
    name:'tvShows',
    initialState:{
        nowPlayingTvShows:null,
        popularTvShows:null,
        tvVideoTrailer:null,
        topRatedTvShows:null,
    },
    reducers:{
        addNowPlayingTvShows : (state,action) => {
            state.nowPlayingTvShows = action.payload
        },
        addPopularTvShows : (state,action) => {
            state.popularTvShows = action.payload
        },
        addTvVideoTrailer : (state,action) => {
            state.tvVideoTrailer = action.payload
        },
        addTopRatedTvShows: (state,action) => {
            state.topRatedTvShows = action.payload
        }
    }
})


export const {addNowPlayingTvShows,addPopularTvShows, addTvVideoTrailer,addTopRatedTvShows} = tvSlice.actions

export default tvSlice.reducer