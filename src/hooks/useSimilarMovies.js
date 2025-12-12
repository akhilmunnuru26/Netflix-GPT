
import { useEffect, useMemo } from "react";
import { API_OPTIONS, TMDB_API_KEY } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addSimilarMovies } from "../utils/movieSlice";

const cacheKey = "similar-movies";

const useSimilarMovies = (movie_id) => {
    const dispatch = useDispatch();
    const similarMovies = useSelector((store) => store.movies.similarMovies);

    const cachedData = useMemo(() => {
        const cachedMovies = localStorage.getItem(`${cacheKey}-${movie_id}`);
        if (cachedMovies === null || cachedMovies === undefined || cachedMovies === 'undefined') return null;
        try {
            return JSON.parse(cachedMovies);
        } catch (error) {
            console.error('Error parsing cached similar movies:', error);
            return null;
        }
    }, [movie_id]);

    // useEffect(() => {
    //     if (!cachedData) {
    //         getSimilarMoviesList();
    //     } else {
    //         dispatch(addSimilarMovies(cachedData));
    //     }
    // }, [cachedData, dispatch]);

    // const getSimilarMoviesList = async () => {
    //     const response = await fetch(
    //         `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
    //         API_OPTIONS
    //     );
    //     const data = await response.json();
    //     dispatch(addSimilarMovies(data?.results));
    //     localStorage.setItem(`${cacheKey}-${movie_id}`, JSON.stringify(data?.results));
    // };
};

export default useSimilarMovies;