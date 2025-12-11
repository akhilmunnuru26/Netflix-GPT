import { useDispatch, useSelector } from "react-redux";
import language from "../utils/languageConstants";
import { useRef, useEffect, useState } from "react";
import { addGptSuggestedMovies } from "../utils/gptSlice";
import { API_OPTIONS, TMDB_API_KEY } from "../utils/constants";
import {
  addNowPlayingTvShows,
  addPopularTvShows,
  addTopRatedTvShows,
} from "../utils/tvSlice";
import { MovieSearchEngine } from "../utils/movieSearchEngine";

const GptSearchBar = () => {
  const userSearchText = useRef("");

  const dispatch = useDispatch();
  const nowPlaying = useSelector((store) => store.movies.nowPlayingMovies) || [];
  const popular = useSelector((store) => store.movies.popularMovies) || [];
  const upcoming = useSelector((store) => store.movies.upcomingMovies) || [];
  const topRated = useSelector((store) => store.movies.topRatedMovies) || [];

  // TV lists
  const nowPlayingTv = useSelector((store) => store.tvShows?.nowPlayingTvShows) || [];
  const popularTv = useSelector((store) => store.tvShows?.popularTvShows) || [];
  const topRatedTv = useSelector((store) => store.tvShows?.topRatedTvShows) || [];


  const MOVIES = [...nowPlaying, ...popular, ...upcoming, ...topRated].filter(
    (v, i, a) => v && a.findIndex((t) => t.id === v.id) === i
  );


  const TVS = [...nowPlayingTv, ...popularTv, ...topRatedTv].filter(
    (v, i, a) => v && a.findIndex((t) => t.id === v.id) === i
  );

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

  const handleMovieSearch = async () => {
    const query = (userSearchText.current.value || '').trim();
    if (!query || !engineRef.current) return;

    // If TV lists are empty, populate them before searching
    if (!TVS || TVS.length === 0) {
      try {
        const nowResp = await fetch(
          `https://api.themoviedb.org/3/tv/on_the_air?api_key=${TMDB_API_KEY}`,
          API_OPTIONS
        );
        const nowData = await nowResp.json();
        dispatch(addNowPlayingTvShows(nowData?.results || []));
        try {
          localStorage.setItem('now-playing-tv-shows', JSON.stringify(nowData?.results || []));
        } catch (e) {}

        const popResp = await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API_KEY}`,
          API_OPTIONS
        );
        const popData = await popResp.json();
        dispatch(addPopularTvShows(popData?.results || []));
        try {
          localStorage.setItem('popular-tv-shows', JSON.stringify(popData?.results || []));
        } catch (e) {}

        const topResp = await fetch(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=${TMDB_API_KEY}`,
          API_OPTIONS
        );
        const topData = await topResp.json();
        dispatch(addTopRatedTvShows(topData?.results || []));
        try {
          localStorage.setItem('top-rated-tv-shows', JSON.stringify(topData?.results || []));
        } catch (e) {}
      } catch (e) {
        console.error('Error populating TV lists for GPT search', e);
      }
    }

    try {
      const resMovies = await engineRef.current.search(query, MOVIES, {
        topK: 10,
        minSimilarity: 0.05,
      });

      const resTv = await engineRef.current.search(query, TVS, {
        topK: 10,
        minSimilarity: 0.05,
      });


      const moviesStyle = { results: resMovies.map((r) => r.movie) };
      const tvStyle = { results: resTv.map((r) => r.movie) };

      dispatch(
        addGptSuggestedMovies({
          movies: moviesStyle,
          tv: tvStyle,
          gptMovieResults: [query],
        })
      );
    } catch (e) {
      console.error('Local search error', e);
    }
  };



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
      </form>
      
    </div>
  );
};

export default GptSearchBar;
