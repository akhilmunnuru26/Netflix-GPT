import React, { useEffect, useRef } from "react";
import { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser} from "../utils/userSlice";
import { toggleGptSearch } from "../utils/gptSlice";
import {toggleShowMovies,toggleProfile, addClickedMovie, addSearchedMovieInput} from '../utils/movieSlice'
import { Logo } from "../utils/constants";
import { IoSearchOutline } from "react-icons/io5";
import { SupportedLanguages } from "../utils/constants";
import "./Header.css";
import { changeLanguage } from "../utils/configSlice";
import { BiMoviePlay } from "react-icons/bi";
import { addNowPlayingTvShows } from "../utils/tvSlice";
import { MdLocalMovies } from "react-icons/md";
import useSearchedMovies from "../hooks/useSearchMovies";
//https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user?.user);
  const showGpt = useSelector((store) => store.gpt.showGptSearch);
  const lang = useSelector((store) => store.config.lang);
  const showMovieSlice = useSelector((store) => store.movies)
  const showMovies = showMovieSlice.showMovies
  const showProfile = showMovieSlice.showProfile
  const searchInput = useRef()
  const searchedMovies = useSearchedMovies()

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        
        
        
        
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGptSearch = () => {
    dispatch(toggleGptSearch());
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(removeUser());
        
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  const handleShowMovies = () => {
    // if (!showMovies) {
    //   dispatch(addNowPlayingTvShows(null));
    // }

    navigate("/browse")
    dispatch(toggleShowMovies())
    dispatch(addClickedMovie(null));
    
  }

  const handleShowProfile = () => {
    dispatch(toggleProfile())
    
      navigate("/browse/profile")
      
    
  }

  const handleCloseProfile = () => {
    dispatch(toggleProfile())

    navigate("/browse")


  }

  const handleTvShows= () => {
    // if (!showMovies) {
    //   dispatch(addNowPlayingTvShows(null));
    // }
  dispatch(addClickedMovie(null));
    // navigate("/browse/Tv");
    dispatch(toggleShowMovies());
  };

  const handleMovieSearch = (e) => {
    e.preventDefault()
    // const searchValue = searchInput.current.value;
    
    // dispatch(addSearchedMovieInput(searchValue))
    // Use the searchValue as needed
    // console.log(searchValue);
  }


  const handleChangeLanguage = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

// console.log("Search INput Ref",searchInput?.current?.value)

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10  flex  flex-row justify-between align-middle my-0">
      <div className="flex align-middle">
        <div className="w-20 md:w-40 md:my-0 ">
          <img src={Logo} alt="logo" className="" />
        </div>
      </div>

      {user && (
        <>
          <div className="my-0 icons-container">
            {(
              <>
                { (
                  <>

                    <form className="flex items-center max-w-sm mx-3">
                      <label htmlFor="simple-search" className="sr-only">Search</label>
                      <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
                          
                          <MdLocalMovies className="text-white"  />
                        </div>
                        <input ref={searchInput} type="text" id="simple-search" className="bg-black border outline-none border-gray-800 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Movie Name..."  />
                      </div>
                      <button onClick={(e) => handleMovieSearch(e)} type="submit" className="p-2.5 ms-2 text-sm font-medium text-white outline-none  bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                      </button>
                    </form>

                    <Link
                      className="rounded-md mx-1 bg-transparent hover:bg-transparent outline-none text-lg cursor-pointer relative"
                      to="/browse"
                      onClick={handleShowMovies}
                    >
                      <button className="rounded p-2 bg-transparent hover:bg-transparent outline-none">
                        <h1 className="text-white relative hover:text-opacity-60 before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 before:border-b-2 before:border-transparent before:transition before:duration-300 before:ease-in-out before:scale-x-0 hover:text-white hover:before:border-red-500 hover:before:scale-x-100  transition duration-300 ease-in-out">
                          Movies
                        </h1>
                      </button>
                    </Link>

                    <Link
                      className="mx-2  rounded-md bg-transparent hover:bg-transparent outline-none text-lg cursor-pointer relative"
                      to="/browse/Tv"
                      onClick={handleTvShows}
                    >
                      <button className="rounded p-2 bg-transparent hover:bg-transparent outline-none">
                        <h1 className="text-white hover:text-opacity-60 p-0 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 before:border-b-2 before:border-transparent before:transition before:duration-300 before:ease-in-out before:scale-x-0 hover:text-white hover:before:border-red-500 hover:before:scale-x-100  transition duration-300 ease-in-out">
                          Tv Shows
                        </h1>
                      </button>
                    </Link>
                  </>
                  
                  


                    
                  
                )}
                
                { }
                {showGpt && (
                  <select
                    onChange={handleChangeLanguage}
                    value={lang}
                    className="bg-gray-800  md:mx-1 md:py-1 md:px-3 rounded text-white"
                  >
                    {SupportedLanguages.map((lang) => (
                      <option key={lang.identifier} value={lang.identifier}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                )}
                
                <button
                  onClick={handleGptSearch}
                  className="search-button-container invisible md:visible md:text-lg text-sm bg-transparent  md:mx-2 md:py-2 md:px-3 rounded-md text-white hover:opacity-90 cursor-pointer hover:text-opacity-70 relative"
                >
                  {showGpt ? (
                    <>
                      {/* <BiMoviePlay className=" text-sm md:text-xl mr-2" /> */}
                      <span className="relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 before:border-b-2 before:border-transparent before:transition before:duration-300 before:ease-in-out before:scale-x-0 hover:before:border-red-500 hover:before:scale-x-100">
                        Home
                      </span>
                    </>
                  ) : (
                    <>
                      <IoSearchOutline className="text-sm md:text-xl mr-2" />
                      <span className="relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 before:border-b-2 before:border-transparent before:transition before:duration-300 before:ease-in-out before:scale-x-0 hover:before:border-red-500 hover:before:scale-x-100">
                        GPT Search
                      </span>
                    </>
                  )}
                </button>
              </>
            )}
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ">
                  <img
                    src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
                    alt=""
                    className="md:w-12 md:h-12 w-5 h-5"
                  />
                  <ChevronDownIcon
                    className="-mr-1 h-4 mt-2 -ml-1 md:h-7 Md:w-7 md:mt-5 md:text-lg text-sm text-white"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y  divide-gray-100 rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <>
                        
                          {!showProfile && <Link to="/browse/profile">
                            <a
                              href=""
                              // onClick={() =>
                              //   handleShowProfile

                              // }
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-fuchsia-100"
                                  : "text-fuchsia-100",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Profile
                            </a>
                          </Link> }
                          {showProfile && <a
                            href=""
                            onClick={() =>
                              handleCloseProfile

                            }
                            className={classNames(
                              active
                                ? "bg-gray-100 text-fuchsia-100"
                                : "text-fuchsia-100",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Home
                          </a>}
                        </>
                        
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#about"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-fuchsia-100"
                              : "text-fuchsia-100",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          About
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#signout"
                          onClick={handleSignOut}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-fuchsia-100"
                              : "text-fuchsia-100",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Signout
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
