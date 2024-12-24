// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addVideoTrailer } from "../utils/movieSlice";
// import { API_OPTIONS } from "../utils/constants";
// import { addTvVideoTrailer } from "../utils/tvSlice";

// const useTvShowsTrailer = (movieId) => {
//   const dispatch = useDispatch();
//   // const clickedMovieId = useSelector(store => store.movies.clickedMovieId)
// //   const showMovies = useSelector((store) => store.movies.showMovies);

//   const getTvVideos = async () => {
//     const tvSeriesApi = `https://api.themoviedb.org/3/tv/${movieId}/videos
//       `;
//     // const movieVideoApi = `
//     //   https://api.themoviedb.org/3/movie/${movieId}/videos`;

//     // const api = showMovies ? movieVideoApi : tvSeriesApi;
//     const api = tvSeriesApi

//     const movieResponse = await fetch(api, API_OPTIONS);
//     // console.log("Tv Shows List API:",movieResponse)
    
//       const movieData = await movieResponse.json();
//       const trailerList = movieData?.results?.filter(
//         (video) => video.type === "Trailer"
//       );

//       const trailer = trailerList?.length
//         ? trailerList?.[0]
//         : movieData?.results?.[0];
//       dispatch(addTvVideoTrailer(trailer));
    
//   };

//   useEffect(() => {
//       getTvVideos();
//       return (() => {
//           getTvVideos()
//       })
//   }, [movieId]);
// };

// export default useTvShowsTrailer;



import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVideoTrailer } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { addTvVideoTrailer } from "../utils/tvSlice";

const cacheKey = "tv-shows-trailer";

const useTvShowsTrailer = (movieId) => {
  const dispatch = useDispatch();

  const cachedData = useMemo(() => {
    const cachedTrailer = localStorage?.getItem(`${cacheKey}-${movieId}`);
    return cachedTrailer ? JSON?.parse(cachedTrailer) : null;
  }, [movieId]);

  const getTvVideos = async () => {
    const tvSeriesApi = `https://api.themoviedb.org/3/tv/${movieId}/videos`;

    const movieResponse = await fetch(tvSeriesApi, API_OPTIONS);
    const movieData = await movieResponse?.json();
    const trailerList = movieData?.results?.filter(
      (video) => video.type === "Trailer"
    );

    const trailer = trailerList?.length
      ? trailerList?.[0]
      : movieData?.results?.[0];
    dispatch(addTvVideoTrailer(trailer));
    localStorage.setItem(`${cacheKey}-${movieId}`, JSON?.stringify(trailer));
  };

  useEffect(() => {
    if (!cachedData) {
      getTvVideos();
    } else {
      dispatch(addTvVideoTrailer(cachedData));
    }
  }, [cachedData, dispatch, movieId]);
};

export default useTvShowsTrailer;