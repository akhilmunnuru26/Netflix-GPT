import { useSelector } from "react-redux"
import VideoTitle from "./VideoTitle"
import VideoBackground from "./VideoBackground"

const MainContainer = () => {

  

    const movies = useSelector(store => store.movies?.nowPlayingMovies)
    const clickedMovie = useSelector(store => store.movies.clickedMovie)

    if (!movies) return; // early return
   //const index = Math.floor(Math.random() * 5);


    const mainMovie = clickedMovie ?clickedMovie : movies[0]
    
    const {original_title,overview,id} = mainMovie
  

  return (
    <div className="mt-0 ">
        <VideoTitle title={original_title} overview={overview}/>
        <VideoBackground movieId={id}/>
      </div>
  )
}

export default MainContainer