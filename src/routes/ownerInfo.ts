import express from "express";
import { getOne, update } from "../controllers/ownerInfo";
import authMiddleware from "../middlewares/auth";
import validationMiddleware from "../middlewares/validation";
import uploader from "../utils/uploader";
import { createOwnerInfoSchema, updateOwnerInfoSchema } from "../validators/ownerInfo";

const router = express.Router();

router
  .route("/")
  .get(getOne)
  .post(
    authMiddleware,
    uploader.fields([
      { name: "avatar", maxCount: 1 },
      { name: "cover", maxCount: 1 },
    ]),
    validationMiddleware(createOwnerInfoSchema)
  )

  .put(
    authMiddleware,
    uploader.fields([
      { name: "avatar", maxCount: 1 },
      { name: "cover", maxCount: 1 },
    ]),
    validationMiddleware(updateOwnerInfoSchema),
    update
  );

export default router;
