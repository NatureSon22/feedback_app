import { faAdd, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterDropDown from "./FilterDropDown";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HeaderFeed = () => {
  const feedback = useSelector((state) => state.feedbacks.feedbacks);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/add-feedback");
  };

  return (
    <div className="sticky top-0 flex items-center justify-between bg-gray-darkest px-5 py-4 sm:px-7 md:rounded-lg md:shadow-xl lg:rounded-lg">
      <div className="flex items-center gap-7 md:gap-10">
        <div className="hidden items-center gap-3 font-bold text-white sm:flex">
          <FontAwesomeIcon icon={faLightbulb} className="size-5" />
          <p>{feedback.length} Suggestions</p>
        </div>
        <FilterDropDown />
      </div>

      <button
        className="apply-transition flex cursor-pointer items-center gap-2 rounded-lg bg-purple px-6 py-3 font-bold text-white hover:bg-white hover:text-purple"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faAdd} />
        <p className="hidden text-sm sm:block">Add Feedback</p>
      </button>
    </div>
  );
};

export default HeaderFeed;
