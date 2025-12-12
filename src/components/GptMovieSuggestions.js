import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import gptSlice from "../utils/gptSlice";

const GptMovieSuggestions = () => {
  const { gptSuggestedMovies, gptSearchResults } = useSelector(
    (store) => store.gpt
  );
  //console.log("gpt suggested movies", gptSuggestedMovies);

  if (!gptSearchResults) return null;

  return (
    <div className="bg-black text-white m-10 bg-opacity-80 pb-10 mb-32">
      {gptSearchResults.map((movie, index) => (
        <MovieList
          key={movie}
          title={movie}
          movies={gptSuggestedMovies[index].results.slice(0, 10)}
          forceClickable={true}
        />
      ))}
    </div>
  );
};

export default GptMovieSuggestions;
