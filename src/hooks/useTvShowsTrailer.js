import { useEffect, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addTvVideoTrailer } from "../utils/tvSlice";
import { API_OPTIONS, TMDB_API_KEY } from "../utils/constants";

const cacheKey = "tv-shows-trailer";

const useTvShowsTrailer = (tvShowId) => {
  const dispatch = useDispatch();
  const cachedData = useMemo(() => {
    const cachedTrailer = localStorage.getItem(`${cacheKey}-${tvShowId}`);
    if (!cachedTrailer) return null;
    try {
      return JSON.parse(cachedTrailer);
    } catch (error) {
      console.error(error);
      return null;
    }
  }, [tvShowId]);

  const getTvVideos = useCallback(async () => {
    const tvSeriesApi = `https://api.themoviedb.org/3/tv/${tvShowId}/videos?api_key=${TMDB_API_KEY}`;
    try {
      const response = await fetch(tvSeriesApi, API_OPTIONS);
      const data = await response.json();
      const trailerList = data.results.filter((video) => video.type === "Trailer");
      const trailer = trailerList.length ? trailerList[0] : data.results[0];
      dispatch(addTvVideoTrailer(trailer));
      localStorage.setItem(`${cacheKey}-${tvShowId}`, JSON.stringify(trailer));
    } catch (error) {
      console.error(error);
    }
  }, [tvShowId, dispatch]);

  useEffect(() => {
    if (!cachedData) {
      getTvVideos();
    } else {
      dispatch(addTvVideoTrailer(cachedData));
    }
  }, [getTvVideos, cachedData, dispatch]);
};

export default useTvShowsTrailer;