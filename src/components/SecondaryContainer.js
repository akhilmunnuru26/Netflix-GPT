import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);


  return (
    movies?.nowPlayingMovies && (
      <div className="bg-black">
        <div className="-mt-52 relative pl-6 z-20">
        <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
        <MovieList
          title={"Upcoming Movies"}
          movies={movies?.upcomingMovies}
        />
        <MovieList title={"Popular"} movies={movies?.popularMovies} />
        
        <MovieList title={"Top Rated"} movies={movies?.topRatedMovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
