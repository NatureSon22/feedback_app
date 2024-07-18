import { useDispatch } from "react-redux";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase/firebase";
import axios from "axios";
import { login } from "../context/slice/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await axios.post("api/auth/google", {
        username: result.user.displayName,
        email: result.user.email,
        profilePic: result.user.photoURL,
      });
      dispatch(login(res.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      type="button"
      className="flex-1 rounded-md border border-purple py-3 font-bold text-purple"
      onClick={handleGoogleSignIn}
    >
      Google
    </button>
  );
};

export default OAuth;
