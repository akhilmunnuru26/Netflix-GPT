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
import { API_OPTIONS, TMDB_API_KEY } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";

const cacheKey = "now-playing-movies";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies);

  const cachedData = useMemo(() => {
    const cachedMovies = localStorage.getItem(cacheKey);
    try {
      return cachedMovies ? JSON.parse(cachedMovies) : null;
    } catch (error) {
      console.error("Error parsing cached movies:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    const getNowPLayingMoviesList = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&page=1`,
        API_OPTIONS
      );
      const data = await response.json();
      dispatch(addNowPlayingMovies(data.results));
      localStorage.setItem(cacheKey, JSON.stringify(data.results));
    };

    if (!cachedData) {
      getNowPLayingMoviesList();
    } else {
      dispatch(addNowPlayingMovies(cachedData));
    }
  }, [cachedData, dispatch]);

  return;
};

export default useNowPlayingMovies;