import { Router } from "express";
import { create, getAll, getOne, newest, remove, search, update, removeImage } from "../controllers/camper";
import basicAuthMiddleware from "./../middlewares/basicAuth";
import validationMiddleware from "../middlewares/validation";
import { createCamperSchema, updateCamperSchema } from "../validators/camper";
import uploader from "../utils/uploader";
const router = Router();

router.post(
  "/",
  basicAuthMiddleware,
  uploader.fields([
    { name: "camperImages", maxCount: 3 },
    { name: "camperMainImage", maxCount: 1 },
  ]),
  validationMiddleware(createCamperSchema),
  create
);

router.get("/", getAll);

router.delete("/:id", basicAuthMiddleware, remove);
router.put(
  "/:id",
  basicAuthMiddleware,
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
