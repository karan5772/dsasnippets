import express from "express";
import {
  check,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const authRouts = express.Router();

authRouts.post("/register", register);
authRouts.post("/login", login);
authRouts.post("/logout", authMiddleware, logout);
authRouts.get("/check", authMiddleware, check);

export default authRouts;
