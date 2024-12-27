// import { useEffect } from "react";
// import { API_OPTIONS } from "../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { addTopRatedTvShows } from "../utils/tvSlice";

// const useTopRatedTvShows = () => {
//   useEffect(() => {
//     !nowPlayingTvShows && getTopRatedTvShowsList();
//   }, []);

//   const nowPlayingTvShows = useSelector(store => store.tvShows?.topRatedTvShows)

//   const dispatch = useDispatch();

//   const getTopRatedTvShowsList = async () => {
//     const response = await fetch(
//       "https://api.themoviedb.org/3/tv/top_rated",
//       API_OPTIONS
//     );
//     const data = await response.json();
//     dispatch(addTopRatedTvShows(data.results));
    
//   };
// };

// export default useTopRatedTvShows;
import { useEffect, useMemo } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedTvShows } from "../utils/tvSlice";

const cacheKey = "top-rated-tv-shows";

const useTopRatedTvShows = () => {
  const dispatch = useDispatch();
  const topRatedTvShows = useSelector((store) => store?.tvShows?.topRatedTvShows);

  const cachedData = useMemo(() => {
    const cachedTvShows = localStorage.getItem(cacheKey);
    return cachedTvShows ? JSON?.parse?.(cachedTvShows) : null;
  }, []);

  useEffect(() => {
    if (!cachedData) {
      getTopRatedTvShowsList();
    } else {
      dispatch(addTopRatedTvShows(cachedData));
    }
  }, [cachedData, dispatch]);

  const getTopRatedTvShowsList = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/tv/top_rated",
      API_OPTIONS
    );
    const data = await response.json();
    dispatch(addTopRatedTvShows(data?.results));
    localStorage.setItem(cacheKey, JSON.stringify(data?.results));
  };
};

export default useTopRatedTvShows;