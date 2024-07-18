import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feedbacks",
  initialState: {
    feedbacks: [],
    prevFeedbacks: [],
    selectedFeedback: null,
    selectedFeedbackComments: [],
    selectedCommentId: null,
  },
  reducers: {
    getFeedbacks: (state, action) => {
      state.feedbacks = action.payload;
      state.prevFeedbacks = action.payload;
    },
    addFeedback: (state, action) => {
      state.feedbacks.push(action.payload);
      state.prevFeedbacks.push(action.payload);
    },
    vote: (state, action) => {
      const { feed_id, user_id } = action.payload;

      // Function to update upvoters array
      const updateUpvoters = (feedback) => {
        const userHasVoted = feedback.upvoters.includes(user_id);
        const updatedUpvoters = userHasVoted
          ? feedback.upvoters.filter((id) => id !== user_id)
          : [...feedback.upvoters, user_id];
        return {
          ...feedback,
          upvoters: updatedUpvoters,
        };
      };

      // Update feedbacks array
      state.feedbacks = state.feedbacks.map((feedback) =>
        feedback._id === feed_id ? updateUpvoters(feedback) : feedback,
      );

      // Update prevfeedbacks array
      state.prevFeedbacks = state.prevFeedbacks.map((feedback) =>
        feedback._id === feed_id ? updateUpvoters(feedback) : feedback,
      );

      if (state.selectedFeedback) {
        if (state.selectedFeedback.upvoters.includes(user_id)) {
          state.selectedFeedback.upvoters =
            state.selectedFeedback.upvoters.filter((id) => id !== user_id);
        } else {
          state.selectedFeedback.upvoters = [
            ...state.selectedFeedback.upvoters,
            user_id,
          ];
        }
      }
    },
    filterFeedbacks: (state, action) => {
      state.feedbacks =
        action.payload === "All"
          ? state.prevFeedbacks
          : state.prevFeedbacks.filter((feedback) =>
              feedback.categories.includes(action.payload),
            );
    },
    filterFeedbacksByInteractions: (state, action) => {
      const { filter, user_id } = action.payload;

      const feedbacksCopy = [...state.feedbacks];

      const sortingFunctions = {
        "Most Upvotes": (a, b) => b.upvoters.length - a.upvoters.length,
        "Least Upvotes": (a, b) => a.upvoters.length - b.upvoters.length,
        "Most Comments": (a, b) => b.comments.length - a.comments.length,
      };

      if (filter === "My Feed") {
        state.feedbacks = state.prevFeedbacks.filter(
          (feedback) => feedback.user_id === user_id,
        );
      } else if (filter === "All") {
        state.feedbacks = state.prevFeedbacks;
      } else {
        state.feedbacks = feedbacksCopy.sort(sortingFunctions[filter]);
      }
    },
    selectFeedback: (state, action) => {
      state.selectedFeedback = action.payload;
    },
    getSelectedFeedbackComments: (state, action) => {
      state.selectedFeedbackComments = action.payload;
    },
    addSelectedFeedbackComment: (state, action) => {
      state.selectedFeedbackComments.push(action.payload);
    },
    selectComment: (state, action) => {
      state.selectedCommentId = action.payload;
      console.log(state.selectedCommentId);
    },
    addCommentReply: (state, action) => {
      const comment_id = action.payload.comment_id;
      const newComment = state.selectedFeedbackComments.find(
        (comment) => comment._id === comment_id,
      );

      if (newComment) {
        newComment.replies.push(action.payload);

        state.selectedFeedbackComments = state.selectedFeedbackComments.map(
          (comment) => (comment._id === comment_id ? newComment : comment),
        );
      }
    },
    removeComment: (state, action) => {
      const { comment_id } = action.payload;
      state.selectedFeedbackComments = state.selectedFeedbackComments.filter(
        (comment) => comment._id !== comment_id,
      );

      state.selectedFeedback.comments = state.selectedFeedback.comments.filter(
        (comment) => comment !== comment_id,
      );
    },
    removeCommentReply: (state, action) => {
      const { comment_id, reply_id } = action.payload;
      const comment = state.selectedFeedbackComments.find(
        (comment) => comment._id === comment_id,
      );

      if (comment) {
        comment.replies = comment.replies.filter(
          (reply) => reply._id !== reply_id,
        );
      }

      state.selectedFeedbackComments = state.selectedFeedbackComments.map(
        (commentfeed) =>
          commentfeed._id === comment_id ? comment : commentfeed,
      );
    },
    clearSelectedFeedback: (state) => {
      state.selectedFeedback = null;
      state.selectedFeedbackComments = [];
      state.selectedCommentId = null;

      console.log(state.selectedFeedbackComments);
    },
  },
});

export const {
  getFeedbacks,
  addFeedback,
  vote,
  filterFeedbacks,
  filterFeedbacksByInteractions,
  selectFeedback,
  getSelectedFeedbackComments,
  addSelectedFeedbackComment,
  addCommentReply,
  selectComment,
  clearSelectedFeedback,
  removeComment,
  removeCommentReply,
} = feedSlice.actions;

export default feedSlice.reducer;
