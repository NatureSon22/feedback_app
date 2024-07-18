import mongoose from "mongoose";
import MODEL from "../utils/modelConstants.js";

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL.USER,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODEL.COMMENT,
      },
    ],
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("comment", commentSchema);

export default CommentModel;
