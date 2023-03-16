import express from "express";
import { LogInUser, signUpUser } from "../controller/auth.controller.js";

const router = express.Router();

// SingUp Model
router.post("/signup", signUpUser);

router.post("/login", LogInUser);

export default router;
