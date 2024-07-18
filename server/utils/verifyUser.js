import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import errorHandler from "./errorHandler.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const verifyUser = (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        throw errorHandler(401, "Invalid token");
      }

      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export default verifyUser;
