import express from "express";
import dotenv from "dotenv";
import authRouts from "./routs/auth.routs.js";

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to leetLab 🔥");
});

app.use("/user/v1/auth", authRouts);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

export default app;
