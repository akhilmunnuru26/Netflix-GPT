// import { useEffect } from "react";
// import { API_OPTIONS } from "../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { addNowPlayingTvShows } from "../utils/tvSlice";


// const useNowPlayingTvShows = () => {
 
//   useEffect(() => {
//     // !nowPlayingTvShows && getNowPLayingTvShowsList();
//     getNowPLayingTvShowsList();
//     return (() => {
//       getNowPLayingTvShowsList()
//     })
//   }, []);

//   const nowPlayingTvShows = useSelector(store => store.tvShows.nowPlayingTvShows)

//   const dispatch = useDispatch();

//   const getNowPLayingTvShowsList = async () => {
//     const response = await fetch(
//       "https://api.themoviedb.org/3/tv/on_the_air",
//       API_OPTIONS
//     );
//     const data = await response.json();
//     // console.log("Now Playing TV shows Hook response:",data.results)
//     dispatch(addNowPlayingTvShows(data.results));
    
//   };
// };

// export default useNowPlayingTvShows;
import { useEffect, useMemo } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingTvShows } from "../utils/tvSlice";

const cacheKey = "now-playing-tv-shows";

const useNowPlayingTvShows = () => {
  const dispatch = useDispatch();
  const nowPlayingTvShows = useSelector((store) => store.tvShows.nowPlayingTvShows);

  const cachedData = useMemo(() => {
    const cachedTvShows = localStorage.getItem(cacheKey);
    return cachedTvShows ? JSON.parse(cachedTvShows) : null;
  }, []);

  useEffect(() => {
    if (!cachedData) {
      getNowPLayingTvShowsList();
    } else {
      dispatch(addNowPlayingTvShows(cachedData));
    }
  }, [cachedData, dispatch]);

  const getNowPLayingTvShowsList = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/tv/on_the_air",
      API_OPTIONS
    );
    const data = await response.json();
    dispatch(addNowPlayingTvShows(data.results));
    localStorage.setItem(cacheKey, JSON.stringify(data.results));
  };
};

export default useNowPlayingTvShows;