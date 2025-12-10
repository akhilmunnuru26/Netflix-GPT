
import { useEffect, useMemo } from "react";
import { API_OPTIONS, TMDB_API_KEY } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../utils/movieSlice";

const cacheKey = "top-rated-movies";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);

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
    const getTopRatedMoviesList = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}`,
        API_OPTIONS
      );
      const data = await response.json();
      dispatch(addTopRatedMovies(data?.results));
      localStorage.setItem(cacheKey, JSON.stringify(data?.results));
    };

    if (!cachedData) {
      getTopRatedMoviesList();
    } else {
      dispatch(addTopRatedMovies(cachedData));
    }
  }, [cachedData, dispatch]);
};

export default useTopRatedMovies;