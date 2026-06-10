import WorkModel from "../model.js";

export async function patchWorkspace(req, res) {
    try {
        const userId = req.user.userId;
        const { workspaceId } = req.params;
        const { title, icon, shareType } = req.body;

        const updateData = {
            title: title,
            icon: icon,
            shareType: shareType,
        };
        const workspace = await WorkModel.findOneAndUpdate(
            {
                _id: workspaceId,
                ownerId: userId,
                isDeleted: false,
            },
            {
                $set: updateData,
                $inc: {
                    __v: 0.1,
                },
            },
            {
                new: true,
                runValidators: true,
            }
        ).select("-path");

        const io = req.app.get("io");

        if (io) {
            io.to(workspaceId.toString()).emit("workspace", {
                workspaceId,
                updateData: workspace,
            });
        }

        return res.status(200).json({
            success: true,
            data: workspace
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
}