import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Root = () => {
  return (
    <div className="scrollbar-thin scrollbar-thumb-purple scrollbar-track-gray grid h-32 min-h-screen justify-items-center overflow-y-scroll bg-gray font-jost">
      <div className="flex w-full flex-col items-start md:w-[90%] md:gap-10 md:py-14 lg:max-w-[72em] lg:flex-row">
        <NavBar />
        <div className="flex w-full">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Root;
