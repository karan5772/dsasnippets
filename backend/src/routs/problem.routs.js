import express from "express";
import { authMiddleware, checkAdmin } from "../middleware/auth.middleware.js";
import {
  createProblem,
  deleteProblem,
  getAllProblems,
  getProblemById,
  getProblemsSolvedByUser,
  updateProblem,
} from "../controllers/problem.controller.js";
const problemRouts = express.Router();

problemRouts.post("/create-Problem", authMiddleware, checkAdmin, createProblem);

problemRouts.get("/get-All-Problems", authMiddleware, getAllProblems);

problemRouts.get("/get-Problem-By-Id/:id", authMiddleware, getProblemById);

problemRouts.put(
  "/update-Problem/:id",
  authMiddleware,
  checkAdmin,
  updateProblem
);

problemRouts.post(
  "/delete-Problem/:id",
  authMiddleware,
  checkAdmin,
  deleteProblem
);

problemRouts.post(
  "/get-Solved-Problems",
  authMiddleware,
  getProblemsSolvedByUser
);

export default problemRouts;
