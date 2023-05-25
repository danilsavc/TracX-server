import { Router } from "express";
import formatController from "../controllers/formatController.js";
import Validation from "../validations/validations.js";
import errorValidations from "../middleware/ErrorValidationsMeddleware.js";
import checkRole from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.post(
  "/",
  checkRole(["ADMIN"]),
  Validation.formatValidation,
  errorValidations,
  formatController.create
);
router.get("/:id", formatController.getOne);
router.get("/", formatController.getAll);

export default router;
