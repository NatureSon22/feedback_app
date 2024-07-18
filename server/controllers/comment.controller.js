import FeedbackModel from "../model/feedback.model.js";
import CommentModel from "../model/comment.model.js";

const getComments = async (req, res, next) => {
  try {
    const { id } = req.params;

    const feedback = await FeedbackModel.findById(id).populate({
      path: "comments",
      populate: [
        {
          path: "user", // Populate the user field in comments
          select: "username email profilePic", // Select only necessary fields
        },
        {
          path: "replies",
          populate: {
            path: "user", // Populate the user field in replies
            select: "username email profilePic _id", // Select only necessary fields
          },
        },
      ],
    });

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    const comments = feedback.comments.map((comment) => {
      return {
        _id: comment._id,
        user_id: comment.user._id,
        comment: comment.comment,
        username: comment.user.username,
        email: comment.user.email,
        profilePic: comment.user.profilePic,
        replies: comment.replies.map((reply) => {
          return {
            _id: reply._id,
            comment: reply.comment,
            user_id: reply.user._id,
            username: reply.user.username,
            email: reply.user.email,
            profilePic: reply.user.profilePic,
          };
        }),
      };
    });

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

const addComment = async (req, res, next) => {
  try {
    const { id } = req.params; // Feedback ID
    const { comment, parent_id } = req.body; // Comment and parent comment ID (if replying)
    const commenter = req.user; // Logged-in user information

    let newComment;
    if (parent_id) {
      // Reply to an existing comment
      const parentComment = await CommentModel.findById(parent_id);

      if (!parentComment) {
        return res.status(404).json({ message: "Parent comment not found" });
      }

      newComment = await CommentModel.create({
        comment,
        user: commenter.userId,
      });

      await CommentModel.findByIdAndUpdate(parent_id, {
        $push: { replies: newComment._id },
      });
    } else {
      // Top-level comment
      newComment = await CommentModel.create({
        comment,
        user: commenter.userId,
      });

      await FeedbackModel.findByIdAndUpdate(id, {
        $push: { comments: newComment._id },
      });
    }

    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params; // feedback ID
    const { comment_id, comment, parent_id } = req.body;

    let updatedComment;

    if (parent_id) {
      // Updating a reply to a comment
      const parentComment = await CommentModel.findById(parent_id);

      if (!parentComment) {
        return res.status(404).json({ message: "Parent comment not found" });
      }

      const replyIndex = parentComment.replies.findIndex(
        (reply) => reply.toString() === comment_id
      );

      if (replyIndex === -1) {
        return res.status(404).json({ message: "Reply not found" });
      }

      parentComment.replies[replyIndex].comment = comment;
      await parentComment.save();
      updatedComment = parentComment.replies[replyIndex];
    } else {
      // Updating a top-level comment
      updatedComment = await CommentModel.findByIdAndUpdate(
        comment_id,
        { comment },
        { new: true }
      );

      if (!updatedComment) {
        return res.status(404).json({ message: "Comment not found" });
      }
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params; // Feedback ID
    const { comment_id, parent_id } = req.body;

    if (parent_id) {
      // Handle deletion of a reply
      const parentComment = await CommentModel.findByIdAndUpdate(
        parent_id,
        {
          $pull: { replies: comment_id },
        },
        { new: true }
      );

      console.log(parentComment); // the

      if (!parentComment) {
        return res.status(404).json({ message: "Parent comment not found" });
      }

      res
        .status(200)
        .json({ message: "Reply deleted successfully", parentComment });
    } else {
      // Handle deletion of a top-level comment
      const comment = await CommentModel.findByIdAndDelete(comment_id);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      await FeedbackModel.findByIdAndUpdate(id, {
        $pull: { comments: comment_id },
      });

      res.status(200).json({ message: "Comment deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
};

export { getComments, addComment, updateComment, deleteComment };
