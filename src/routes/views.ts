import { Router } from "express";
import { about, blog, campers, contact, login, ownerInfos, resume, works } from "../controllers/views";
import redirectAuthMiddleware from "./../middlewares/redirectAuth";

const router = Router();

router.get("/panel", redirectAuthMiddleware, ownerInfos);
router.get("/panel/campers", redirectAuthMiddleware, campers);

router.get("/login", redirectAuthMiddleware, login);

router.get("/", about);
router.get("/blog", blog);
router.get("/contact", contact);
router.get("/resume", resume);
router.get("/works", works);

export default router;
