import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import {  addUpcomingMovies } from "../utils/movieSlice";

const useUpcomingMovies = () => {
  useEffect(() => {
    getNowPLayingMoviesList();
  }, []);

  const dispatch = useDispatch();

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
