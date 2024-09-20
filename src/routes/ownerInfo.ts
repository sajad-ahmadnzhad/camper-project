import express from "express";
import { create, getOne, update } from "../controllers/ownerInfo";
import basicAuthMiddleware from "../middlewares/basicAuth";
import validationMiddleware from "../middlewares/validation";
import uploader from "../utils/uploader";
import { createOwnerInfoSchema, updateOwnerInfoSchema } from "../validators/ownerInfo";

const router = express.Router();

router
  .route("/")
  .get(getOne)
  .post(
    basicAuthMiddleware,
    uploader.fields([
      { name: "avatar", maxCount: 1 },
      { name: "cover", maxCount: 1 },
    ]),
    validationMiddleware(createOwnerInfoSchema)
  )

  .put(
    basicAuthMiddleware,
    uploader.fields([
      { name: "avatar", maxCount: 1 },
      { name: "cover", maxCount: 1 },
    ]),
    validationMiddleware(updateOwnerInfoSchema),
    update
  );

export default router;
