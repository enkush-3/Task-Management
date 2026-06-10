import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ownerId",
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            default: "My Workspace",
        },
        icon: { type: String },
    },
    { timestamps: true }
);

workSchema.index({ title: "text" });

export default mongoose.model("Workspace", workSchema);
