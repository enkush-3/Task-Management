import WorkModel from "../../workspace/model.js";
import Task from "../model.js";

export async function createTask(req, res) {
    try {
        const { userId } = req.user;
        const { workspaceId, folderId } = req.query;
        const taskData = req.body;

        const workspace = await WorkModel.findOne({
            _id: workspaceId,
            ownerId: userId,
        });

        if (!workspace) {
            return res.status(404).json({
                message: "Workspace not found",
            });
        }

        const task = new Task({
            createdBy: userId,
            workspaceId: workspaceId,
            title: taskData.title || "Untitled Task",
            description: taskData.description || "",
            status: taskData.status || "To do",
            priority: taskData.priority || "Medium",
            icon: taskData.icon || "",
            startAt: taskData.startAt || new Date(),
        });

        await task.save();

        return res.status(201).json({
            message: "Task created successfully",
            data: task,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error creating task",
            error: error.message,
        });
    }
}