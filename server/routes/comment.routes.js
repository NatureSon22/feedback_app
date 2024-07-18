import express from "express";
import { addComment, deleteComment, getComments } from "../controllers/comment.controller.js";
import verifyUser from "../utils/verifyUser.js";

const commentRouter = express.Router();

commentRouter.get("/:id", verifyUser, getComments);
commentRouter.post("/:id", verifyUser, addComment);
commentRouter.delete("/:id", verifyUser, deleteComment);

export default commentRouter;
