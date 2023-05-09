import { Router } from "express";
import eventController from "../controllers/eventController.js";
import Validation from "../validations/validations.js";
import errorValidations from "../middleware/ErrorValidationsMeddleware.js";
import checkRole from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.post(
  "/",
  checkRole("ADMIN"),
  Validation.eventValidation,
  errorValidations,
  eventController.create
);
router.get("/", eventController.getAll);
router.get("/:id", eventController.getOne);
router.patch(
  "/:id",
  checkRole("ADMIN"),
  Validation.eventValidation,
  errorValidations,
  eventController.update
);
router.delete("/:id", checkRole("ADMIN"), eventController.delete);
export default router;
