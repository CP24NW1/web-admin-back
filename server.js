import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParse from "body-parser";

import questionRouter from "./routes/question.js";
import optionRouter from "./routes/option.js";
import skillRouter from "./routes/skill.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import roleRouter from "./routes/role.js";

import { CustomError } from "./utils/CustomError.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParse.json({ limit: "10mb" }));

app.listen(5000, () => console.log("Server is running on port 5000"));

// app.use("/api", examRouter);
app.use("/api/admin/question", questionRouter);
app.use("/api/admin/option", optionRouter);
app.use("/api/admin/skill", skillRouter);
app.use("/api/admin/auth", authRouter);
app.use("/api/admin/user", userRouter);
app.use("/api/admin/role", roleRouter);

app.use("/api/admin/check", (req, res) => {
  return res.status(200).json({ message: "ok!" });
});

app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404
  );
  next(err);
});

app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
});
