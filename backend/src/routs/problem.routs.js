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

problemRouts.get("/get-problem/:id", authMiddleware, getProblemById);

problemRouts.put(
  "/update-Problem/:id",
  authMiddleware,
  checkAdmin,
  updateProblem
);

problemRouts.delete(
  "/delete-Problem/:id",
  authMiddleware,
  checkAdmin,
  deleteProblem
);

problemRouts.get(
  "/get-Solved-Problems",
  authMiddleware,
  getProblemsSolvedByUser
);

export default problemRouts;
