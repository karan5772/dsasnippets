import express from "express";
import { authMwiddleware } from "../middleware/auth.middleware.js";
import {
  getAllSubmissions,
  getAllSubmissionsForProblem,
  getSubmissionsForProblem,
} from "../controllers/submission.controller.js";

const submissionRoute = express.Router();

submissionRoute.get("/get-all-submission", authMwiddleware, getAllSubmissions);
submissionRoute.get(
  "/get-submission/:problemId",
  authMwiddleware,
  getSubmissionsForProblem
);
submissionRoute.get(
  "/get-submissions-count/:problemId",
  authMwiddleware,
  getAllSubmissionsForProblem
);

export default submissionRoute;
