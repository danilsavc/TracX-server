import { Router } from "express";
import basketController from "../controllers/basketController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router();

router.post("/", authMiddleware, basketController.create);
router.get("/", authMiddleware, basketController.getAll);
router.post("/basket-events", authMiddleware, basketController.getBasketEvents);
router.delete("/:id", authMiddleware, basketController.deleteOne);
export default router;
