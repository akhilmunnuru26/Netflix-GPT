import { useEffect, useMemo } from "react";
import { API_OPTIONS, TMDB_API_KEY } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedTvShows } from "../utils/tvSlice";

const cacheKey = "top-rated-tv-shows";

const useTopRatedTvShows = () => {
  const dispatch = useDispatch();
  const topRatedTvShows = useSelector((store) => store?.tvShows?.topRatedTvShows);

  const cachedData = useMemo(() => {
    const cachedTvShows = localStorage.getItem(cacheKey);
    try {
      return cachedTvShows ? JSON.parse(cachedTvShows) : null;
    } catch (error) {
      console.error("Error parsing cached TV shows:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    const getTopRatedTvShowsList = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${TMDB_API_KEY}`,
        API_OPTIONS
      );
      const data = await response.json();
      dispatch(addTopRatedTvShows(data?.results));
      localStorage.setItem(cacheKey, JSON.stringify(data?.results));
    };

    if (!cachedData) {
      getTopRatedTvShowsList();
    } else {
      dispatch(addTopRatedTvShows(cachedData));
    }
  }, [cachedData, dispatch]);
};

export default useTopRatedTvShows;