import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { selectFeedback } from "../context/slice/feedSlice";
import { useNavigate } from "react-router-dom";
import FeedBarCard from "./FeedBarCard";
const FeedBar = ({
  _id,
  title,
  description,
  upvoters,
  categories,
  comments,
  user_id
}) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewFeedback = () => {
    navigate(`/feedback/${_id}`);
    dispatch(
      selectFeedback({
        feed_id: _id,
        user_id: user._id,
        poser_id: user_id,
        title,
        description,
        upvoters,
        categories,
        comments,
      }),
    );
  };

  return (
    <FeedBarCard
      _id={_id}
      title={title}
      description={description}
      upvoters={upvoters}
      categories={categories}
      comments={comments}
      viewFeedback={viewFeedback}
    />
  );
};

FeedBar.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  upvoters: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  user_id: PropTypes.string.isRequired,
};

export default FeedBar;
