import { useState } from "react";
import filter from "../utils/filterfeed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { filterFeedbacksByInteractions } from "../context/slice/feedSlice";

const FilterDropDown = () => {
  const [selectedFilter, setSelectedFilter] = useState(filter[0]);
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFilter = (filter) => {
    setSelectedFilter(filter);
    dispatch(filterFeedbacksByInteractions({ filter, user_id: user._id }));
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        onClick={toggleDropdown}
        className="flex cursor-pointer items-center gap-3 text-white"
      >
        <p className="text-sm">
          Sort by: <span className="ml-2 font-bold">{selectedFilter}</span>
        </p>
        <FontAwesomeIcon
          icon={faAngleDown}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-10 w-[13em] rounded-md bg-white pb-4 pt-2 shadow-xl md:top-14">
          <ul className="flex flex-col justify-center space-y-2 divide-y-2 divide-black/5">
            {filter.map((filter) => (
              <li
                key={filter}
                className="flex items-center justify-between px-5 pt-2 text-gray-darker"
              >
                <button onClick={() => handleFilter(filter)}>{filter}</button>
                {selectedFilter === filter && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-gray-500 text-purple"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropDown;
