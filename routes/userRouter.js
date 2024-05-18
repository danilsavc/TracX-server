import { Router } from "express";
import userController from "../controllers/userController.js";
import Validations from "../validations/validations.js";
import errorValid from "../middleware/ErrorValidationsMeddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import checkrole from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.post(
  "/registration",
  Validations.registrationValidation,
  errorValid,
  userController.registration
);
router.post("/login", Validations.loginValidation, errorValid, userController.login);
router.get("/auth", authMiddleware, userController.check);
router.post("/getUserByEmail", checkrole(["ADMIN"]), userController.getUserByEmail);

export default router;
