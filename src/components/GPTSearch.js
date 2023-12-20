import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { Background_logo } from "../utils/constants";

const GPTSearch = () => {
  return (
    <div>
      <div className="fixed -z-10 opacity-90">
        <img
          src={Background_logo}
          alt="bg-logo"
        />
        </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GPTSearch;
