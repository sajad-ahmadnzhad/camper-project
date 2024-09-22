import { Router } from "express";
import { create, getAll, getOne, newest, remove, search, update, removeImage } from "../controllers/camper";
import authMiddleware from "./../middlewares/auth";
import validationMiddleware from "../middlewares/validation";
import { createCamperSchema, updateCamperSchema } from "../validators/camper";
import uploader from "../utils/uploader";
const router = Router();

router.post(
  "/",
  authMiddleware,
  uploader.fields([
    { name: "camperImages", maxCount: 3 },
    { name: "camperMainImage", maxCount: 1 },
  ]),
  validationMiddleware(createCamperSchema),
  create
);

router.get("/", getAll);

router.delete("/:id", authMiddleware, remove);
router.put(
  "/:id",
  authMiddleware,
  uploader.fields([
    { name: "camperImages", maxCount: 3 },
    { name: "camperMainImage", maxCount: 1 },
  ]),
  validationMiddleware(updateCamperSchema),
  update
);
router.get("/search", search);
router.get("/newest", newest);
router.get("/:id", getOne);
router.delete("/remove-image/:id", removeImage);

export default router;
