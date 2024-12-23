import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  useMovieTrailer(movieId);
  const showMovies = useSelector((store) => store.movies?.showMovies)
  const movieTrailer = useSelector((store) => store.movies?.videoTrailer);
  const tvTrailer = useSelector((store) => store.tvShows?.tvVideoTrailer)
  const trailer = showMovies ?  movieTrailer: tvTrailer;

  console.log("Trailer Key",trailer?.key)


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
        // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
