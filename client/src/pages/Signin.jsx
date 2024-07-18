import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../context/slice/userSlice";
import OAuth from "../components/OAuth";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/auth/signin", data);
      dispatch(login(res.data));
      navigate("/");
    } catch (error) {
      setError("root", {
        message: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="scrollbar-thin scrollbar-thumb-purple scrollbar-track-gray grid h-32 min-h-screen place-items-center bg-gray py-10 font-jost">
      <div className="before:custom-gradient-linear relative w-[80%] max-w-[35em] rounded-lg bg-white p-10 shadow-sm before:absolute before:left-0 before:top-0 before:w-full before:rounded-t-md before:p-[0.4em]">
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-[2rem] font-bold text-gray-darkest">Sign In</h1>

          {
            <div className="text-sm font-bold text-red-500">
              <p className={`my-3 ${errors.root ? "visible" : "invisible"}`}>
                {errors.root?.message || "error"}
              </p>
            </div>
          }

          <div className="grid gap-1">
            <label htmlFor="email" className="text-gray-darker">
              Email
            </label>
            <div className="grid space-y-1">
              <input
                {...register("email")}
                type="email"
                id="email"
                className="w-full rounded-lg bg-gray px-5 py-3 text-gray-darkest focus:outline-blue"
              />
              <div
                className={`ml-auto text-sm italic text-red-500 ${errors.email ? "visible" : "invisible"}`}
              >
                {errors.email?.message || "error"}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="password" className="text-gray-darker">
              Password
            </label>
            <div className="grid space-y-1">
              <input
                {...register("password")}
                type="password"
                id="password"
                className="w-full rounded-lg bg-gray px-5 py-3 font-bold text-gray-darkest focus:outline-blue"
              />
              <div
                className={`ml-auto text-sm italic text-red-500 ${errors.password ? "visible" : "invisible"}`}
              >
                {errors.password?.message || "error"}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <button
                className="flex-1 rounded-md bg-blue py-3 font-bold text-white"
                type="submit"
              >
                Sign In
              </button>
              <OAuth />
            </div>
            <p className="text-[0.9rem] text-gray-darker">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-purple">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
