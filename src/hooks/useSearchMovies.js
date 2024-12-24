// import { useEffect } from "react";
// import { API_OPTIONS } from "../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { addSearchedMovies } from "../utils/movieSlice";

// const useSearchedMovies = (searchMovieInput) => {

//     useEffect(() => {
//         // !nowPlayingMovies && getNowPLayingMoviesList();
//         getSearchedMoviesList();
//         return (() => {
//             getSearchedMoviesList();
//         })
//     }, []);

//     // const searchedMovies = useSelector(store => store.movies.searchedMovies)
//     // const searchMovieInput = useSelector(store => store.movies.searchMovieInput)

//     const dispatch = useDispatch();

//     const getSearchedMoviesList = async () => {
//         const response = await fetch(
//             `https://api.themoviedb.org/3/search/${searchMovieInput}?include_adult=false&language=en-US&page=1`,
//             API_OPTIONS
//         );
//         const data = await response.json();
//         console.log("Searched Movies",data)
//         dispatch(addSearchedMovies(data.results));

//     };
// };

// export default useSearchedMovies;
import { useEffect, useMemo } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addSearchedMovies } from "../utils/movieSlice";

const cacheKey = "searched-movies";

const useSearchedMovies = (searchMovieInput) => {
    const dispatch = useDispatch();
    const searchedMovies = useSelector((store) => store.movies.searchedMovies);

    const cachedData = useMemo(() => {
        const cachedMovies = localStorage.getItem(`${cacheKey}-${searchMovieInput}`);
        return cachedMovies ? JSON.parse(cachedMovies) : null;
    }, [searchMovieInput]);

    useEffect(() => {
        if (!cachedData) {
            getSearchedMoviesList(searchMovieInput);
        } else {
            dispatch(addSearchedMovies(cachedData));
        }
    }, [cachedData, searchMovieInput, dispatch]);

    const getSearchedMoviesList = async (searchMovieInput) => {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${searchMovieInput}&include_adult=false&language=en-US&page=1`,
            API_OPTIONS
        );
        const data = await response.json();
        console.log("Searched Movies", data);
        dispatch(addSearchedMovies(data.results));
        localStorage.setItem(`${cacheKey}-${searchMovieInput}`, JSON.stringify(data.results));
    };
};

export default useSearchedMovies;