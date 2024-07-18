import axios from "axios";
import FeedForm from "../components/FeedForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditFeedback = () => {
  const { id } = useParams();
  const selectedFeedback = useSelector(
    (state) => state.feedbacks.selectedFeedback,
  );
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.put(`/api/feedback/${id}`, data);
      navigate(`/feedback/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFeedback = async () => {
    try {
      await axios.delete(`/api/feedback/${id}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FeedForm
      icon={
        <FontAwesomeIcon
          icon={faPencil}
          className="font-bold text-white sm:size-5"
        />
      }
      title="Update Feedback"
      buttonText="Update Feedback"
      onSubmit={onSubmit}
      defaultTitle={selectedFeedback.title}
      defaultDescription={selectedFeedback.description}
      defaultCategories={selectedFeedback.categories}
      exitLink={`/feedback/${id}`}
      DeleteButton={() => (
        <button
          className="rounded-lg bg-red-500 px-7 py-3 font-bold text-white"
          onClick={deleteFeedback}
        >
          Delete
        </button>
      )}
    />
  );
};

export default EditFeedback;
