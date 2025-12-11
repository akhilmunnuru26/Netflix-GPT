
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './userSlice';
import moviesReducer from './movieSlice';
import gptReducer from './gptSlice';
import configReducer from './configSlice';
import tvShowsReducer from './tvSlice';
import movieSearchReducer from './movieSearchSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    user: userReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    config: configReducer,
    tvShows: tvShowsReducer,
    movieSearchEngine: movieSearchReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [], // add reducers you don't want to persist
};



const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export default store;