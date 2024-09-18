import { Router } from "express";
import { about, blog, campers, contact, login, ownerInfos, resume, works } from "../controllers/views";

const router = Router();

router.get("/panel", ownerInfos);
router.get("/panel/campers", campers);

router.get("/login", login);

router.get("/", about);
router.get("/blog", blog);
router.get("/contact", contact);
router.get("/resume", resume);
router.get("/works", works);

export default router;
