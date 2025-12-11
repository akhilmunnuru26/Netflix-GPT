import { FaPlay } from "react-icons/fa";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addClickedMovie, togglePlayingMovie } from "../utils/movieSlice";
import { addTvVideoTrailer } from "../utils/tvSlice";
import { motion } from 'framer-motion';

const TvVideoTitle = ({ movieId, title, overview }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const moviePlaying = useSelector((store) => store.movies.playing);
  return (
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
        <motion.a
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
          onClick={() => {
            if (moviePlaying) {
              // Back from playing
              dispatch(togglePlayingMovie());
              dispatch(addClickedMovie(null));
              dispatch(addTvVideoTrailer(null));
              navigate('/browse/Tv');
            } else {
              dispatch(togglePlayingMovie());
              navigate('/browse/Tv/playing');
            }
          }}
          href=""
          className="relative mr-2 p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
        >
          <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
          <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
            <span className="relative text-white flex items-center">
              <FaPlay className="text-sm mr-2" /> {moviePlaying ? 'Back' : 'Play'}
            </span>
          </span>
        </motion.a>
        <motion.a
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.8 }}
          href=""
          className="relative mr-2 p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
        >
          <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
          <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
            <span className="relative text-white">More</span>
          </span>
        </motion.a>
      </div>
    </div>
  );
};

export default TvVideoTitle;
