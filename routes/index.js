import { Router } from "express";
import catagoryRouter from "./categoryRouter.js";
import rolesRouter from "./rolesRouter.js";
import eventRouter from "./eventRouter.js";
import userRouter from "./userRouter.js";
import basketRouter from "./basketRouter.js";
import formatRouter from "./formatRouter.js";
import recController from "./recRouter.js";

const router = new Router();

router.use("/user", userRouter);
router.use("/event", eventRouter);
router.use("/category", catagoryRouter);
router.use("/basket", basketRouter);
router.use("/roles", rolesRouter);
router.use("/format", formatRouter);
router.use("/rec", recController);
export default router;
