import Task from "../model.js";
import Workspace from "../..//workspace/model.js";


export async function hardDeleteTask(req, res) {
    try {
        const userId = req.user.userId;
        const { taskId } = req.params;

        const task = await Task.findOne({
            _id: taskId,
            createdBy: userId,
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task олдсонгүй",
            });
        }

        await Task.findByIdAndDelete(taskId);

        return res.json({
            success: true,
            message: "Task бүрмөсөн устгагдлаа"
        });
    } catch (error) {
        console.error("hardDeleteTask error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
}