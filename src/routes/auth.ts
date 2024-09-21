import express from "express";
import { auth } from "../controllers/auth";
import validationMiddleware from "../middlewares/validation";
import { authSchema } from "../validators/auth";
const router = express.Router();

router.post("/", validationMiddleware(authSchema), auth);

export default router;
