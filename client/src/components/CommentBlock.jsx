import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeComment, removeCommentReply } from "../context/slice/feedSlice";
import axios from "axios";

const CommentBlock = ({
  profilePic,
  username,
  email,
  comment,
  handleSetUserReply,
  _id,
  parentId,
  user_id,
  isReply,
  selectCommentToEdit,
}) => {
  const { feed_id } = useSelector((state) => state.feedbacks.selectedFeedback);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClickReply = () => {
    handleSetUserReply({
      username,
      email,
      feed_id: _id,
      parent_id: parentId,
    });
  };

  const handleClickToUpdate = () => {
    selectCommentToEdit({
      username,
      comment,
      parentId,
      comment_id: _id,
      isReply,
    });
  };

  const handleDelete = async () => {
    try {
      let id = {};
      if (isReply) {
        dispatch(removeCommentReply({ comment_id: parentId, reply_id: _id }));
        id = { comment_id: _id, parent_id: parentId };
      } else {
        dispatch(removeComment({ comment_id: _id }));
        id = { comment_id: _id };
      }

      await axios.delete(`/api/comment/${feed_id}`, {
        data: id,
      });

      console.log("Comment deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="scrollbar-thin scrollbar-thumb-purple scrollbar-track-gray grid h-32 py-5 sm:py-6">
      <div className="space-y-4 text-[0.9rem] text-gray-darkest">
        <div className="flex items-center justify-between gap-5 sm:gap-8">
          <div className="size-10 overflow-hidden rounded-full">
            <img
              className="h-full min-w-full object-cover"
              src={profilePic}
              alt={username}
            />
          </div>

          <div className="mr-auto">
            <p className="text-base font-bold">{username}</p>
            <p className="text-gray-darker">{email}</p>
          </div>

          <div className="flex flex-col items-center gap-5 sm:flex-row">
            {user._id === user_id && (
              <div className="relative">
                <div
                  className="cursor-pointer rounded-md bg-gray px-3"
                  onClick={() => setShow(!show)}
                >
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>

                {show && (
                  <div className="absolute right-0 flex translate-y-1 gap-4 rounded-md bg-white px-4 py-2 shadow-md sm:left-0 sm:right-auto">
                    <p
                      className="cursor-pointer text-[0.85rem] text-blue"
                      onClick={handleClickToUpdate}
                    >
                      Edit
                    </p>
                    <p
                      className="cursor-pointer text-[0.85rem] text-red-500"
                      onClick={handleDelete}
                    >
                      Delete
                    </p>
                  </div>
                )}
              </div>
            )}

            <p
              className="cursor-pointer font-bold text-blue"
              onClick={handleClickReply}
            >
              Reply
            </p>
          </div>
        </div>

        <div className="sm:pl-[4.5rem]">
          <p className="text-gray-darker">{comment}</p>
        </div>
      </div>
    </div>
  );
};

CommentBlock.propTypes = {
  profilePic: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  handleSetUserReply: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  parentId: PropTypes.string,
  user_id: PropTypes.string.isRequired,
  isReply: PropTypes.bool.isRequired,
  selectCommentToEdit: PropTypes.func.isRequired,
};

export default CommentBlock;
