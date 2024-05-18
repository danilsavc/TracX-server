import { Router } from "express";

import recController from "../controllers/recController.js";

const router = new Router();

router.post("/", recController.recommendEventsForUser);
export default router;
