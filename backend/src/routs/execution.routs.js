import express from "express";
import { authMwiddleware } from "../middleware/auth.middleware.js";
import { execute } from "../controllers/execution.controller.js";
const executionRouts = express.Router();

executionRouts.post("/", authMwiddleware, execute);

export default executionRouts;
