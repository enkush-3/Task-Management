import WorkModel from "../model.js";
import Task from "../../task/model.js";

import mongoose from "mongoose";

export async function getAllWorkspace(req, res) {
    try {
        const userId = req.user.userId;

        const ownedWorkspaces = await WorkModel.find({
            ownerId: userId,
        });

        return res.json({
            success: true,
            data: ownedWorkspaces,
        });
    } catch (error) {
        console.error('Workspace авахад алдаа:', error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
}

export async function getLazyWorkspace(req, res) {
    try {
        const userId = req.user.userId;
        const { workspaceId } = req.params;
        const {
            sortBy = 'newest',
            priority,
            status,
            search
        } = req.query;
        const filter = {
            createdBy: userId,
            workspaceId,
        };

        if (priority && priority !== 'all') filter.priority = priority;
        if (status && status !== 'all') filter.status = status;

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        let sort = {};
        switch (sortBy) {
            case 'newest': sort = { createdAt: -1 }; break;
            case 'oldest': sort = { createdAt: 1 }; break;
            case 'priority': sort = { priority: 1 }; break;
            case 'deadline': sort = { endAt: 1 }; break;
            default: sort = { createdAt: -1 };
        }


        const [tasks, total] = await Promise.all([
            Task.find(filter).lean().sort(sort),
            Task.countDocuments(filter)
        ]);

        return res.json({
            success: true,
            data: {
                tasks,
                total,
            },
        });
    } catch (error) {
        console.error('❌ getLazyWorkspace error:', error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
export async function getLazyAllWorkspace(req, res) {
    try {
        const userId = req.user.userId;

        const [tasks] = await Promise.all([
            Task.find({createdBy: userId}).lean().sort({ createdAt: -1 })
        ]);

        return res.json({
            success: true,
            tasks,
        });
    } catch (error) {
        console.error('getLazyAllWorkspace error:', error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}