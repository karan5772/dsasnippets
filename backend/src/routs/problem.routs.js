import express from "express";
import { authMwiddleware, checkAdmin } from "../middleware/auth.middleware.js";
import {
  createProblem,
  deleteProblem,
  getAllProblems,
  getProblemById,
  getProblemsSolvedByUser,
  updateProblem,
} from "../controllers/problem.controller.js";
const problemRouts = express.Router();

problemRouts.post(
  "/create-Problem",
  authMwiddleware,
  checkAdmin,
  createProblem
);

problemRouts.get("/get-All-Problems", authMwiddleware, getAllProblems);

problemRouts.get("/get-Problem-By-Id/:id", authMwiddleware, getProblemById);

problemRouts.put(
  "/update-Problem/:id",
  authMwiddleware,
  checkAdmin,
  updateProblem
);

problemRouts.post(
  "/delete-Problem/:id",
  authMwiddleware,
  checkAdmin,
  deleteProblem
);

problemRouts.post(
  "/get-Solved-Problems",
  authMwiddleware,
  getProblemsSolvedByUser
);

export default problemRouts;
