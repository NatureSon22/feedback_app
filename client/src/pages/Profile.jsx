import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import zod from "zod";
import axios from "axios";
import { login } from "../context/slice/userSlice";

const schema = zod.object({
  username: zod.string().min(8, "Username must be at least 8 characters"),
  email: zod.string().email("Invalid email address"),
});

const Profile = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(null);
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [profilePic, setProfilePic] = useState(user?.profilePic);
  const imgRef = useRef(null);

  useEffect(() => {
    if (img) {
      handleFileUpload();
    }
  }, [img]);

  const handleExit = () => {
    navigate("/");
  };

  const handleChangeImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
    }
  };

  const handleFileUpload = async () => {
    const storage = getStorage();
    const fileName = new Date().getTime() + img.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, img);

    setLoading("Uploading...");

    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        console.log(error);
        setLoading("Upload failed. Try again.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
          setProfilePic(downloadURL);
          setLoading("Done!");
          setTimeout(() => {
            setLoading(null);
          }, 1000);
        });
      },
    );
  };

  const onSubmit = async (data) => {
    try {
      const res = await axios.put(`/api/user/update/${user._id}`, {
        ...data,
        profilePic: imgUrl,
      });
      dispatch(login(res.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-gray py-10">
      <div className="w-[80%] max-w-[37em] space-y-10">
        <div className="flex items-center gap-3">
          <FontAwesomeIcon icon={faAngleLeft} className="text-blue" />
          <p
            className="cursor-pointer text-sm font-bold text-gray-darker"
            onClick={handleExit}
          >
            Go Back
          </p>
        </div>
        <div className="rounded-lg bg-white py-14">
          <form
            className="flex flex-col items-center space-y-10 px-6 sm:px-12"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-3">
              <div className="size-24">
                <input
                  type="file"
                  ref={imgRef}
                  onChange={handleChangeImg}
                  className="hidden"
                  accept="image/*"
                />
                <img
                  src={profilePic}
                  className="h-full w-full cursor-pointer rounded-full border-2 border-purple object-cover"
                  alt={user?.username}
                  onClick={() => imgRef.current.click()}
                />
              </div>
              <p className={`text-center ${loading ? "visible" : "invisible"}`}>
                {loading}
              </p>
            </div>

            <div className="w-full flex-1">
              <div className="grid gap-1">
                <label htmlFor="username" className="text-gray-darker">
                  Username
                </label>
                <div className="grid space-y-1">
                  <input
                    {...register("username")}
                    type="text"
                    id="username"
                    className="w-full rounded-lg bg-gray px-5 py-3 text-gray-darkest focus:outline-blue"
                    defaultValue={user?.username}
                  />
                  <div
                    className={`ml-auto text-sm italic text-red-500 ${errors.username ? "visible" : "invisible"}`}
                  >
                    {errors.username?.message || "error"}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-1">
                <label htmlFor="email" className="text-gray-darker">
                  Email
                </label>
                <div className="grid space-y-1">
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    className="w-full rounded-lg bg-gray px-5 py-3 text-gray-darkest focus:outline-blue"
                    defaultValue={user?.email}
                  />
                  <div
                    className={`ml-auto text-sm italic text-red-500 ${errors.email ? "visible" : "invisible"}`}
                  >
                    {errors.email?.message || "error"}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-1">
                <label htmlFor="password" className="text-gray-darker">
                  Password
                </label>
                <div className="grid space-y-1">
                  <input
                    {...register("password")}
                    type="password"
                    id="password"
                    className="w-full rounded-lg bg-gray px-5 py-3 text-gray-darkest focus:outline-blue"
                  />
                  <div
                    className={`ml-auto text-sm italic text-red-500 ${errors.password ? "visible" : "invisible"}`}
                  >
                    {errors.password?.message || "error"}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="mt-10 w-full rounded-lg bg-blue px-5 py-3 font-bold text-white"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
