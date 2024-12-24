import { useState, useRef } from "react";
import Header from "./Header";

import { checkValid } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";

import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Background_logo } from "../utils/constants";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const user = useSelector(store => store?.user?.user)
  const email = useRef("");
  const password = useRef("");
  const fullName = useRef("");
  const navigate = useNavigate()

  const dispatch = useDispatch();
  if (user) {
    return <Navigate to="/browse" replace />;
  }

  const toggleSignForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    const message = checkValid(
      email.current?.value,
      password.current?.value,
      fullName.current?.value
    );
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      //Sign Up Logic

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log("Sign up user creds ", user);
          updateProfile(auth.currentUser, {
            displayName: fullName.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // Profile updated!

              // ...
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
              // ...
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      //Sign In Logic
     
      
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Sign In user creds ", user);
          navigate("/browse")
          

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          console.log("Sign In error Message ", errorCode, errorMessage);
        });
    }
  };



  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={Background_logo}
          alt="bg-logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-4/12 h-auto rounded-lg p-12  bg-black absolute text-white my-40 right-0 left-0 mx-auto bg-opacity-80"
      >
        <h1 className="text-3xl font-semibold mb-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <div className="mb-4">
          {!isSignInForm && (
            <input
              ref={fullName}
              className="w-full rounded-md p-4 my-2 bg-[#333333]"
              type="text"
              placeholder="Full Name"
            />
          )}
          <input
            ref={email}
            className="w-full rounded-md p-4 my-2 bg-[#333333]"
            type="text"
            placeholder="Email Address"
          />
          <input
            ref={password}
            className="w-full rounded-md p-4 my-2 bg-[#333333]"
            type="password"
            placeholder="Password"
          />
        </div>
        <p className="text-red-600 text-lg">{errorMessage}</p>
        <button
          onClick={handleButtonClick}
          className="w-full p-3 my-5 rounded-md font-semibold text-xl bg-red-500"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p onClick={toggleSignForm} className="my-3">
          <span className="text-[#737373] text-lg">
            {isSignInForm ? "New to Netflix? " : "Already User? "}
          </span>
          <span className="text-white hover:underline cursor-pointer">
            {isSignInForm ? "Sign up now" : "Sign In now"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
