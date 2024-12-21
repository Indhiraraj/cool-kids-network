import { Router } from "express";
import {getAllUsers, updateUser, getUsersInfo} from "../controllers/userController.js";
import { authenticateMaintainer } from "../middleware/maintainerAuthenticator.js";

const router = Router();

router.get("/all/info/:id", getUsersInfo);

router.get("/all/:maintainerEmail", authenticateMaintainer, getAllUsers);

router.put("/set-role", authenticateMaintainer, updateUser);

export {router as userRouter};