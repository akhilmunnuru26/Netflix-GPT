import { FaPlay } from "react-icons/fa";
import './Header.css'
import { MOVIES_URL } from "../utils/constants"
import { addClickedMovie, addClickedMovieId, addVideoTrailer, togglePlayingMovie } from "../utils/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { PlayCircleIcon } from "@heroicons/react/20/solid";
import { IoMdArrowBack } from "react-icons/io";
import { motion } from 'framer-motion';

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
    dispatch(togglePlayingMovie())
    
    !showGpt && dispatch(addVideoTrailer(movieId))
    !showGpt && dispatch(addClickedMovieId(movieId))
    // dispatch(togglePlayingMovie())

    if (moviePlaying) {
      navigate("/browse")
    } else {
      navigate("/browse/playing")
    }
   

  }

  const handleBackToHome = () => {
    // dispatch(togglePlayingMovie())
    
  }
  
  return (
     (
      // <div className="w-screen aspect-video md:pt-[22%] md:px-16 md:mb-10 pt-[30%] px-8 absolute text-white bg-gradient-to-r from-black">
      //   <h1 className="md:text-4xl  text-sm font-bold">{title}</h1>
      //   <p className="invisible md:visible md:py-4 text-sm md:text-base md:w-2/6 w-3/4">{overview.substring(0, 450)}</p>
      //   <div className="flex">
      //     {!moviePlaying && 
          
          
          
      //      <a onClick={handleClickedMovie} href="" className="relative mr-2 p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
      //       <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
      //       <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
      //         <span className="relative text-white flex items-center"><FaPlay className="text-sm mr-2" /> Play</span>
      //       </span>
      //     </a>}
          
      //     {moviePlaying && 
          
          
      //        <a onClick={handleClickedMovie} href="" className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
      //       <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
      //       <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
      //           <span className="relative text-white flex items-center"><IoMdArrowBack className="text-xl mr-2" /> Back</span>
      //       </span>
      //     </a>
      //     }

      //     {!moviePlaying && <a onClick={handleBackToHome} href="" className="relative mr-2 p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
      //       <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
      //       <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
      //         <span className="relative text-white">More</span>
      //       </span>
      //     </a>}
          
      //     {/* {!moviePlaying && <button onClick={handleBackToHome} className="w-auto h-auto text-center bg-gray-500 text-white md:py-1 md:px-3 opacity-80 md:text-lg rounded text-xs">
      //       {'More'}
      //     </button>} */}
      //   </div>
      // </div>
     

  <div className="w-screen aspect-video md:pt-[22%] md:px-16 md:mb-10 pt-[30%] px-8 absolute text-white bg-gradient-to-r from-black">
    <motion.h1
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="md:text-4xl  text-sm font-bold"
    >
      {title}
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
      className="invisible md:visible md:py-4 text-sm md:text-base md:w-2/6 w-3/4"
    >
      {overview.substring(0, 450)}
    </motion.p>
    <div className="flex">
      {!moviePlaying && (
        <motion.a
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
          onClick={handleClickedMovie}
          href=""
          className="relative mr-2 p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
        >
          <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
          <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
            <span className="relative text-white flex items-center">
              <FaPlay className="text-sm mr-2" /> Play
            </span>
          </span>
        </motion.a>
      )}
      {moviePlaying && (
        <motion.a
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.6 }}
          onClick={handleClickedMovie}
          href=""
          className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
        >
          <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
          <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
            <span className="relative text-white flex items-center">
              <IoMdArrowBack className="text-xl mr-2" /> Back
            </span>
          </span>
        </motion.a>
      )}
      {!moviePlaying && (
        <motion.a
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.8 }}
          onClick={handleBackToHome}
          href=""
          className="relative mr-2 p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
        >
          <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
          <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
            <span className="relative text-white">More</span>
          </span>
        </motion.a>
      )}
    </div>
  </div>
    )
  );
  
};

export default VideoTitle;
