import { Router } from "express";
import userController from "../controllers/userController.js";
import Validations from "../validations.js";
import errorValid from "../middleware/ErrorValidationsMeddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router();

router.post(
  "/registration",
  Validations.registrationValidation,
  errorValid,
  userController.registration
);
router.post("/login", Validations.loginValidation, errorValid, userController.login);
router.get("/auth", authMiddleware, userController.check);

export default router;
