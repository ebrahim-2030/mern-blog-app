// imports
import { Button, Select } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {app} from "../firebase";
import {signinSuccess} from "../redux/user/userSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom"
const OAuth = () => {
  // initialize firebase auth with app
  const auth = getAuth(app);
   // redux dispatcher
  const dispatch = useDispatch();
   // react router navigation
  const navigate = useNavigate();

  // handle google login click
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.getCustomParameters({ prompt: "select_account" });

    try {
      // open google signin popup
      const resutlFromGoogle = await signInWithPopup(auth, provider);
      
        // send user data to server
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
          name: resutlFromGoogle.user.displayName,
          email: resutlFromGoogle.user.email,
          googlePhotoUrl: resutlFromGoogle.user.photoURL,
        }),
      })
      const data = await res.json();

      // if login successful, dispatch to redux and navigate
      if(res.ok){
        dispatch(signinSuccess(data));
        navigate("/");
      }
      console.log(resutlFromGoogle);

    } catch (err) {
      console.log(err);
    }
  };
  return (
    // google oauth button
    <Button
      type="button"
      onClick={handleGoogleClick}
      className="from-pink-600 to-orange-400 hover:bg-gradient-to-b  focus:ring-blue-300 focus:ring-1 dark:focus:ring-blue-800 border-2 border-t-[3px] border-orange-400 hover:border-none text-zinc-700 "
      outline
    >
      <AiFillGoogleCircle className=" mr-2 text-xl" />
      Continue with Goolge
    </Button>
  );
};

export default OAuth;
