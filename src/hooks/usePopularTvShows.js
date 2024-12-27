// import { useEffect } from "react";
// import { API_OPTIONS } from "../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { addPopularTvShows } from "../utils/tvSlice";

// const usePopularTvShows = () => {
//   useEffect(() => {
//     !popularTvShows && getPopularTvShowsList();
//   }, []);

//   const popularTvShows = useSelector(store => store.tvShows.popularTvShows)
//   const dispatch = useDispatch();

//   const getPopularTvShowsList = async () => {
//     const response = await fetch(
//       "https://api.themoviedb.org/3/tv/popular",
//       API_OPTIONS
//     );
//     const data = await response.json();
    
//     dispatch(addPopularTvShows(data.results));
    
//   };
// };

// export default usePopularTvShows;
import { useEffect, useMemo } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPopularTvShows } from "../utils/tvSlice";

const cacheKey = "popular-tv-shows";

const usePopularTvShows = () => {
  const dispatch = useDispatch();
  const popularTvShows = useSelector((store) => store?.tvShows?.popularTvShows);

  const cachedData = useMemo(() => {
    const cachedTvShows = localStorage.getItem(cacheKey);
    return cachedTvShows ? JSON?.parse?.(cachedTvShows) : null;
  }, []);

  useEffect(() => {
    if (!cachedData) {
      getPopularTvShowsList();
    } else {
      dispatch(addPopularTvShows(cachedData));
    }
  }, [cachedData, dispatch]);

  const getPopularTvShowsList = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/tv/popular",
      API_OPTIONS
    );
    const data = await response.json();
    dispatch(addPopularTvShows(data?.results));
    localStorage.setItem(cacheKey, JSON.stringify(data?.results));
  };
};

export default usePopularTvShows;