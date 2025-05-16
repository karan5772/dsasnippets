import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { execute } from "../controllers/execution.controller.js";
const executionRouts = express.Router();

executionRouts.post("/", authMiddleware, execute);

export default executionRouts;
