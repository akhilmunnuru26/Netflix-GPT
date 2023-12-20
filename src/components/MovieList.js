
import MovieCard from "./MovieCard";

import '../index.css'

const MovieList = ({ title, movies }) => {
 
  return (
    <div className="px-12  text-white">
      <h1 className="text-2xl py-4">{title}</h1>
      <div className="flex  overflow-x-scroll  hover:scrollbar-thumb-red-800 scrollbar-thin hover:scrollbar-track-black">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie?.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
