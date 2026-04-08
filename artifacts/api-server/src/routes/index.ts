import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import authRouter   from "./auth.js";
import vaultRouter  from "./vault.js";
import slotsRouter  from "./slots.js";
import zapierRouter from "./zapier.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth",   authRouter);
router.use("/vault",  vaultRouter);
router.use("/slots",  slotsRouter);
router.use("/zapier", zapierRouter);

export default router;
