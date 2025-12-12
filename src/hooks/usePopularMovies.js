
import { useEffect, useMemo } from "react";
import { API_OPTIONS, TMDB_API_KEY } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";

const cacheKey = "popular-movies";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);

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
    const getPopularMoviesList = async () => {
      // const response = await fetch(
      //   `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`,
      //   API_OPTIONS
      // );
      const response = await fetch("/api/popular")
      const data = await response.json();
      dispatch(addPopularMovies(data.results));
      localStorage.setItem(cacheKey, JSON.stringify(data.results));
    };

    if (!cachedData) {
      getPopularMoviesList();
    } else {
      dispatch(addPopularMovies(cachedData));
    }
  }, [cachedData, dispatch]);
};

export default usePopularMovies;
