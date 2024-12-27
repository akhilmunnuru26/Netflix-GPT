import { useDispatch, useSelector } from "react-redux";
//import useMovieTrailer from "../hooks/useMovieTrailer";
import { TVSHOWS_URL } from "../utils/constants"
import { addClickedMovie } from "../utils/movieSlice";


const TvShowCard = ({posterId,tvShow}) => {
  const dispatch = useDispatch()
  // console.log("posterId: ",posterId)
  const showGpt = useSelector(store => store.gpt.showGptSearch)
  if (!posterId) return null;

  


  const handleClickedMovie = () => {
    !showGpt && dispatch(addClickedMovie(tvShow))
    
  }

  const posterUrl = TVSHOWS_URL + posterId +"/images"
    

  return (
    <div onClick={handleClickedMovie} class="rounded p-4 shadow-lg transition-all duration-700 hover:scale-110">
    <div class="flex flex-col gap-2">
       <img
            src={posterUrl}
            alt={`${tvShow?.original_title}`}
        />
    </div>
  </div>


    // <div  className="md:w-36  first-letter:  md:mx-4  w-20 transform-gpu hover:scale-110 transition-all duration-100 cursor-pointer object-cover">
       
    // </div>
  )
}

export default TvShowCard