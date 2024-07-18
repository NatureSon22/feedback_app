import mongoose from "mongoose";
import MODEL from "../utils/modelConstants.js";

const feedbackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    upvoters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODEL.USER,
      },
    ],
    categories: {
      type: Array,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL.USER,
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODEL.COMMENT,
      },
    ],
  },
  { timestamps: true }
);

const FeedbackModel = mongoose.model("Feedback", feedbackSchema);
export default FeedbackModel;
