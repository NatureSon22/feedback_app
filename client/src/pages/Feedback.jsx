import { useDispatch, useSelector } from "react-redux";
import CommentBar from "../components/CommentBar";
import CommentSection from "../components/CommentSection";
import FeedBarCard from "../components/FeedBarCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { joinComment } from "../socket/socketHandler";
import { clearSelectedFeedback } from "../context/slice/feedSlice";

const Feedback = () => {
  const feedback = useSelector((state) => state.feedbacks.selectedFeedback);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (feedback) {
      joinComment(feedback.feed_id, true);
    }

    return () => {
      joinComment(feedback.feed_id, false);
    };
  }, []);

  const handleExit = () => {
    navigate("/");
    dispatch(clearSelectedFeedback());
  };

  const handleEditClick = () => {
    navigate(`/edit-feedback/${feedback.feed_id}`);
  };

  return (
    <div className="grid min-h-screen justify-items-center bg-gray py-10 font-jost">
      <div className="w-[90%] max-w-[50em] space-y-10">
        <div className="space-y-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faAngleLeft} className="text-blue" />
              <p
                className="cursor-pointer text-sm font-bold text-gray-darker"
                onClick={handleExit}
              >
                Go Back
              </p>
            </div>

            {feedback.poser_id === user._id && (
              <button
                className="rounded-lg bg-blue px-7 py-2 text-sm font-bold text-white sm:px-10 sm:py-4"
                onClick={handleEditClick}
              >
                Edit Feedback
              </button>
            )}
          </div>
          <FeedBarCard
            _id={feedback.feed_id}
            title={feedback.title}
            description={feedback.description}
            upvoters={feedback.upvoters}
            categories={feedback.categories}
            comments={feedback.comments}
          />
        </div>

        <CommentSection />

        <CommentBar />
      </div>
    </div>
  );
};

export default Feedback;
