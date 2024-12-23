import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import Footer from "./Footer";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  // const similarMovies = useSelector(store => store.movies?.similarMovies)
  const playing = useSelector(store => store.movies?.playing)
  
  


  return (
    playing ? (
      movies?.similarMovies && (
        <div className="bg-black">
          <div className="md:-mt-44 -mt-20 relative md:pl-6 z-20">
            <MovieList id="similarMovies" title={"Similar Movies"} movies={movies?.similarMovies} />
            <MovieList id="nowPlaying" title={"Now Playing"} movies={movies?.nowPlayingMovies} />
            <MovieList
              id="upcomingMovies"
              title={"Upcoming Movies"}
              movies={movies?.upcomingMovies}
            />
            <MovieList id="popularMovies" title={"Popular"} movies={movies?.popularMovies} />
            
          </div>
          <Footer/>
        </div>
      )
    ) : (
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
    )
  );
}

export default SecondaryContainer;
