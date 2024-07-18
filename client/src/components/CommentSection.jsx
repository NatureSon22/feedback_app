import { Fragment, useEffect, useState } from "react";
import CommentBlock from "./CommentBlock";
import socket from "../socket/socket";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { handleReplying, handleReplyToComment } from "../socket/socketHandler";
import axios from "axios";
import {
  addCommentReply,
  addSelectedFeedbackComment,
  getSelectedFeedbackComments,
  selectComment,
} from "../context/slice/feedSlice";

const CommentSection = () => {
  const user = useSelector((state) => state.user.user);
  const feedback = useSelector((state) => state.feedbacks.selectedFeedback);
  const feedComments = useSelector(
    (state) => state.feedbacks.selectedFeedbackComments,
  );
  const selectedCommentId = useSelector(
    (state) => state.feedbacks.selectedCommentId,
  );
  const dispatch = useDispatch();
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [userReply, setUserReply] = useState({});
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const [addingReply, setAddingReply] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(`/api/comment/${feedback.feed_id}`);
        console.log(res.data);
        dispatch(getSelectedFeedbackComments(res.data));
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    getComments();
  }, []);

  useEffect(() => {
    socket.on("typing", (data) => {
      setAddingComment(data !== null);
    });

    socket.on("message", (message) => {
      dispatch(addSelectedFeedbackComment(message));
      setAddingComment(false);
    });

    socket.on("replying", (comment_id) => {
      setAddingReply(comment_id);
    });

    socket.on("reply", (data) => {
      dispatch(addCommentReply(data));
    });

    return () => {
      socket.off("typing");
      socket.off("message");
      socket.off("reply");
      socket.off("replying");
    };
  }, []);

  const handleReplyChange = (e) => {
    const initialPart = `${userReply.username}, `;
    const newComment = e.target.value.startsWith(initialPart)
      ? e.target.value
      : initialPart + e.target.value.slice(e.target.value.indexOf(",") + 1);
    const emptyReply = newComment === initialPart;

    setComment(newComment);

    if (emptyReply) {
      handleReplying(feedback.feed_id, selectedCommentId, false);
    } else {
      handleReplying(feedback.feed_id, selectedCommentId, true);
    }
  };

  const cancelComment = () => {
    setComment("");
    setShowReplyBox(false);
    handleReplying(feedback.feed_id, selectedCommentId, false);
  };

  const handleSetUserReply = (data) => {
    setUserReply(data);
    setComment(`${data.username}, `);
    setShowReplyBox(true);
    dispatch(selectComment(data.parent_id));
  };

  const handleReply = () => {
    if (comment) {
      const newComment = {
        _id: crypto.randomUUID(),
        username: user.username,
        email: user.email,
        comment,
        replies: [],
        profilePic: user.profilePic,
      };

      setComment("");
      setShowReplyBox(false);
      dispatch(
        addCommentReply({
          comment_id: selectedCommentId,
          user_id: user._id,
          ...newComment,
        }),
      );
      handleReplyToComment(feedback.feed_id, selectedCommentId, newComment);
      handleReplying(feedback.feed_id, selectedCommentId, false);
      reply(comment);
    }
  };

  const reply = async (comment) => {
    try {
      await axios.post(`/api/comment/${feedback.feed_id}`, {
        comment,
        parent_id: selectedCommentId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-lg bg-white px-5 pb-7 pt-5 sm:p-8 sm:pt-5 md:px-10">
      <div className="mb-4 divide-y-2 divide-gray">
        {feedComments?.length === 0 && !loading ? (
          <p className="mt-4 text-center text-gray-darker">
            No comments yet...
          </p>
        ) : (
          <>
            {feedComments.map((comment) => (
              <Fragment key={comment._id}>
                <CommentBlock
                  {...comment}
                  parentId={comment._id}
                  isReply={false}
                  handleSetUserReply={handleSetUserReply}
                />

                <div className="grid border-none">
                  <div className="max-h-[20em] scroll-m-4 overflow-y-scroll pl-[2rem] pr-4 sm:pl-[4.5rem]">
                    {comment?.replies.map((reply) => (
                      <CommentBlock
                        key={reply._id}
                        {...reply}
                        parentId={comment._id}
                        isReply={true}
                        handleSetUserReply={handleSetUserReply}
                      />
                    ))}
                  </div>
                  {addingReply === comment._id && (
                    <div className="mb-2 ml-4 mr-auto flex scale-[0.65] items-center gap-3 sm:ml-7">
                      <p className="text-gray-darker">Someone is commenting</p>
                      <Spinner size="size-2" />
                    </div>
                  )}
                </div>
              </Fragment>
            ))}
          </>
        )}
      </div>

      {addingComment && (
        <div className="flex items-center gap-3">
          <p className="mt-2 text-gray-darker">Someone is commenting</p>
          <Spinner size="size-2" />
        </div>
      )}

      {showReplyBox && (
        <div className="mt-3 flex flex-col items-start gap-5 sm:flex-row">
          <textarea
            className="w-full resize-none rounded-lg border border-gray bg-gray px-5 py-4 text-[0.9rem] text-gray-darkest focus:border-blue focus:outline-none sm:text-base"
            rows={3}
            value={comment}
            onChange={handleReplyChange}
            placeholder="Write your comment..."
          ></textarea>
          <div className="ml-auto flex flex-row gap-2 sm:flex-col">
            <button
              className="apply-transition cursor-pointer rounded-lg bg-gray-darker px-5 py-2 text-[0.9rem] font-bold text-white hover:bg-gray-darkest sm:w-full"
              onClick={handleReply}
            >
              Comment
            </button>
            <button
              className="apply-transition cursor-pointer rounded-lg bg-gray-darker px-5 py-2 text-[0.9rem] font-bold text-white hover:bg-gray-darkest sm:w-full"
              onClick={cancelComment}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
