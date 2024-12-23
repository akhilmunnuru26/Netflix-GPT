import { FaPlay } from "react-icons/fa";
import './Header.css'
import { MOVIES_URL } from "../utils/constants"
import { addClickedMovie, addClickedMovieId, addVideoTrailer, togglePlayingMovie } from "../utils/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { PlayCircleIcon } from "@heroicons/react/20/solid";

const VideoTitle = ({movieId, title, overview }) => {

  const showGpt = useSelector(store => store.gpt.showGptSearch)
  const moviePlaying = useSelector(store => store.movies.playing)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  if (!title) return null;
  

  const handleMoviePlaying = () => {
    if (moviePlaying) {
      navigate("/browse")
    }
  }


  const handleClickedMovie = () => {
    !showGpt && dispatch(addVideoTrailer(movieId))
    !showGpt && dispatch(addClickedMovieId(movieId))
    dispatch(togglePlayingMovie())
    navigate("/playing")

  }

  const handleBackToHome = () => {
    dispatch(togglePlayingMovie())
    if (moviePlaying) {
      navigate("/browse")
    }
  }
  
  return (
     (
      <div className="w-screen aspect-video md:pt-[22%] md:px-16 md:mb-10 pt-[30%] px-8 absolute text-white bg-gradient-to-r from-black">
        <h1 className="md:text-4xl  text-sm font-bold">{title}</h1>
        <p className="invisible md:visible md:py-4 text-sm md:text-base md:w-2/6 w-3/4">{overview.substring(0, 450)}</p>
        <div className="flex">
          <button onClick={handleClickedMovie} className="icons-container w-24 h-auto text-center bg-white text-black py-1 px-3 text-lg rounded mr-4 hover:bg-opacity-80">
            <FaPlay className="text-sm mx-2" /> Play
          </button>
          <button onClick={handleBackToHome} className="w-auto h-auto text-center bg-gray-500 text-white md:py-1 md:px-3 opacity-80 md:text-lg rounded text-xs">
            {moviePlaying ? 'Back': 'More'}
          </button>
        </div>
      </div>
    )
  );
  
};

export default VideoTitle;
