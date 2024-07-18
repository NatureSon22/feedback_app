import { faAngleUp, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { vote } from "../context/slice/feedSlice";

const FeedBarCard = ({
  _id,
  title,
  description,
  upvoters,
  categories,
  comments,
  viewFeedback,
}) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const checkHasVoted = () => {
    return upvoters.includes(user._id);
  };

  const handleVote = async () => {
    try {
      await axios.patch(`/api/feedback/${_id}/vote`, { user_id: user._id });
      dispatch(vote({ feed_id: _id, user_id: user._id }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md: flex w-full max-w-[40em] flex-wrap items-center justify-between gap-7 rounded-lg bg-white px-5 py-6 sm:items-start sm:gap-10 md:max-w-full md:p-8 lg:flex-nowrap">
      <div className="col-auto w-full space-y-3 sm:flex-1">
        <div className="space-y-2 text-gray-darkest">
          <p
            className={`apply-transition font-bold ${viewFeedback ? "cursor-pointer hover:text-blue" : ""}`}
            onClick={viewFeedback}
          >
            {title}
          </p>
          <p className="text-sm">{description}</p>
        </div>
        <ul className="flex gap-3">
          {categories.map((category) => (
            <li
              key={category}
              className="rounded-lg bg-gray px-4 py-2 text-[0.8rem] font-semibold text-blue"
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`apply-transition flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 font-bold sm:-order-1 sm:flex-col sm:py-3 ${
          checkHasVoted() ? "bg-blue" : "bg-gray hover:bg-blue/25"
        }`}
        onClick={handleVote}
      >
        <FontAwesomeIcon
          icon={faAngleUp}
          className={checkHasVoted() ? "text-white" : "text-blue"}
        />
        <p className={checkHasVoted() ? "text-white" : "text-gray-darkest"}>
          {upvoters.length}
        </p>
      </div>

      <div className="flex cursor-pointer items-center gap-2 px-4 py-2 font-bold sm:my-auto">
        <FontAwesomeIcon icon={faComment} className="text-gray-darker/50" />
        <p className="text-gray-darkest">{comments.length}</p>
      </div>
    </div>
  );
};

FeedBarCard.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  upvoters: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  viewFeedback: PropTypes.func,
};

export default FeedBarCard;
