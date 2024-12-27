// import { useEffect } from "react";
// import { API_OPTIONS } from "../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import {  addTopRatedMovies } from "../utils/movieSlice";

// const useTopRatedMovies = () => {
//   useEffect(() => {
//     !topRatedMovies && getNowPLayingMoviesList();
//   }, []);

//   const dispatch = useDispatch();
//   const topRatedMovies = useSelector(store => store.movies.topRatedMovies)

//   const getNowPLayingMoviesList = async () => {
//     const response = await fetch(
//       "https://api.themoviedb.org/3/movie/top_rated",
//       API_OPTIONS
//     );
//     const data = await response.json();
//     dispatch(addTopRatedMovies(data.results));
    
//   };
// };

// export default useTopRatedMovies;
import { useEffect, useMemo } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../utils/movieSlice";

const cacheKey = "top-rated-movies";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);

  const cachedData = useMemo(() => {
    const cachedMovies = localStorage.getItem(cacheKey);
    return cachedMovies ? JSON?.parse?.(cachedMovies) : null;
  }, []);

  useEffect(() => {
    if (!cachedData) {
      getTopRatedMoviesList();
    } else {
      dispatch(addTopRatedMovies(cachedData));
    }
  }, [cachedData, dispatch]);

  const getTopRatedMoviesList = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated",
      API_OPTIONS
    );
    const data = await response.json();
    dispatch(addTopRatedMovies(data?.results));
    localStorage.setItem(cacheKey, JSON.stringify(data?.results));
  };
};

export default useTopRatedMovies;