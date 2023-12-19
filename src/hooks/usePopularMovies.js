import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";

const usePopularMovies = () => {
  useEffect(() => {
    getNowPLayingMoviesList();
  }, []);

  const dispatch = useDispatch();

  const getNowPLayingMoviesList = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular",
      API_OPTIONS
    );
    const data = await response.json();
    dispatch(addPopularMovies(data.results));
    
  };
};

export default usePopularMovies;
