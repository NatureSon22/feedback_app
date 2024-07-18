import FeedbackModel from "../model/feedback.model.js";
import errorHandler from "../utils/errorHandler.js";

const getFeedBacks = async (req, res, next) => {
  try {
    const feedbacks = await FeedbackModel.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    next(error);
  }
};

const addFeedback = async (req, res, next) => {
  try {
    const { title, description, categories, user_id } = req.body;
    const feedBack = await FeedbackModel.create({
      title,
      description,
      categories,
      user_id,
    });
    res.status(200).json(feedBack);
  } catch (error) {
    next(error);
  }
};

const voteFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    const feedback = await FeedbackModel.findById(id);

    if (!feedback) {
      throw errorHandler(404, "Feedback not found");
    }

    const update = feedback.upvoters.includes(user_id)
      ? { $pull: { upvoters: user_id } }
      : { $addToSet: { upvoters: user_id } };

    const updatedFeedback = await FeedbackModel.findByIdAndUpdate(id, update, {
      new: true,
    });

    res.status(200).json(updatedFeedback);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, categories } = req.body;
    const feedback = await FeedbackModel.findByIdAndUpdate(
      id,
      { title, description, categories },
      { new: true }
    );
    res.status(200).json(feedback);
  } catch (error) {
    next(error);
  }
};

const deleteFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const feedback = await FeedbackModel.findByIdAndDelete(id);
    res.status(200).json(feedback);
  } catch (error) {
    next(error);
  }
};

export {
  getFeedBacks,
  addFeedback,
  updateFeedback,
  deleteFeedback,
  voteFeedback,
};
