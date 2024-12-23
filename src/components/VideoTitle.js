import { FaPlay } from "react-icons/fa";
import './Header.css'

const VideoTitle = ({ title, overview }) => {

  
  

  return (
    <div className="w-screen aspect-video md:pt-[22%] md:px-16 md:mb-10 pt-[30%] px-8 absolute text-white bg-gradient-to-r from-black">
      <h1 className="md:text-4xl  text-sm font-bold">{title}</h1>
      <p className="invisible md:visible md:py-4 text-sm md:text-base md:w-2/6 w-3/4">{overview.substring(0,450)}</p>
      <div className="flex">
        <button className="icons-container w-24 h-auto text-center bg-white text-black py-1 px-3 text-lg rounded mr-4 hover:bg-opacity-80">
          <FaPlay className="text-sm mx-2"/>Play
        </button>
        <button className="w-auto h-auto text-center bg-gray-500 text-white md:py-1 md:px-3 opacity-80 md:text-lg rounded text-xs">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
