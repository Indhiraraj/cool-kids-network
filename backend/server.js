import express, { json } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import { authRouter } from "./routes/authRoutes.js";
import connectToDatabase from "./config/db.config.js";
import { userRouter } from "./routes/userRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';

// Create __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()

const app = express();

await connectToDatabase();

app.use(express.static(path.join(__dirname, 'dist')));

app.use(json());

app.use(cors());

app.use("/api/auth", authRouter);

app.use("/api/users", userRouter);

app.get('*', (req, res) => {
    res.send(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(process.env.PORT, () => {
    console.log("Server running at: 3000");

})