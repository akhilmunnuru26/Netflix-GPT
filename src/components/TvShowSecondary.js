import { useSelector } from "react-redux";
//import MovieList from "./MovieList";
import TvList from "./TvList";

const TvShowSecondary = () => {
  const tvShows = useSelector((store) => store.tvShows);
  
  


  console.log("Tv Shows Secondary Container: ",tvShows)
  return (
     (
      <div className="bg-black">
        <div className="md:-mt-44 -mt-20 relative md:pl-6 z-80 pb-5">
        <TvList id="nowPlaying" title={"Now Playing"} tvShows={tvShows?.nowPlayingTvShows} />
        <TvList id="popularShows" title={"Popular Shows"} tvShows={tvShows?.popularTvShows} />
        <TvList id="topRatedShows" title={"Top Rated Shows"} tvShows={tvShows?.topRatedTvShows} />
        
        </div>
      </div>
    )
  );
};

export default TvShowSecondary;
