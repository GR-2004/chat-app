import express from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {getAllUsers} from "../controllers/user.controller.js"

const router = express.Router();

router.get("/", verifyJWT, getAllUsers);

export default router;