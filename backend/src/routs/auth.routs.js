import express from "express";
import {
  check,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import { authMwiddleware } from "../middleware/auth.middleware.js";

const authRouts = express.Router();

authRouts.post("/register", register);
authRouts.post("/login", login);
authRouts.post("/logout", authMwiddleware,logout);
authRouts.get("/check",authMwiddleware, check);

export default authRouts;
