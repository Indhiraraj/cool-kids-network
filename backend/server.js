import express, { json } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import { authRouter } from "./routes/authRoutes.js";
import connectToDatabase from "./config/db.config.js";
import { userRouter } from "./routes/userRoutes.js";

dotenv.config()

const app = express();

await connectToDatabase();

app.use(json());

app.use(cors());

app.use("/api/auth", authRouter);

app.use("/api/users", userRouter);

app.listen(process.env.PORT, () => {
    console.log("Server running at: 3000");

})