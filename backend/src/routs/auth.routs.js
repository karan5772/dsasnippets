import express from "express";
import {
  check,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";

const authRouts = express.Router();

authRouts.post("/register", register);
authRouts.post("/login", login);
authRouts.post("/logout", logout);
authRouts.get("/check", check);

export default authRouts;
