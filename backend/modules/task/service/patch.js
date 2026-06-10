import WorkModel from "../../workspace/model.js";
import Task from "../model.js";

export async function updateTask(req, res) {
    try {
        const { userId } = req.user;
        const { workspaceId } = req.query;
        const { taskId } = req.params;
        const updateData = req.body;

        if (!taskId || !workspaceId) {
            return res.status(400).json({
                message: "Missing taskId or workspaceId",
            });
        }

        const updatedTask = await Task.findOneAndUpdate(
            {
                _id: taskId,
                createdBy: userId,
            },
            {
                $set: {
                    ...updateData,
                    updatedAt: new Date(),
                },
            },
            {
                returnDocument: 'after',
                runValidators: true,
            }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found or already deleted",
            });
        }

        return res.status(200).json({
            message: "Task updated successfully",
            data: updatedTask,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error updating task",
            error: error.message,
        });
    }
}