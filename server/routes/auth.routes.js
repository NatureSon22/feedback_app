import express from "express";
import {
  googleSignin,
  signIn,
  signOut,
  signUp,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/google", googleSignin);
authRouter.post("/signout", signOut);

export default authRouter;
