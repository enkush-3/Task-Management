import WorkModel from "../model.js";
import Task from "../../task/model.js";

export async function hardDeleteWorkspace(req, res) {
    try {
        const userId = req.user.userId;
        const { workspaceId } = req.params;
        const workspace = await WorkModel.findOne({
            _id: workspaceId,
            ownerId: userId,
        });

        if (!workspace) {
            return res.status(404).json({ 
                success: false,
                message: "Workspace not found" 
            });
        }

        await Task.deleteMany({ workspaceId: workspaceId });
        await WorkModel.findByIdAndDelete(workspaceId);

        return res.json({
            success: true,
            message: "Workspace амжилттай устгагдлаа",
            data: workspace,
        });
    } catch (error) {
        console.error("hardDeleteWorkspace error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
}
