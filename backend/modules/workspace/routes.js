import { Router } from "express";
import { Auth } from "../auth/auth.js";
import { getAllWorkspace, getLazyWorkspace, getLazyAllWorkspace } from "./service/get.js";
import { createWorkspace } from "./service/post.js";
import { patchWorkspace } from "./service/patch.js";
import { hardDeleteWorkspace } from "./service/delete.js";

const workspace = Router();


workspace.post("/create", Auth, createWorkspace);

workspace.patch("/update/:workspaceId", Auth, patchWorkspace);

workspace.get("/getall", Auth, getAllWorkspace);
workspace.get("/getlazyall", Auth, getLazyAllWorkspace);
workspace.get("/getlazy/:workspaceId", Auth, getLazyWorkspace);

workspace.delete("/hard/:workspaceId", Auth, hardDeleteWorkspace);

export default workspace;