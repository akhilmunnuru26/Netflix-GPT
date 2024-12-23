import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  
  


  return (
    movies?.nowPlayingMovies && (
      <div className="bg-black">
        <div className="md:-mt-44 -mt-20 relative md:pl-6 z-20">
        <MovieList id="nowPlaying" title={"Now Playing"} movies={movies?.nowPlayingMovies} />
          <MovieList
            id="upcomingMovies"
          title={"Upcoming Movies"}
          movies={movies?.upcomingMovies}
        />
        <MovieList id="popularMovies" title={"Popular"} movies={movies?.popularMovies} />
        
        <MovieList id="topRatedMovies" title={"Top Rated"} movies={movies?.topRatedMovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
