import { useSelector } from "react-redux"
import VideoTitle from "./VideoTitle"
import VideoBackground from "./VideoBackground"

const MainContainer = () => {

    const movies = useSelector(store => store.movies?.nowPlayingMovies)

    if (!movies) return; // early return
    const index = Math.floor(Math.random() * 10);

    const mainMovie = movies[index]
    
    const {original_title,overview,id} = mainMovie
  

  return (
    <div className="mt-0">
        <VideoTitle title={original_title} overview={overview}/>
        <VideoBackground movieId={id}/>
      </div>
  )
}

export default MainContainer