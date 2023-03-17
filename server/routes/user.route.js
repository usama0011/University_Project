import express from "express";
import { checkUserToken, checkAdminToken } from "../middleware/middleware.js";
import {
  CreateUserByAdmin,
  DeleteUser,
  GetAllUsers,
  GetSingleUser,
  UpdateUser,
} from "../controller/userController.js";

const router = express.Router();

// GET all users (admin only)
router.get("/", checkAdminToken, GetAllUsers);

// GET user by ID
router.get("/:id", checkUserToken, GetSingleUser);

// CREATE user (admin only)
router.post("/", checkAdminToken, CreateUserByAdmin);
// UPDATE user (admin or user itself)
router.put("/:id", checkUserToken, UpdateUser);

// DELETE user (admin or user itself)
router.delete("/:id", checkUserToken, DeleteUser);

export default router;
