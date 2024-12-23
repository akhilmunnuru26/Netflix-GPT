import {configureStore} from '@reduxjs/toolkit'
import  userReducer  from './userSlice'
import moviesReducer from './movieSlice'
import gptReducer from './gptSlice'
import configReducer from './configSlice'
import tvShowsReducer from './tvSlice'

const appStore = configureStore(
    {
        reducer:{
            user:userReducer,
            movies:moviesReducer,
            gpt:gptReducer,
            config:configReducer,
            tvShows:tvShowsReducer,
        },
    }
)


export default appStore