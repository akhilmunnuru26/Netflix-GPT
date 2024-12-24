// import { useEffect } from "react";
// import { API_OPTIONS } from "../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { addNowPlayingMovies } from "../utils/movieSlice";

// const useNowPlayingMovies = () => {
 
//   useEffect(() => {
//     // !nowPlayingMovies && getNowPLayingMoviesList();
//     getNowPLayingMoviesList();
//     return (() => {
//       getNowPLayingMoviesList();
//     })
//   }, []);

//   const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies)

//   const dispatch = useDispatch();

//   const getNowPLayingMoviesList = async () => {
//     const response = await fetch(
//       "https://api.themoviedb.org/3/movie/now_playing?page=1",
//       API_OPTIONS
//     );
//     const data = await response.json();
//     dispatch(addNowPlayingMovies(data.results));
    
//   };
// };

// export default useNowPlayingMovies;
import { useEffect, useMemo } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";

const cacheKey = "now-playing-movies";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies);

  const cachedData = useMemo(() => {
    const cachedMovies = localStorage.getItem(cacheKey);
    return cachedMovies ? JSON.parse(cachedMovies) : null;
  }, []);

  useEffect(() => {
    if (!cachedData) {
      getNowPLayingMoviesList();
    } else {
      dispatch(addNowPlayingMovies(cachedData));
    }
  }, [cachedData, dispatch]);

  const getNowPLayingMoviesList = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const data = await response.json();
    dispatch(addNowPlayingMovies(data.results));
    localStorage.setItem(cacheKey, JSON.stringify(data.results));
  };
};

export default useNowPlayingMovies;