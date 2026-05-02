import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import authRouter   from "./auth.js";
import vaultRouter  from "./vault.js";
import slotsRouter  from "./slots.js";
import zapierRouter from "./zapier.js";
import documentCheckRouter from "./document-check.js";
import firmsRouter    from "./firms.js";
import chatRouter     from "./chat.js";
import partnersRouter from "./partners.js";
import bookingsRouter from "./bookings.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth",     authRouter);
router.use("/vault",    vaultRouter);
router.use("/slots",    slotsRouter);
router.use("/zapier",   zapierRouter);
router.use("/document-check", documentCheckRouter);
router.use("/firms",    firmsRouter);
router.use("/chat",     chatRouter);
router.use("/partners", partnersRouter);
router.use("/bookings", bookingsRouter);

export default router;
