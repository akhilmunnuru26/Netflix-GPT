import { useEffect, useMemo, useState } from "react";
import { API_OPTIONS, TMDB_API_KEY } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addSearchedMovies } from "../utils/movieSlice";

const cacheKey = "searched-movies";

const useSearchedMovies = (searchMovieInput) => {
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState(searchMovieInput);
    const [searchedMovies, setSearchedMovies] = useState([]);

    const cachedData = useMemo(() => {
        if (!searchInput) return null;
        const cachedMovies = localStorage.getItem(`${cacheKey}-${searchInput}`);
        if (cachedMovies === null || cachedMovies === undefined || cachedMovies === 'undefined') return null;
        try {
            return JSON.parse(cachedMovies);
        } catch (error) {
            console.error('Error parsing cached searched movies:', error);
            return null;
        }
    }, [searchInput]);

    useEffect(() => {
        if (!cachedData) {
            getSearchedMoviesList(searchInput);
        } else {
            setSearchedMovies(cachedData);
        }
    }, [cachedData, searchInput]);

    const getSearchedMoviesList = async (searchMovieInput) => {
        if (!searchMovieInput) return;
        try {
            // const response = await fetch(
            //     `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
            //         searchMovieInput
            //     )}&include_adult=false&language=en-US&page=1`,
            //     API_OPTIONS
            // );
            const response = await fetch("/api/search");
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