// import { useEffect } from "react";
// import { API_OPTIONS } from "../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import {  addUpcomingMovies } from "../utils/movieSlice";

// const useUpcomingMovies = () => {
//   useEffect(() => {
//     !upComingMovies && getNowPLayingMoviesList();
//   }, []);

//   const dispatch = useDispatch();
//   const upComingMovies = useSelector(store => store.movies.upComingMovies)

//   const getNowPLayingMoviesList = async () => {
//     const response = await fetch(
//       "https://api.themoviedb.org/3/movie/upcoming",
//       API_OPTIONS
//     );
//     const data = await response.json();
//     dispatch(addUpcomingMovies(data.results));
    
//   };
// };

// export default useUpcomingMovies;
import { useEffect, useMemo } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/movieSlice";

const cacheKey = "upcoming-movies";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upComingMovies = useSelector((store) => store.movies.upComingMovies);

  const cachedData = useMemo(() => {
    const cachedMovies = localStorage.getItem(cacheKey);
    return cachedMovies ? JSON.parse(cachedMovies) : null;
  }, []);

  useEffect(() => {
    if (!cachedData) {
      getUpcomingMoviesList();
    } else {
      dispatch(addUpcomingMovies(cachedData));
    }
  }, [cachedData, dispatch]);

  useEffect(() => {
    if (upComingMovies) {
      localStorage.setItem(cacheKey, JSON.stringify(upComingMovies));
    }
  }, [upComingMovies]);

  const getUpcomingMoviesList = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming",
      API_OPTIONS
    );
    const data = await response.json();
    dispatch(addUpcomingMovies(data.results));
  };
};

export default useUpcomingMovies;