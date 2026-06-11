import WorkModel from "../../workspace/model.js";
import Task from "../model.js";

export async function updateTask(req, res) {
    try {
        const { userId } = req.user;
        const { taskId } = req.params;
        const updateData = req.body;

        if (!taskId) {
            return res.status(400).json({
                message: "Missing taskId",
            });
        }

        const { 
            _id,             
            createdBy,       
            workspaceId,     
            createdAt,       
            __v,             
            ...safeUpdateData
        } = updateData;

        const updatedTask = await Task.findOneAndUpdate(
            {
                _id: taskId,
                createdBy: userId,
            },
            {
                $set: {
                    ...safeUpdateData,
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