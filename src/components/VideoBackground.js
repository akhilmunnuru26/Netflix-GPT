import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import useSimilarMovies from "../hooks/useSimilarMovies";

const VideoBackground = ({ movieId }) => {
  useMovieTrailer(movieId);
  useSimilarMovies(movieId)
 
  const movieTrailer = useSelector((store) => store.movies?.videoTrailer);
  const trailer = movieTrailer;

  if (!trailer || !trailer.key) {
    return (
      <div className="w-screen aspect-video flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">Trailer not available</div>
          <div className="text-sm opacity-80">No trailer found for this title.</div>
        </div>
      </div>
    );
  }

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
