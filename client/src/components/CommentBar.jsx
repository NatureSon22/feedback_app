import { useState } from "react";
import { useSelector } from "react-redux";
import { handleNewMessage, handleCommenting } from "../socket/socketHandler";
import axios from "axios";

const CommentBar = () => {
  const user = useSelector((state) => state.user.user);
  const feedback = useSelector((state) => state.feedbacks.selectedFeedback);
  const [characters, setCharacters] = useState(255);
  const [comment, setComment] = useState("");

  const handleChangeValue = (value) => {
    setComment(value);
    setCharacters(255 - value.length);
    handleCommenting(feedback.feed_id, user._id, value.length > 0);
  };

  const addComment = () => {
    if (comment.length > 0) {
      setComment("");
      setCharacters(255);
      const newComment = {
        _id: crypto.randomUUID(),
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        comment,
        user_id: user._id,
        replies: [],
      };

      handleNewMessage(feedback.feed_id, newComment);
      handleAddComment(feedback.feed_id, comment);
    }
  };

  const handleAddComment = async (feed_id, comment) => {
    try {
      await axios.post(
        `/api/comment/${feedback.feed_id}`,
        {
          comment: comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-5 rounded-lg bg-white p-7 sm:p-8">
      <p className="text-[0.9rem] font-bold text-gray-darkest sm:text-lg">
        Add Comment
      </p>

      <div>
        <textarea
          rows={4}
          className="w-full resize-none rounded-lg border border-gray bg-gray px-5 py-4 text-[0.9rem] text-gray-darkest focus-within:outline-none focus:border-blue sm:text-base"
          onChange={(e) => handleChangeValue(e.target.value)}
          placeholder="Type your comment here..."
          value={comment}
          maxLength="255"
        ></textarea>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-[0.9rem] text-gray-darker sm:text-base">
          {characters} characters left
        </p>
        <button
          className="apply-transition rounded-lg bg-purple px-7 py-2 text-sm font-bold text-white hover:bg-purple/80 sm:px-8 sm:py-3"
          onClick={addComment}
        >
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default CommentBar;
