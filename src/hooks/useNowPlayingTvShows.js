import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingTvShows } from "../utils/tvSlice";


const useNowPlayingTvShows = () => {
 
  useEffect(() => {
    !nowPlayingTvShows && getNowPLayingTvShowsList();
  }, []);

  const nowPlayingTvShows = useSelector(store => store.tvShows.nowPlayingTvShows)

  const dispatch = useDispatch();

  const getNowPLayingTvShowsList = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/tv/on_the_air",
      API_OPTIONS
    );
    const data = await response.json();
    // console.log("Now Playing TV shows Hook response:",data.results)
    dispatch(addNowPlayingTvShows(data.results));
    
  };
};

export default useNowPlayingTvShows;
