import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import FilterFeed from "./FilterFeed";
import UserProfile from "./UserProfile";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const toggle = () => setOpen(false);

    window.addEventListener("resize", toggle);

    return () => window.removeEventListener("resize", toggle);
  }, []);

  const toggle = () => setOpen(!open);

  return (
    <header className="relative w-full md:flex md:justify-between md:gap-10 lg:sticky lg:top-0 lg:max-w-[19em] lg:flex-col lg:gap-7">
      <div className="custom-gradient relative z-30 flex items-center justify-between px-5 py-5 text-white sm:px-8 md:z-0 md:w-[20em] md:items-end md:rounded-lg md:pb-10 md:shadow-md lg:w-full lg:pb-5 lg:pt-20">
        <div>
          <h1 className="text-lg font-bold">Frontend Mentor</h1>
          <p className="text-sm font-light">Feedback Board</p>
        </div>

        <div onClick={toggle} className="md:hidden">
          <FontAwesomeIcon
            className="size-5 cursor-pointer"
            icon={open ? faXmark : faBars}
          />
        </div>
      </div>

      <div
        className={`absolute left-[50%] right-0 z-20 flex w-[80%] max-w-[25em] -translate-x-[50%] flex-col justify-center gap-10 rounded-b-lg bg-white px-10 py-14 shadow-md md:static md:left-0 md:z-0 md:w-full md:max-w-fit md:translate-x-0 md:translate-y-0 md:gap-5 md:bg-gray md:p-0 md:shadow-none dl:flex-row lg:flex-col ${open ? "translate-y-0" : "-translate-y-full"}`}
      >
        <FilterFeed />
        <UserProfile />
      </div>

      {open && (
        <div className="fixed top-0 z-10 min-h-screen w-full bg-overlay"></div>
      )}
    </header>
  );
};

export default NavBar;
