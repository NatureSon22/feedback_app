import { useEffect } from "react";
import FeedBar from "./FeedBar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getFeedbacks } from "../context/slice/feedSlice";

const FeedSlider = () => {
  const feedbacks = useSelector((state) => state.feedbacks.feedbacks);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllFeedBacks = async () => {
      try {
        const res = await axios.get("/api/feedback");
        dispatch(getFeedbacks(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    getAllFeedBacks();
  }, []);

  return (
    <div>
      <div className="grid place-items-center gap-4 bg-gray px-5 py-10 md:px-0 lg:py-7">
        {feedbacks.map((feed) => {
          return <FeedBar key={feed._id} {...feed}></FeedBar>;
        })}
      </div>
    </div>
  );
};

export default FeedSlider;
