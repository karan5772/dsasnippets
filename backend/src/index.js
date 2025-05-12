import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRouts from "./routs/auth.routs.js";
import problemRouts from "./routs/problem.routs.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to leetLab 🔥");
});

app.use("/user/v1/auth", authRouts);
app.use("/user/v1/problems", problemRouts);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

export default app;
