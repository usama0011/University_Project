import express from "express";
import User from "../models/user.model.js";
import { checkUserToken, checkAdminToken } from "../middleware/middleware.js";

const router = express.Router();

// GET all users (admin only)
router.get("/", checkAdminToken, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET user by ID
router.get("/:id", checkUserToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// CREATE user (admin only)
router.post("/", checkAdminToken, async (req, res) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// UPDATE user (admin or user itself)
router.put("/:id", checkUserToken, async (req, res) => {
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
    if (req.userId === user._id.toString()) {
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
});

// DELETE user (admin or user itself)
router.delete("/:id", checkUserToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Only admin can delete any user's account
    if (req.user.isAdmin) {
      // Check if the user making the request is an admin
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "User deleted successfully" });
    }
    // User can delete only its own account
    if (req.userId === user._id.toString()) {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "User deleted successfully" });
    }
    res.status(401).json({ message: "Unauthorized to delete user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
