import Router from "express";
import { Auth } from "../auth/auth.js";

import { createTask } from "./service/post.js";
import { updateTask } from "./service/patch.js"
import { hardDeleteTask } from "./service/delete.js";
const taskRouter = Router();

taskRouter.post("/create", Auth, createTask);
taskRouter.patch("/update/:taskId", Auth, updateTask);
taskRouter.delete("/:taskId", Auth, hardDeleteTask);

export default taskRouter;
