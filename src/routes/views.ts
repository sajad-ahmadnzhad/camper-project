import { Router } from "express";
import { about, campersPanel, campers, login, ownerInfos, camperInfo } from "../controllers/views";
import redirectAuthMiddleware from "./../middlewares/redirectAuth";
import checkLogin from "./../middlewares/checkLogin";

const router = Router();

router.get("/panel", redirectAuthMiddleware, ownerInfos);
router.get("/panel/campers", redirectAuthMiddleware, campersPanel);

router.get("/login", redirectAuthMiddleware, login);

router.get("/", checkLogin, about);
router.get("/camper", checkLogin, camperInfo);
router.get("/campers", checkLogin, campers);

export default router;
