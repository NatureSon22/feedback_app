import debounce from "lodash/debounce";
import socket from "./socket";

export const joinComment = (feed_id, isJoining) => {
  socket.emit("join", feed_id);

  if (!isJoining) {
    socket.emit("leave", feed_id);
  }
};

export const handleNewMessage = (feed_id, message) => {
  socket.emit("message", { feed_id, message });
};

export const handleReplyToComment = (feed_id, comment_id, reply) => {
  socket.emit("reply", { feed_id, comment_id, reply });
};

export const handleCommenting = debounce((feedbackId, userId, isTyping) => {
  if (isTyping) {
    socket.emit("typing", { feed_id: feedbackId, user: userId });
  } else {
    socket.emit("typing", { feed_id: feedbackId, user: null });
  }
}, 300);

export const handleReplying = debounce((feedId, commentId, isReplying) => {
  if (isReplying) {
    socket.emit("replying", { feed_id: feedId, comment_id: commentId });
  } else {
    socket.emit("replying", { feed_id: feedId, comment_id: null });
  }
}, 300);
