import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";

import authRouts from "./routs/auth.routs.js";
import problemRouts from "./routs/problem.routs.js";
import executionRouts from "./routs/execution.routs.js";
import submissionRoute from "./routs/submission.routs.js";
import playlistRoute from "./routs/playlist.routs.js";

dotenv.config();
const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 200,
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://www.dsasnippets.xyz",
      "https://dsasnippets.xyz",
    ],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to leetLab 🔥");
});

app.use("/api/v1/auth", authRouts);
app.use("/api/v1/problems", problemRouts);
app.use("/api/v1/execute-code", executionRouts);
app.use("/api/v1/submission", submissionRoute);
app.use("/api/v1/playlist", playlistRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

export default app;
