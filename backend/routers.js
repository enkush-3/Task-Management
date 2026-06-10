import { Router } from "express";
import auth from "./modules/auth/routes.js";
import workspace from "./modules/workspace/routes.js";
import task from "./modules/task/routes.js"

const router = Router();

router.use("/auth", auth);
router.use("/workspace", workspace);
router.use("/task", task);

export default router;