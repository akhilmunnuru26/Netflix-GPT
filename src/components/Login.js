import { useState,useRef } from "react"
import Header from "./Header"

import { checkValid } from "../utils/validate"

const Login = () => {
    const [isSignInForm,setIsSignInForm] = useState(true)
    const email = useRef(null)
    const password = useRef(null)

    const toggleSignForm = () => {
        setIsSignInForm(!isSignInForm)
    }

    const handleButtonClick = () => {
        console.log(email.current.value)
        console.log(password.current.value)
        const message = checkValid(email.current.value,password.current.value)
        console.log(message)
    }

    return(
        <div >
            <Header/>
            <div className="absolute">
            <img
                src="https://assets.nflxext.com/ffe/siteui/vlv3/c906271d-7184-4eec-83c9-b6d4c1a068ec/728874a6-eeda-400a-9bcf-a935a1408a4f/IN-en-20231127-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                alt="bg-logo"
            /></div>
            <form onSubmit={(e) => e.preventDefault()} className="w-4/12 h-auto rounded-lg p-12  bg-black absolute text-white my-40 right-0 left-0 mx-auto bg-opacity-80">
               
                <h1 className="text-2xl mb-4">{isSignInForm ? 'Sign In':'Sign Up'}</h1>
                <div className="mb-4">
                    {!isSignInForm && <input className="w-full rounded-md p-4 my-2 bg-[#333333]" type="text" placeholder="Full Name" />}
                    <input ref={email} className="w-full rounded-md p-4 my-2 bg-[#333333]" type="text" placeholder="Email Address" />
                    <input ref={password} className="w-full rounded-md p-4 my-2 bg-[#333333]" type="password" placeholder="Password"/>
                </div>
                <button onClick={handleButtonClick} className="w-full p-3 my-4 rounded-md font-semibold text-xl bg-red-500">{isSignInForm ? 'Sign In':'Sign Up'}</button>
                <p onClick={toggleSignForm} className="hover:underline cursor-pointer">{isSignInForm ? 'New to Netflix? Sign Up now':'Already User? Sign In now'}</p>
            </form>
        </div>
    )
}


export default Login