import { Router } from "express";
import categoryController from "../controllers/categoryController.js";
import Validation from "../validations.js";
import errorValidations from "../middleware/ErrorValidationsMeddleware.js";
const router = new Router();

router.post("/", Validation.categoryValidation, errorValidations, categoryController.create);
router.get("/", categoryController.getAll);

export default router;
