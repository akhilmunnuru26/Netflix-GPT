
import  { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import language from "../utils/languageConstants";
import {
  searchStarted,
  searchSucceeded,
  searchFailed,
  clearSearch,
} from '../utils/movieSearchSlice';
import { MovieSearchEngine } from '../utils/movieSearchEngine';
// import { MOVIES } from '../data/movies'; 

const MovieSearch = () => {
  const dispatch = useDispatch();
  const MOVIES = useSelector((state) => state.movies.nowPlayingMovies || []);
  const { results, isLoading, error, query } = useSelector(
    (state) => state.movieSearchEngine
  );

  const [localQuery, setLocalQuery] = useState('');
  const [engineReady, setEngineReady] = useState(false);
  const engineRef = useRef(null);
const langKey = useSelector((store) => store.config.lang);
  // one-time init
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const engine = new MovieSearchEngine();
        await engine.initialize();
        console.log("Engine Initialized",engine);
        await engine.cacheMovies(MOVIES);
        if (!cancelled) {
          engineRef.current = engine;
          setEngineReady(true);
        }
      } catch (e) {
        console.error('Engine init error', e);
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const q = localQuery.trim();
    if (!q || !engineRef.current) return;

    dispatch(searchStarted(q));

    try {
      const res = await engineRef.current.search(q, MOVIES, {
        topK: 10,
        minSimilarity: 0.05, // Much lower threshold for results
        // Remove language filter - TMDB data doesn't have this field
      });
      dispatch(searchSucceeded(res));
    } catch (err) {
      dispatch(searchFailed(err?.message || 'Search failed'));
    }
  };

  console.log("results",results)

  return (
    <div className="p-6">
      <h1>Netflix Search (Free, Local, JS + Redux)</h1>

      <form onSubmit={handleSearch}>
        <input
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          
          disabled={!engineReady}
           className="col-span-10 w-[500px] p-3 rounded outline-none"
           placeholder={`${language[langKey].searchPlaceHolder}`}
        />
        <button className="col-span-2 rounded m-1 p-3 bg-blue-700 text-white text-md" type="submit" disabled={!engineReady || isLoading}>
          {isLoading ? 'Searching...' : language[langKey].searchText}
        </button>
        {query && (
          <button className="col-span-2 rounded m-1 p-3 bg-red-700 text-white text-md" type="button" onClick={() => dispatch(clearSearch())}>
            Clear
          </button>
        )}
      </form>

      {!engineReady && <p>Loading AI model (first time only)...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {results.map((r, i) => (
          <li key={r.movie.id}>
            #{i + 1} {r.movie.title} – {(r.score * 100).toFixed(0)}% match
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieSearch;