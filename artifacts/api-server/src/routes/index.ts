import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import authRouter   from "./auth.js";
import vaultRouter  from "./vault.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth",  authRouter);
router.use("/vault", vaultRouter);

export default router;
