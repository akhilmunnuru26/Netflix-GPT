import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";

const useNowPlayingMovies = () => {
 
  useEffect(() => {
    // !nowPlayingMovies && getNowPLayingMoviesList();
    getNowPLayingMoviesList();
    return (() => {
      getNowPLayingMoviesList();
    })
  }, []);

  const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies)

  const dispatch = useDispatch();

  const getNowPLayingMoviesList = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const data = await response.json();
    dispatch(addNowPlayingMovies(data.results));
    
  };
};

export default useNowPlayingMovies;
