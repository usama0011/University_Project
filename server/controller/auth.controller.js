import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signUpUser = async (req, res, next) => {
  try {
    const { username, email, password, fullName } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      fullName,
    });
    const result = await user.save();
    res.status(201).json({ message: "User created", user: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login Controller

export const LogInUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin, user: user },
      "893u49u9ju8r93u4",
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Authentication successful", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
