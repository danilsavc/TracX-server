import { Router } from "express";
import eventController from "../controllers/eventController.js";
import Validation from "../validations.js";
import errorValidations from "../middleware/ErrorValidationsMeddleware.js";
const router = new Router();

router.post("/", Validation.eventValidation, errorValidations, eventController.create);
router.get("/", eventController.getAll);
router.get("/:id", eventController.getOne);

export default router;
