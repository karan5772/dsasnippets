import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getAllSubmissions,
  getAllSubmissionsForProblem,
  getSubmissionsForProblem,
} from "../controllers/submission.controller.js";

const submissionRoute = express.Router();

submissionRoute.get("/get-all-submission", authMiddleware, getAllSubmissions);
submissionRoute.get(
  "/get-submission/:problemId",
  authMiddleware,
  getSubmissionsForProblem
);
submissionRoute.get(
  "/get-submissions-count/:problemId",
  authMiddleware,
  getAllSubmissionsForProblem
);

export default submissionRoute;
