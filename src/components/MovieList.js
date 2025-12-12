
import MovieCard from "./MovieCard";

import '../index.css'


const MovieList = ({id, title, movies, forceClickable = false }) => {



  
 const handleScroll = (direction) => {
   const scrollContainer = document.getElementById(`movie-list-${id}`);
   const scrollWidth = scrollContainer.scrollWidth;
   const clientWidth = scrollContainer.clientWidth;
   const currentScrollLeft = scrollContainer.scrollLeft;

   const newScrollLeft =
     direction === "left"
       ? Math.max(0, currentScrollLeft - clientWidth)
       : Math.min(scrollWidth - clientWidth, currentScrollLeft + clientWidth);

   scrollContainer.scrollTo({
     top: 0,
     left: newScrollLeft,
     behavior: "smooth",
   });
 };
  
 
  return (
    <div className="px-8 text-white">
      <h1 className="md:text-2xl md:py-4 text-sm py-2">{title}</h1>
      <div className="relative">
        <button
          className="absolute z-30 left-0 top-1/2 -translate-y-1/2  text-white rounded-full p-2"
          onClick={() => handleScroll("left")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div
          id={`movie-list-${id}`}
          className="movie-list-container flex overflow-y-hidden overflow-x-auto "
          style={{ scrollbarWidth: "none" }}
        >
          <div className=" flex">
            {movies?.map((movie) => (
              <MovieCard
                key={movie.id}
                posterPath={movie?.poster_path}
                movie={movie}
                forceClickable={forceClickable}
              />
            ))}
          </div>
        </div>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 text-white rounded-full p-2"
          onClick={() => handleScroll("right")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MovieList;
