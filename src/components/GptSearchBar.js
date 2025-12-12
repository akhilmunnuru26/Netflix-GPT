import { useDispatch, useSelector } from "react-redux";
import language from "../utils/languageConstants";
import { useRef, useEffect, useState } from "react";
// import openai from "../utils/openai"; // OpenAI flow commented out — using local MovieSearch instead
// no direct TMDB API usage here — using local MovieSearchEngine
import { addGptSuggestedMovies } from "../utils/gptSlice";
import { MovieSearchEngine } from "../utils/movieSearchEngine";

const GptSearchBar = () => {
  const userSearchText = useRef("");

  const dispatch = useDispatch();
  const nowPlaying = useSelector((store) => store.movies.nowPlayingMovies) || [];
  const popular = useSelector((store) => store.movies.popularMovies) || [];
  const upcoming = useSelector((store) => store.movies.upcomingMovies) || [];
  const topRated = useSelector((store) => store.movies.topRatedMovies) || [];

  // combine available lists into one de-duped array
  const MOVIES = [...nowPlaying, ...popular, ...upcoming, ...topRated].filter(
    (v, i, a) => v && a.findIndex((t) => t.id === v.id) === i
  );

  // Local MovieSearchEngine (no OpenAI). We keep the old OpenAI flow commented for reference.
  const engineRef = useRef(null);
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function init() {
      try {
        const engine = new MovieSearchEngine();
        await engine.initialize();
        await engine.cacheMovies(MOVIES);
        if (!cancelled) {
          engineRef.current = engine;
          setEngineReady(true);
        }
      } catch (e) {
        console.error('MovieSearchEngine init error', e);
      }
    }

    init();
    return () => {
      cancelled = true;
      // cleanup
      if (engineRef.current) {
        try {
          engineRef.current.cacheMovies([]);
        } catch (e) {}
        engineRef.current = null;
      }
    };
  }, [MOVIES]);

  // Commented out OpenAI-based flow (kept for reference)
  /*
  const searchMovies = async (movie) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=` +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const searchedMovies = await response.json();
    return searchedMovies;
  };

  const handleMovieSearch = async () => {
    // OpenAI flow (commented)
  };
  */

  const handleMovieSearch = async () => {
    const query = (userSearchText.current.value || '').trim();
    if (!query || !engineRef.current) return;

    try {
      const res = await engineRef.current.search(query, MOVIES, {
        topK: 10,
        minSimilarity: 0.05,
      });

      // Convert engine results to shape expected by GptMovieSuggestions
      // which expects an array of TMDB-like responses with a .results array
      const tmdbStyle = [{ results: res.map((r) => r.movie) }];
      dispatch(
        addGptSuggestedMovies({
          movies: tmdbStyle,
          gptMovieResults: [query],
        })
      );
    } catch (e) {
      console.error('Local search error', e);
    }
  };

  // OpenAI key removed — no longer collecting key in UI

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
          disabled={!engineReady}
        >
          {language[langKey].searchText}
        </button>
        </>
        {/* OpenAI key input removed per user request */}
      </form>
      
    </div>
  );
};

export default GptSearchBar;
