import { Router } from "express";
import eventController from "../controllers/eventController.js";
import Validation from "../validations/validations.js";
import errorValidations from "../middleware/ErrorValidationsMeddleware.js";
import checkRole from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.post(
  "/",
  checkRole(["ADMIN", "MODERATOR"]),
  Validation.eventValidation,
  errorValidations,
  eventController.create
);
router.get("/", eventController.getAll);
router.post(
  "/moderator-events",
  checkRole(["ADMIN", "MODERATOR"]),
  eventController.getAllByCreator
);
router.get("/:id", eventController.getOne);
router.get("/event-info/:id", eventController.getOneEventInfo);
router.patch(
  "/:id",
  checkRole(["ADMIN", "MODERATOR"]),
  Validation.eventValidation,
  errorValidations,
  eventController.update
);
router.delete("/:id", checkRole(["ADMIN", "MODERATOR"]), eventController.delete);
export default router;
