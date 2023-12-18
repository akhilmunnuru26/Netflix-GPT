import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  useMovieTrailer(movieId);
  const trailer = useSelector((store) => store.movies?.videoTrailer);

  return (
    <div>
      
      <iframe
        className="w-screen aspect-video border-none"
        src={"https://www.youtube.com/embed/" +trailer?.key+"?autoplay=1&mute=1&rel=0;controls=0"}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"

      ></iframe>
    </div>
  );
};

export default VideoBackground;
