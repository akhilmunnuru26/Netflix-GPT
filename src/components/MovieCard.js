import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import useMovieTrailer from "../hooks/useMovieTrailer";
import { MOVIES_URL } from "../utils/constants"
import { addClickedMovie, togglePlayingMovie } from "../utils/movieSlice";
import './Header.css'


const MovieCard = ({posterPath, movie, forceClickable = false}) => {
  const dispatch = useDispatch()
  const showGpt = useSelector(store => store.gpt.showGptSearch)
  const navigate = useNavigate()
  if (!posterPath) return null;

  
  

  const handleClickedMovie = () => {
    // always set clicked movie in store and set playing state
    dispatch(addClickedMovie(movie));
    dispatch(togglePlayingMovie());

    // navigate to the appropriate playing route
    const isTv = !!movie?.first_air_date || !!movie?.name;
    if (isTv) {
      navigate('/browse/Tv/playing');
    } else {
      navigate('/browse/playing');
    }
  };
    

  return (
    
    

    <div
      onClick={handleClickedMovie}
      className="group flex justify-center items-center relative md:w-36 first-letter: md:mx-4 w-20 cursor-pointer transition duration-200 ease-in-out  hover:shadow-2xl  max-w-sm  bg-transparent  rounded-lg shadow overflow-hidden"
    >
      <img
        src={MOVIES_URL + posterPath}
        alt={`${posterPath}`}
        className="w-full h-full object-cover transition duration-200 ease-in-out relative"
      />

      {/* shine box */}
      <div
        className="absolute top-0 left-0 h-full w-full z-5 block bg-gradient-to-r from-white via-transparent to-transparent opacity-20 group-hover:animate-shine transition duration-500 ease-in-out"
      />
    </div>


    

    // <div
    //   onClick={handleClickedMovie}
    //   className="md:w-36 first-letter: md:mx-4 w-20 cursor-pointer transition duration-200 ease-in-out  hover:shadow-2xl  max-w-sm  bg-transparent  rounded-lg shadow"
    // >
    //   <img
    //     src={MOVIES_URL + posterPath}
    //     alt={`${posterPath}`}
    //     className="w-full h-full object-cover transition duration-200 ease-in-out hover:brightness-75"
    //   />
    // </div>
  );
}

export default MovieCard