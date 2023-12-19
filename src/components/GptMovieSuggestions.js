import { useSelector } from "react-redux"
import MovieList from './MovieList'

const GptMovieSuggestions = () => {
  const {gptSuggestedMovies,gptSearchResults} = useSelector(store => store.gpt)
  if (!gptSearchResults) return null;

  return (
    <div className="bg-black text-white">
      {
        gptSearchResults.map((movie,index) => <MovieList key={movie} title={movie} movies={gptSuggestedMovies[index].results}/> )
      }
    </div>
  )
}

export default GptMovieSuggestions