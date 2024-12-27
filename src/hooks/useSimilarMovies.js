// import { useEffect } from "react";
// import { API_OPTIONS } from "../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { addSimilarMovies } from "../utils/movieSlice";

// const useSimilarMovies = (movie_id) => {

//     useEffect(() => {
//         // !nowPlayingMovies && getNowPLayingMoviesList();
//         getSimilarMoviesList();
//         return (() => {
//             getSimilarMoviesList();
//         })
//     }, []);

//     const similarMovies = useSelector(store => store.movies.similarMovies)

//     const dispatch = useDispatch();

//     const getSimilarMoviesList = async () => {
//         const response = await fetch(
//             `https://api.themoviedb.org/3/movie/${movie_id}/similar?language=en-US&page=1`,
//             API_OPTIONS
//         );
//         const data = await response.json();
//         dispatch(addSimilarMovies(data.results));

//     };
// };

// export default useSimilarMovies;
import { useEffect, useMemo } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addSimilarMovies } from "../utils/movieSlice";

const cacheKey = "similar-movies";

const useSimilarMovies = (movie_id) => {
    const dispatch = useDispatch();
    const similarMovies = useSelector((store) => store.movies.similarMovies);

    const cachedData = useMemo(() => {
        const cachedMovies = localStorage.getItem(`${cacheKey}-${movie_id}`);
        return cachedMovies ? JSON?.parse?.(cachedMovies) : null;
    }, [movie_id]);

    useEffect(() => {
        if (!cachedData) {
            getSimilarMoviesList();
        } else {
            dispatch(addSimilarMovies(cachedData));
        }
    }, [cachedData, dispatch]);

    const getSimilarMoviesList = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movie_id}/similar?language=en-US&page=1`,
            API_OPTIONS
        );
        const data = await response.json();
        dispatch(addSimilarMovies(data?.results));
        localStorage.setItem(`${cacheKey}-${movie_id}`, JSON.stringify(data?.results));
    };
};

export default useSimilarMovies;