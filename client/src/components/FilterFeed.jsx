import { useState } from "react";
import filters from "../utils/filter";
import { useDispatch } from "react-redux";
import { filterFeedbacks } from "../context/slice/feedSlice";
const FilterFeed = () => {
  const [selectedFilter, setSelectedFilter] = useState(0);
  const dispatch = useDispatch();

  const handleFilterClick = (index) => {
    setSelectedFilter(index);
    dispatch(filterFeedbacks(filters[index]));
  };

  return (
    <div>
      <ul className="flex h-full flex-wrap items-center gap-4 sm:justify-center md:rounded-lg md:bg-white md:p-4 lg:justify-start lg:p-7">
        {filters.map((filter, index) => (
          <li
            onClick={() => handleFilterClick(index)}
            key={filter}
            className={`apply-transition cursor-pointer rounded-md px-4 py-2 text-[0.85rem] font-semibold ${selectedFilter == index ? "bg-blue text-white" : "bg-gray text-blue hover:bg-blue/40 hover:text-white"}`}
          >
            {filter}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterFeed;
