import express from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:id", verifyJWT);
// router.get("/", )

export default router;