import { Router } from "express";
import {getAllUsers, updateUser} from "../controllers/userController.js";
import { authenticateMaintainer } from "../middleware/maintainerAuthenticator.js";

const router = Router();

router.get("/all/:id", getAllUsers);

router.put("/set-role", authenticateMaintainer, updateUser);

export {router as userRouter};