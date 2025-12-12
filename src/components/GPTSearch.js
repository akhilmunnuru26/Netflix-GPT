import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { Background_logo } from "../utils/constants";
import Footer from "./Footer";
import Header from "./Header";
import MovieSearch from "./MovieSearch";

const GPTSearch = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <Header/>
      <div>
        <div className="fixed -z-10 opacity-90">
          <img
            src={Background_logo}
            alt="bg-logo"
          />
        </div>
        <GptSearchBar />
        
        {/* <MovieSearch/> */}
        <GptMovieSuggestions />
      </div>
      <div className="mt-32">
        <Footer />
      </div>
      
    </div>
  );
};

export default GPTSearch;
