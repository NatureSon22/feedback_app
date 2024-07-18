import UserModel from "../model/user.model.js";
import errorHandler from "../utils/errorHandler.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, password, profilePic } = req.body;

    const update = {};

    if (username) update.username = username;
    if (email) update.email = email;
    if (profilePic) update.profilePic = profilePic;
    if (password) {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      const hash = await bcrypt.hash(password, salt);
      update.password = hash;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!updatedUser) {
      throw errorHandler(404, "User not found");
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export { getAllUsers, updateUser };
