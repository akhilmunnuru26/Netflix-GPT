
// import { useEffect, useMemo } from "react";
// import { API_OPTIONS } from "../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { addSearchedMovies } from "../utils/movieSlice";

// const cacheKey = "searched-movies";

// const useSearchedMovies = (searchMovieInput) => {
//     const dispatch = useDispatch();
//     // const searchedMovies = useSelector((store) => store.movies.searchedMovies);

//     const cachedData = useMemo(() => {
//         const cachedMovies = localStorage.getItem(`${cacheKey}-${searchMovieInput}`);
//         return cachedMovies ? JSON?.parse?.(cachedMovies) : null;
//     }, [searchMovieInput]);

//     useEffect(() => {
//         if (!cachedData) {
//             getSearchedMoviesList(searchMovieInput);
//         } else {
//             dispatch(addSearchedMovies(cachedData));
//         }
//     }, [cachedData, searchMovieInput, dispatch]);

//     const getSearchedMoviesList = async (searchMovieInput) => {
//         const response = await fetch(
//             `https://api.themoviedb.org/3/search/movie?query=${searchMovieInput}&include_adult=false&language=en-US&page=1`,
//             API_OPTIONS
//         );
//         const data = await response.json();
//         console.log("Searched Movies", data);
//         dispatch(addSearchedMovies(data.results));
//         localStorage.setItem(`${cacheKey}-${searchMovieInput}`, JSON.stringify(data.results));
//     };
// };

// export default useSearchedMovies;


// import { useEffect, useMemo,useState } from "react";
// import { API_OPTIONS} from "../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { addSearchedMovies } from "../utils/movieSlice";

// const cacheKey = "searched-movies";

// const useSearchedMovies = (searchMovieInput) => {
//     const dispatch = useDispatch();
//     const [searchedMovies, setSearchedMovies] = useState([]);
//     const [error, setError] = useState(null);

//     const cachedData = useMemo(() => {
//         if (!searchMovieInput) return null;
//         const cachedMovies = localStorage.getItem(`${cacheKey}-${searchMovieInput}`);
//         return cachedMovies ? JSON.parse(cachedMovies) : null;
//     }, [searchMovieInput]);

//     useEffect(() => {
//         if (!cachedData) {
//             getSearchedMoviesList(searchMovieInput);
//         } else {
//             setSearchedMovies(cachedData);
//         }
//     }, [cachedData, searchMovieInput]);

//     const getSearchedMoviesList = async (searchMovieInput) => {
//         try {
//             const response = await fetch(
//                 `https://api.themoviedb.org/3/search/${searchMovieInput}?include_adult=false&language=en-US&page=1`,
//                 API_OPTIONS
//             );
//             const data = await response.json();
//             console.log("Searched Movies", data);
//             setSearchedMovies(data.results);
//             localStorage.setItem(`${cacheKey}-${searchMovieInput}`, JSON.stringify(data.results));
//         } catch (error) {
//             console.error("Error fetching searched movies:", error);
//         }
//     };

//     const handleMovieSearch = (searchInput) => {
//         setSearchedMovies([]);
//         getSearchedMoviesList(searchInput);
//     };

//     return { searchedMovies, handleMovieSearch };
// };

// export default useSearchedMovies;




import { useEffect, useMemo, useState } from "react";
import { API_OPTIONS, API_KEY } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addSearchedMovies } from "../utils/movieSlice";

const cacheKey = "searched-movies";

const useSearchedMovies = (searchMovieInput) => {
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState(searchMovieInput);
    const [searchedMovies, setSearchedMovies] = useState([]);

    const cachedData = useMemo(() => {
        if (!searchInput) return null;
        const cachedMovies = localStorage.getItem(`${cacheKey}-${searchInput}`);
        return cachedMovies ? JSON.parse(cachedMovies) : null;
    }, [searchInput]);

    useEffect(() => {
        if (!cachedData) {
            getSearchedMoviesList(searchInput);
        } else {
            setSearchedMovies(cachedData);
        }
    }, [cachedData, searchInput]);

    const getSearchedMoviesList = async (searchMovieInput) => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/${searchMovieInput}?include_adult=false&language=en-US&page=1`,
                API_OPTIONS
            );
            const data = await response.json();
            dispatch(addSearchedMovies(data.results));
            localStorage.setItem(`${cacheKey}-${searchMovieInput}`, JSON.stringify(data.results));
            setSearchedMovies(data.results);
        } catch (error) {
            console.error("Error fetching searched movies:", error);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        getSearchedMoviesList(searchInput);
    };

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    return {
        searchedMovies,
        handleSearchSubmit,
        handleSearchInputChange,
    };
};

export default useSearchedMovies;