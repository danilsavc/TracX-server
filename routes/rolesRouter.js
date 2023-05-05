import { Router } from "express";
import rolesController from "../controllers/rolesController.js";
import Validation from "../validations/validations.js";
import errorValidations from "../middleware/ErrorValidationsMeddleware.js";
import checkRole from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.post(
  "/",
  // checkRole("ADMIN"),
  Validation.rolesValidation,
  errorValidations,
  rolesController.create
);
router.get("/", rolesController.getAll);

export default router;
