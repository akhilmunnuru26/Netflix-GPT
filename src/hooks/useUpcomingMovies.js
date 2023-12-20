import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {  addUpcomingMovies } from "../utils/movieSlice";

const useUpcomingMovies = () => {
  useEffect(() => {
    !upComingMovies && getNowPLayingMoviesList();
  }, []);

  const dispatch = useDispatch();
  const upComingMovies = useSelector(store => store.movies.upComingMovies)

  const getNowPLayingMoviesList = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming",
      API_OPTIONS
    );
    const data = await response.json();
    dispatch(addUpcomingMovies(data.results));
    
  };
};

export default useUpcomingMovies;
