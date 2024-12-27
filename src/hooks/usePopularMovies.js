// import { useEffect } from "react";
// import { API_OPTIONS } from "../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { addPopularMovies } from "../utils/movieSlice";

// const usePopularMovies = () => {
//   useEffect(() => {
//     !popularMovies && getNowPLayingMoviesList();
//   }, []);

//   const popularMovies = useSelector(store => store.movies.popularMovies)
//   const dispatch = useDispatch();

//   const getNowPLayingMoviesList = async () => {
//     const response = await fetch(
//       "https://api.themoviedb.org/3/movie/popular",
//       API_OPTIONS
//     );
//     const data = await response.json();
//     dispatch(addPopularMovies(data.results));
    
//   };
// };

// export default usePopularMovies;


import { useEffect, useMemo } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";

const cacheKey = "popular-movies";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);

  const cachedData = useMemo(() => {
    const cachedMovies = localStorage.getItem(cacheKey);
    return cachedMovies ? JSON?.parse?.(cachedMovies) : null;
  }, []);

  useEffect(() => {
    if (!cachedData) {
      getPopularMoviesList();
    } else {
      dispatch(addPopularMovies(cachedData));
    }
  }, [cachedData, dispatch]);

  const getPopularMoviesList = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular",
      API_OPTIONS
    );
    const data = await response.json();
    dispatch(addPopularMovies(data.results));
    localStorage.setItem(cacheKey, JSON.stringify(data.results));
  };
};

export default usePopularMovies;
