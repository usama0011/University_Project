import bcrypt from "bcrypt";
import User from "../models/user.model.js";
//Get All Users
export const GetAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Get Single User
export const GetSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = user.password;

    // Decrypt the password using bcrypt
    const decryptedPassword = await bcrypt.hash(hashedPassword, 12);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Create User By Admin Also
export const CreateUserByAdmin = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const UpdateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Only admin can update isAdmin field
    if (req.isAdmin && req.body.isAdmin !== undefined) {
      user.isAdmin = req.body.isAdmin;
    }
    // User can update only its own account
    if (req.id === user._id.toString()) {
      user.username = req.body.username;
      user.email = req.body.email;
      user.fullName = req.body.fullName;
      user.password = req.body.password;
    }
    const result = await user.save();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//Delete User
export const DeleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Only admin or the user itself can delete the account
    if (req.user.isAdmin || req.user._id.toString() === user._id.toString()) {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "User deleted successfully" });
    }
    res.status(401).json({ message: "Unauthorized to delete user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
