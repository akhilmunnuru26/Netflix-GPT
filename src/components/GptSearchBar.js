import { useDispatch, useSelector } from "react-redux";
import language from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptSuggestedMovies, addOpenAIKey } from "../utils/gptSlice";

const GptSearchBar = () => {
  const userSearchText = useRef("");
  const userOpenaiKey = useRef("")

  const dispatch = useDispatch();

  const searchMovies = async (movie) => {
    const response = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const searchedMovies = await response.json();
    return searchedMovies;
  };

  const handleMovieSearch = async () => {
    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query: " +
      userSearchText.current.value +
      ". only strictly give me the names of the movies,comma seperated like example result given ahead like Golmal,hera peri,Bahubali";
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    if (!gptResults.choices) {
      console.log("Error in GPT Response");
    }
    console.log(gptResults);
    const gptMoviesResponse = gptResults.choices[0]?.message.content.split(",");
    const searchedMovies = gptMoviesResponse.map((movie) =>
      searchMovies(movie)
    );
    const tmdbMovieResults = await Promise.all(searchedMovies);
    dispatch(
      addGptSuggestedMovies({
        movies: tmdbMovieResults,
        gptMovieResults: gptMoviesResponse,
      })
    );
  };

  const handleOpenAIKeySubmit = () => {
    if (!userOpenaiKey) return
    dispatch(addOpenAIKey(userOpenaiKey.current.value))
  }

  const langKey = useSelector((store) => store.config.lang);
  return (
    <div className="pt-[8%] flex justify-center">
      <form
        className="bg-black p-3 w-1/2 grid grid-cols-12 rounded"
        onSubmit={(e) => e.preventDefault()}
      >
        <>
        <input
          type="text"
          className="col-span-10  p-3 rounded outline-none"
          placeholder={`${language[langKey].searchPlaceHolder}`}
          ref={userSearchText}
        />
        <button
          onClick={handleMovieSearch}
          className="col-span-2 rounded m-1 p-3 bg-red-700 text-white text-md"
        >
          {language[langKey].searchText}
        </button>
        </>
        <div className="col-span-full my-3">
          <h1 className="text-white  col-span-10">Open AI Key :</h1>
          <input
          type="text"
          className=" p-1 col-span-12 my-1 rounded outline-none"
          placeholder="Enter Your Open AI Key"
          ref={userOpenaiKey}
          
        />
        <button onClick={ handleOpenAIKeySubmit} className="bg-gray-500 hover:opacity-80 text-white py-1 px-2 mx-2 rounded">Submit</button>
        </div>
      </form>
      
    </div>
  );
};

export default GptSearchBar;
