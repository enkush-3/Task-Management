import WorkModel from "../model.js";

export async function createWorkspace(req, res) {
    try {
        const ownerId = req.user.userId;
        const { title, icon } = req.body;

        const workspace = WorkModel({
            ownerId: ownerId,
            title: title || "My Workspace",
            icon: icon,
        });

        await workspace.save();

        res.status(200).json({
            success: true,
            message: "Workspace created successfully",
            data: workspace,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            mesage: "Server error",
            error: error.message,
        });
    }
}
