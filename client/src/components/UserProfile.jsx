import { useDispatch, useSelector } from "react-redux";
import { logout } from "../context/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { rootReducer } from "../context/store";

const UserProfile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickProfile = () => {
    navigate("/profile");
  };

  const handleSignout = () => {
    dispatch(logout());
    rootReducer(undefined, { type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className="md:animated-border w-full space-y-5 sd:px-8 md:mx-auto md:flex md:w-min md:flex-col md:items-center md:justify-center md:space-y-7 md:bg-white md:py-5 lg:w-full lg:px-0 lg:py-7">
      <div className="flex items-center justify-between md:gap-5">
        <div className="size-14 overflow-hidden rounded-full md:size-12">
          <img
            className="h-full w-full object-cover"
            src={user.profilePic}
            alt=""
          />
        </div>

        <div className="leading-4">
          <p className="text-lg font-bold text-gray-darkest md:text-[1.1rem]">
            {user.username}
          </p>
          <p className="text-gray-darker md:text-[0.9rem]">{user.email}</p>
        </div>
      </div>

      <div className="flex justify-between md:gap-5">
        <p
          className="cursor-pointer rounded-md bg-gray-darkest/90 px-5 py-2 text-white"
          onClick={handleClickProfile}
        >
          Profile
        </p>
        <p
          className="cursor-pointer rounded-md bg-red-500/15 px-5 py-2 text-red-500"
          onClick={handleSignout}
        >
          Signout
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
