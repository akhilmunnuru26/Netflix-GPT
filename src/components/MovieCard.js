import { MOVIES_URL } from "../utils/constants"


const MovieCard = ({posterPath}) => {
  return (
    <div className="w-36 pr-4">
        <img
            src={MOVIES_URL + posterPath}
            alt={`${posterPath}`}
        />
    </div>
  )
}

export default MovieCard