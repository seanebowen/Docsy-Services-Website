import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import authRouter   from "./auth.js";
import vaultRouter  from "./vault.js";
import slotsRouter  from "./slots.js";
import zapierRouter from "./zapier.js";
import documentCheckRouter from "./document-check.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth",   authRouter);
router.use("/vault",  vaultRouter);
router.use("/slots",  slotsRouter);
router.use("/zapier", zapierRouter);
router.use("/document-check", documentCheckRouter);

export default router;
