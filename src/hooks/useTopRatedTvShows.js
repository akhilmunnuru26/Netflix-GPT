import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedTvShows } from "../utils/tvSlice";

const useTopRatedTvShows = () => {
  useEffect(() => {
    !nowPlayingTvShows && getTopRatedTvShowsList();
  }, []);

  const nowPlayingTvShows = useSelector(store => store.tvShows?.topRatedTvShows)

  const dispatch = useDispatch();

  const getTopRatedTvShowsList = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/tv/top_rated",
      API_OPTIONS
    );
    const data = await response.json();
    dispatch(addTopRatedTvShows(data.results));
    
  };
};

export default useTopRatedTvShows;
