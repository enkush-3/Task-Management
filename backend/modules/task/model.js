import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        workspaceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
            required: true,
            index: true,
        },
        title: { type: String, required: true, trim: true },
        description: { type: String, default: "", trim: true },
        status: {
            type: String,
            enum: ["To do", "In progress", "Completed"],
            default: "To do",
            index: true,
        },
        priority: {
            type: String,
            enum: ["High", "Medium", "Low"],
            default: "Medium",
            index: true,
        },
        icon: { type: String },
        startAt: {
            type: Date,
            default: () => new Date()
        },
        endAt: {
            type: Date,
            default: () => new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
    },
    { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
