import { Router } from "express";
import categoryController from "../controllers/categoryController.js";
import Validation from "../validations.js";
import errorValidations from "../middleware/ErrorValidationsMeddleware.js";
import checkRole from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.post(
  "/",
  checkRole("ADMIN"),
  Validation.categoryValidation,
  errorValidations,
  categoryController.create
);
router.get("/", categoryController.getAll);

export default router;
