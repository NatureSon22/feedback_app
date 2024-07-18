import express from "express";
import {
  addFeedback,
  deleteFeedback,
  getFeedBacks,
  updateFeedback,
  voteFeedback,
} from "../controllers/feedback.controller.js";
import verifyUser from "../utils/verifyUser.js";

const feedbackRouter = express.Router();

feedbackRouter.get("/", verifyUser, getFeedBacks);
feedbackRouter.post("/", verifyUser, addFeedback);
feedbackRouter.put("/:id", verifyUser, updateFeedback);
feedbackRouter.patch("/:id/vote", verifyUser, voteFeedback);
feedbackRouter.delete("/:id", verifyUser, deleteFeedback);

export default feedbackRouter;
