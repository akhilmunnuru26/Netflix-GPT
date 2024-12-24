import { Link, useNavigate } from "react-router-dom";
import { Background_logo } from "../utils/constants";
import { useDispatch } from "react-redux";
import { toggleProfile } from "../utils/movieSlice";

const Profile = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const handleBackHomePage = () => {
   
    navigate("/browse")
    dispatch(toggleProfile())
  }  

  return (
    <div className="bg-black -z-50 h-[100vh]   opacity-90 text-white">
      {/* <div  className="absolute bg-black"></div> */}
      <h1 className="text-center pt-[10%] text-4xl ">Who's Watching ?</h1>
      <div className=" mx-auto mt-10 bg-black flex justify-center">
        
          <div onClick={handleBackHomePage} className="mx-5">

            <img
              src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
              alt=""
              className="w-36"
            />
            <p className="text-center text-lg">Peter</p>
          </div>
       
        
        <div onClick={handleBackHomePage} className="mx-5">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt=""
            className="w-36"
          />
          <p className="text-center text-lg">Jane</p>
        </div>
        <div onClick={handleBackHomePage} className="mx-5">
          <img
            src="https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg"
            alt=""
            className="w-36"
          />
          <p className="text-center text-lg">Harry</p>
        </div>
      </div>
    
    </div>
  );
}

export default Profile;
