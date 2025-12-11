import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import gptSlice from "../utils/gptSlice";

const GptMovieSuggestions = () => {
  const { gptSuggestedMovies, gptSuggestedTv, gptSearchResults } = useSelector(
    (store) => store.gpt
  );
  //console.log("gpt suggested movies", gptSuggestedMovies);

  if (!gptSearchResults) return null;

  return (
    <div className="bg-black text-white m-10 bg-opacity-80 pb-10 mb-32">
      {gptSearchResults.map((query, index) => (
        <div key={query} className="mb-8">
          <MovieList
            title={`Movies matching: ${query}`}
            movies={gptSuggestedMovies?.results?.slice(0, 10) || []}
            forceClickable={true}
          />

          <MovieList
            title={`TV Shows matching: ${query}`}
            movies={gptSuggestedTv?.results?.slice(0, 10) || []}
            forceClickable={true}
          />
        </div>
      ))}
    </div>
  );
};

export default GptMovieSuggestions;
