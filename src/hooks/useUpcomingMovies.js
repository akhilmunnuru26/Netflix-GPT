import { useEffect, useMemo } from "react";
import { API_OPTIONS, TMDB_API_KEY } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/movieSlice";

const cacheKey = "upcoming-movies";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upComingMovies = useSelector((store) => store.movies.upComingMovies);

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
    const getUpcomingMoviesList = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}`,
        API_OPTIONS
      );
      const data = await response.json();
      dispatch(addUpcomingMovies(data.results));
      localStorage.setItem(cacheKey, JSON.stringify(data.results));
    };

    if (!cachedData) {
      getUpcomingMoviesList();
    } else {
      dispatch(addUpcomingMovies(cachedData));
    }
  }, [cachedData, dispatch]);
};

export default useUpcomingMovies;