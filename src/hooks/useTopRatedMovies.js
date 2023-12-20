import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {  addTopRatedMovies } from "../utils/movieSlice";

const useTopRatedMovies = () => {
  useEffect(() => {
    !topRatedMovies && getNowPLayingMoviesList();
  }, []);

  const dispatch = useDispatch();
  const topRatedMovies = useSelector(store => store.movies.topRatedMovies)

  const getNowPLayingMoviesList = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated",
      API_OPTIONS
    );
    const data = await response.json();
    dispatch(addTopRatedMovies(data.results));
    
  };
};

export default useTopRatedMovies;
