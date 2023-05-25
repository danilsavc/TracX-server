import { Router } from "express";
import rolesController from "../controllers/rolesController.js";
import Validation from "../validations/validations.js";
import errorValidations from "../middleware/ErrorValidationsMeddleware.js";
import checkRole from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.post(
  "/",
  checkRole(["ADMIN"]),
  Validation.rolesValidation,
  errorValidations,
  rolesController.create
);
router.get("/", checkRole(["ADMIN"]), rolesController.getAll);
router.post(
  "/user-role",
  checkRole(["ADMIN"]),
  Validation.userRoleValidation,
  errorValidations,
  rolesController.userRole
);
export default router;
