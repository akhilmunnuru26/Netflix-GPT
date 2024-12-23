import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addSimilarMovies } from "../utils/movieSlice";

const useSimilarMovies = (movie_id) => {

    useEffect(() => {
        // !nowPlayingMovies && getNowPLayingMoviesList();
        getSimilarMoviesList();
        return (() => {
            getSimilarMoviesList();
        })
    }, []);

    const similarMovies = useSelector(store => store.movies.similarMovies)

    const dispatch = useDispatch();

    const getSimilarMoviesList = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movie_id}/similar?language=en-US&page=1`,
            API_OPTIONS
        );
        const data = await response.json();
        dispatch(addSimilarMovies(data.results));

    };
};

export default useSimilarMovies;
