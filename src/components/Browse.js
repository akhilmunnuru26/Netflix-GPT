import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import GPTSearch from "./GPTSearch";
import { useSelector } from "react-redux";
// import TvPage from "./TvPage";
import useNowPlayingTvShows from "../hooks/useNowPlayingTvShows";
import TvPageMainCointainer from "./TvPage";
import TvShowSecondary from "./TvShowSecondary";
import usePopularTvShows from "../hooks/usePopularTvShows";
import useTopRatedTvShows from "../hooks/useTopRatedTvShows";
import Profile from "./Profile";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMovies();
  useTopRatedMovies();
  useNowPlayingTvShows();
  usePopularTvShows();
  useTopRatedTvShows();

  const showGpt = useSelector((store) => store.gpt.showGptSearch);
  const movies = useSelector((store) => store.movies);
  const showMovies = movies.showMovies
  const showProfile = movies.showProfile
  
  return (
    <div>
      <Header />
      {showProfile ? (
        <Profile />
      ) : (
        <>
          {showGpt ? (
            <GPTSearch />
          ) : (
            <>
              {showMovies ? (
                <>
                  <MainContainer />
                  <SecondaryContainer />
                </>
              ) : (
                <>
                  <TvPageMainCointainer />
                  <TvShowSecondary />
                </>
              )}
            </>
          )}
          <div className="">
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default Browse;
