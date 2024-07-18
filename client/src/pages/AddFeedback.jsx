import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FeedForm from "../components/FeedForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { addFeedback } from "../context/slice/feedSlice";

const AddFeedback = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "/api/feedback/",
        { ...data, user_id: user._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      dispatch(addFeedback(res.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FeedForm
      icon={
        <FontAwesomeIcon
          icon={faPlus}
          className="font-bold text-white sm:size-6"
        />
      }
      title="Create New Feedback"
      buttonText="Add Feedback"
      onSubmit={onSubmit}
    />
  );
};

export default AddFeedback;
