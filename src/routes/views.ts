import { Router } from "express";
import { about, blog, contact, resume, works } from "../controllers/views";

const router = Router();

router.get("/", about);
router.get("/blog", blog);
router.get("/contact", contact);
router.get("/resume", resume);
router.get("/works", works);

export default router;
