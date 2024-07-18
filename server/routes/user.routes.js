import express from "express";
import { getAllUsers, updateUser } from "../controllers/user.controller.js";
import verifyUser from "../utils/verifyUser.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.put("/update/:id", verifyUser, updateUser);

export default userRouter;
