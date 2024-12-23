create-react-app
installed tailwind-css
- useRef Hook for reference of email,password,fullName
- created src --> utils --> validate.js in that implemented validation logic
- used regex for email,password,fullName
- created a project in firebase,enable google Analytics and fire base hoisting feature, installed firebase cli using npm given by firebase
- created utils --> firebase.js and added default template in the file
--> npm install -g firebase-tools
--> Firebase Login -> command: firebase login 
--> Intialize Firebase -> command: firebase init and select hosting
-->  in hositing select public directory -> build, hosting to firebase (optionally) github option
--> Firebase Deploy -> command: firebase deploy
--> Implemented Sign up API & logic using firebase
--> IMplemented Sign In API & logic  using firebase
--> Setup the redux store, Created userSlice and added it to store,provided the store to app
--> Updated user's name, built signout button and feature
--> Fetch movies from TMDb 
--> Bug Fix update user name
--> Bug fix routing redirection if login cannot access login page vice versa
--> Implemented Hygiene pratice unsubscribe authonstatechange event listener when the component unmounts
--> Create a utils --> constants.js file and add hardcoded values to the const
--> created an account,registered application in TMDB,in Documentation movie list --> now playing --> called now playing api 
--> created a custom hook folder src --> hooks --> useNowPlayingMovies.js and added fetching logic in it.
--> Always maintain modular coding i,e spliting the code in small junks
--> Added popular,upcoming,top rated movies api's and slices.
--> built toggle feature of searchGpt 
--> Added language constants and language slice to redux store and implemented multilanguagal search bar of GptSearch Bar.
--> Added Redux-Persist package for persistance of data even i refresh the page the data in the store will be persist.



# Features 
- Login page
    -sign in /sign up form
    
    

After Authentication
(Browse - page)
    - Header
    - Main Movie
    --> Trailer in Background
    --> Movie Description with play buttons
    --> Movie Suggestions * N with vertical scrolling

NetflixGPT page
--> Search Bar Page
-->Movie Suggestions
--> Redux Persist



// <Link
                  //   className="rounded-md bg-transparent hover:bg-transparent outline-none text-lg cursor-pointer relative"
                  //   to="/browse"
                  //   onClick={handleShowMovies}
                  // >
                  //   <button className="mx-2 rounded p-2 bg-transparent hover:bg-transparent outline-none">
                  //     <h1 className="text-white relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 before:border-b-2 before:border-transparent before:transition before:duration-300 before:ease-in-out before:scale-x-0 hover:text-white hover:before:border-red-500 hover:before:scale-x-100">
                  //       Movies
                  //     </h1>
                  //   </button>
                  // </Link>

                   // <Link
                  //   className="rounded-mdbg-transparent hover:bg-transparent outline-none text-lg cursor-pointer relative"
                  //   to="/browse/Tv"
                  //   onClick={handleTvShows}
                  // >
                  //   <button className="bg-transparent hover:bg-transparent outline-none mx-2 rounded p-2">
                  //     <h1 className="text-white relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 before:border-b-2 before:border-white before:transition before:duration-300 before:ease-in-out before:scale-x-0 hover:before:scale-x-100">
                  //       Tv Shows
                  //     </h1>
                  //   </button>
                  // </Link>





                  //video.title
                   playing ? (
      <div
        className={`${showTitle ? 'visible' : 'invisible'} w-screen aspect-video md:pt-[22%] md:px-16 md:mb-10 pt-[30%] px-8 absolute text-white bg-gradient-to-r from-black`}
      >
        <h1 className="md:text-4xl  text-sm font-bold">{title}</h1>
        <p className={`  md:py-4 text-sm md:text-base md:w-2/6 w-3/4`}>{overview.substring(0, 450)}</p>
        <div className="flex">
          <button onClick={handleClickedMovie} className="icons-container w-24 h-auto text-center bg-white text-black py-1 px-3 text-lg rounded mr-4 hover:bg-opacity-80">
            <FaPlay className="text-sm mx-2" /> Play
          </button>
          <button className="w-auto h-auto text-center bg-gray-500 text-white md:py-1 md:px-3 opacity-80 md:text-lg rounded text-xs">
            More Info
          </button>
        </div>
      </div>
    ) : (
      <div className="w-screen aspect-video md:pt-[22%] md:px-16 md:mb-10 pt-[30%] px-8 absolute text-white bg-gradient-to-r from-black">
        <h1 className="md:text-4xl  text-sm font-bold">{title}</h1>
        <p className="invisible md:visible md:py-4 text-sm md:text-base md:w-2/6 w-3/4">{overview.substring(0, 450)}</p>
        <div className="flex">
          <button onClick={handleClickedMovie} className="icons-container w-24 h-auto text-center bg-white text-black py-1 px-3 text-lg rounded mr-4 hover:bg-opacity-80">
            <FaPlay className="text-sm mx-2" /> Play
          </button>
          <button className="w-auto h-auto text-center bg-gray-500 text-white md:py-1 md:px-3 opacity-80 md:text-lg rounded text-xs">
            More Info
          </button>
        </div>
      </div>
    )
  );
// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './userSlice';
// import moviesReducer from './movieSlice';
// import gptReducer from './gptSlice';
// import configReducer from './configSlice';
// import tvShowsReducer from './tvSlice';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//     key: 'root',
//     storage,
// };

// const persistedUserReducer = persistReducer(
//     {
//         key: 'user',
//         storage,
//     },
//     userReducer
// );

// const persistedMoviesReducer = persistReducer(
//     {
//         key: 'movies',
//         storage,
//     },
//     moviesReducer
// );

// const persistedGptReducer = persistReducer(
//     {
//         key: 'gpt',
//         storage,
//     },
//     gptReducer
// );

// const persistedConfigReducer = persistReducer(
//     {
//         key: 'config',
//         storage,
//     },
//     configReducer
// );

// const persistedTvShowsReducer = persistReducer(
//     {
//         key: 'tvShows',
//         storage,
//     },
//     tvShowsReducer
// );

// const appStore = configureStore({
//     reducer: {
//         user: persistedUserReducer,
//         movies: persistedMoviesReducer,
//         gpt: persistedGptReducer,
//         config: persistedConfigReducer,
//         tvShows: persistedTvShowsReducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: false,
//         }),
// });

// export const persistor = persistStore(appStore);

// export default appStore;