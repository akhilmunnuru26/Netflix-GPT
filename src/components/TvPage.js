import { useSelector } from "react-redux"
import VideoTitle from "./VideoTitle"
// import VideoBackground from "./VideoBackground"
import TvVideoBackground from "./TvVideoBackground"
import TvVideoTitle from "./TvVideoTitle"

const TvPageMainCointainer = () => {

    
    const tvShows = useSelector(store => store.tvShows?.nowPlayingTvShows)
     const clickedMovie = useSelector(store => store.movies.clickedMovie)

    if (!tvShows) return; // early return
   //const index = Math.floor(Math.random() * 5);


     const mainMovie = clickedMovie !== null ?clickedMovie : tvShows[0]
    console.log("Tv Shows",tvShows)
    
    const {name,overview,id} = mainMovie

    console.log("Tv Shows Id:",id)
  

  return (
    <div className="mt-0">
        <TvVideoTitle title={name} overview={overview}/>
        <TvVideoBackground movieId={id}/>
      </div>
  )
}

export default TvPageMainCointainer