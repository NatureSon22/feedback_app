import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import feedbackRouter from "./routes/feedback.routes.js";
import commentRouter from "./routes/comment.routes.js";
import http from "http";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "https://feedbackback-mern.netlify.app", // Use environment variable for frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));

// Route setup
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/comment", commentRouter);

// Global error handler
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  console.error("Global error handler:", error); // Log the error
  res.status(status).json({
    status,
    message,
  });
});

// Socket.IO setup
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("join", (feed_id) => {
    socket.join(feed_id);
  });

  socket.on("message", ({ feed_id, message }) => {
    io.to(feed_id).emit("message", message);
  });

  socket.on("typing", (data) => {
    const { feed_id, user } = data;
    socket.to(feed_id).emit("typing", user);
  });

  socket.on("reply", ({ feed_id, comment_id, reply }) => {
    socket.to(feed_id).emit("reply", { ...reply, comment_id });
  });

  socket.on("replying", (data) => {
    const { comment_id, feed_id } = data;
    socket.to(feed_id).emit("replying", comment_id);
  });

  socket.on("leave", (feed_id) => {
    socket.leave(feed_id);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const setup = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI, {
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log("Connected to MongoDB");

    server.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error("Error setting up server:", error);
    process.exit(1); // Exit the process if unable to connect to the database
  }
};

setup();
