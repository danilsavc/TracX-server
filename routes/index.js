import { Router } from "express";
import catagoryRouter from "./categoryRouter.js";
import eventRouter from "./eventRouter.js";
import userRouter from "./userRouter.js";

const router = new Router();

router.use("/user", userRouter);
router.use("/event", eventRouter);
router.use("/category", catagoryRouter);

export default router;
