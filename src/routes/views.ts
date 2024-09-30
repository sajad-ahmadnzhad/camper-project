import { Router } from "express";
import {
  about,
  campersPanel,
  campers,
  contact,
  login,
  ownerInfos,
  resume,
  works,
  camperInfo,
} from "../controllers/views";
import redirectAuthMiddleware from "./../middlewares/redirectAuth";

const router = Router();

router.get("/panel", redirectAuthMiddleware, ownerInfos);
router.get("/panel/campers", redirectAuthMiddleware, campersPanel);

router.get("/login", redirectAuthMiddleware, login);

router.get("/", about);
router.get("/camper", camperInfo);
router.get("/campers", campers);
router.get("/contact", contact);
router.get("/resume", resume);
router.get("/works", works);

export default router;
