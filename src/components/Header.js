import React, { useEffect } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearch } from "../utils/gptSlice";
import { Logo } from "../utils/constants";
import { IoSearchOutline } from "react-icons/io5";
import { SupportedLanguages } from "../utils/constants";
import "./Header.css";
import { changeLanguage } from "../utils/configSlice";
import { BiMoviePlay } from "react-icons/bi";

//https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGpt = useSelector((store) => store.gpt.showGptSearch);
  const lang = useSelector((store) => store.config.lang)
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
        navigate("/browse");
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
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  const handleChangeLanguage = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between align-middle my-0">
      <div className="w-40 my-0">
        <img src={Logo} alt="logo" className="" />
      </div>

      {user && (
        <>
          <div className="my-0 icons-container">
            {showGpt && (
              <select
                onChange={handleChangeLanguage}
                value={lang}
                className="bg-gray-800 mx-2 py-1 px-3 rounded text-white"
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
              className="search-button-container bg-gray-800  mx-2 py-1 px-3 rounded-md text-white hover:opacity-90 cursor-pointer hover:text-opacity-70"
            >
              {showGpt ? (
                <>
                  <BiMoviePlay className=" text-xl mr-2" /> Home
                </>
              ) : (
                <>
                  <IoSearchOutline className=" text-xl mr-2" />
                  GPT Search
                </>
              )}
            </button>

            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ">
                  <img
                    src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
                    alt=""
                    className="w-12 h-12"
                  />
                  <ChevronDownIcon
                    className="-mr-1 h-7 w-7 mt-5 text-lg text-white"
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
                        <a
                          href="#profile"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-fuchsia-100"
                              : "text-fuchsia-100",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Profile
                        </a>
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
