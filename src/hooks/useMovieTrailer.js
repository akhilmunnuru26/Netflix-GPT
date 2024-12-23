import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { addVideoTrailer } from '../utils/movieSlice';
import {API_OPTIONS} from '../utils/constants'
// import { addTvVideoTrailer } from "../utils/tvSlice";

const useMovieTrailer = (movieId) => {

    const dispatch = useDispatch()
   // const clickedMovieId = useSelector(store => store.movies.clickedMovieId)
    const showMovies = useSelector(store => store.movies.showMovies)


   

    const getMovieVideos = async () => {
      // const tvSeriesApi = `https://api.themoviedb.org/3/tv/${movieId}/videos
      // `
      const movieVideoApi = `
      https://api.themoviedb.org/3/movie/${movieId}/videos`;

       const api = movieVideoApi 
      // const api = movieVideoApi
  
      const movieResponse = await fetch(api,API_OPTIONS);
      // console.log("Tv Shows List API:",movieResponse)
      
        const movieData = await movieResponse.json()
        const trailerList = movieData?.results?.filter(video => video.type === "Trailer")
  
        const trailer = trailerList?.length ? trailerList?.[0]:movieData?.results?.[0]
        dispatch(addVideoTrailer(trailer))
      
      
      
      
    };
  
    useEffect(() => {
       getMovieVideos()
    }, [movieId])

 
}

export default useMovieTrailer