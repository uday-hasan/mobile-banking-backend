import express from "express";
import cors from "cors";

import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import errorMiddleware from "./middleware/error.middleware";
import { PORT } from "../config/env";
import connectDB from "./db/connectDB";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.get("/", (req, res) => {
  const message = "Checking";
  const error: any = new Error(message);
  error.statusCode = 404;
  throw error;
});

app.use(errorMiddleware);
app.listen(PORT, async () => {
  console.log("Listening on http://localhost:" + PORT);
  await connectDB();
});
