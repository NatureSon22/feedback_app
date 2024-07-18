import UserModel from "../model/user.model.js";
import errorHandler from "../utils/errorHandler.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;

const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    let existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw errorHandler(400, "User already exists");
    }

    existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      throw errorHandler(400, "User already exists");
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);

    const user = await UserModel.create({ username, email, password: hash });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: "Strict",
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      throw errorHandler(404, "User not found");
    }

    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
      throw errorHandler(400, "Wrong credentials");
    }

    const { password: _, ...user } = existingUser._doc;
    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: "Strict",
    });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const googleSignin = async (req, res, next) => {
  try {
    const { username, email, profilePic } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("access_token", token, {
        httpOnly: true,
        sameSite: "Strict",
      });
      res.status(200).json(existingUser);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      const hash = await bcrypt.hash(generatePassword, salt);

      const newUser = await UserModel.create({
        username:
          username.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 10000).toString(),
        email,
        password: hash,
        profilePic,
      });
      const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("access_token", token, {
        httpOnly: true,
        sameSite: "Strict",
      });
      res.status(201).json(newUser);
    }
  } catch (error) {
    next(error);
  }
};

const signOut = (req, res) => {
  res.clearCookie("access_token");
  res.json({ success: true });
};

export { signUp, signIn, googleSignin, signOut };
