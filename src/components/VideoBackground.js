import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import useSimilarMovies from "../hooks/useSimilarMovies";

const VideoBackground = ({ movieId }) => {
  useMovieTrailer(movieId);
  useSimilarMovies(movieId)
 
  const movieTrailer = useSelector((store) => store.movies?.videoTrailer);
  const playing = useSelector((store) => store.movies.playing)
 
  const trailer =  movieTrailer;

  // console.log("Trailer Key",trailer?.key)


  return (
    <div className="">
      
      <iframe
        className="w-screen aspect-video border-none"
        src={
          "https://www.youtube.com/embed/" +
          trailer?.key +
          "?loop=1&playlist=" +
          trailer?.key +
          "&autoplay=1&mute=1&rel=0&controls=0&showinfo=0&modestbranding=1&enablejsapi=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
