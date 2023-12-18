import { useEffect } from "react"
import { useDispatch } from 'react-redux';
import { addVideoTrailer } from '../utils/movieSlice';
import {API_OPTIONS} from '../utils/constants'

const useMovieTrailer = (movieId) => {

    const dispatch = useDispatch()
  
    const getMovieVideos = async () => {
      const movieVideoApi = `
      https://api.themoviedb.org/3/movie/${movieId}/videos`;
  
      const movieResponse = await fetch(movieVideoApi,API_OPTIONS);
      const movieData = await movieResponse.json()
      const trailerList = movieData.results.filter(video => video.type === "Trailer")
  
      const trailer = trailerList.length ? trailerList[0]:movieData.results[0]
      dispatch(addVideoTrailer(trailer))
      
      
    };
  
    useEffect(() => {
      getMovieVideos()
    }, [])

 
}

export default useMovieTrailer