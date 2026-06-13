import { useState, useEffect } from 'react';
import api from '../../../api/axios';

export function useWorkspaces() {
    const [workspaces, setWorkspaces] = useState([]);
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);
    const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
    const [editingWorkspace, setEditingWorkspace] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadWorkspaces = async () => {
        try {
            setLoading(true);
            const res = await api.get('/workspace/getall');
            const data = res.data.data || [];
            setWorkspaces(data);

            setSelectedWorkspace("all");
        } catch (err) {
            console.error('Workspaces авахад алдаа:', err);
        } finally {
            setLoading(false);
        }
    };

    const saveWorkspace = async (data) => {
        try {
            if (editingWorkspace) {
                await api.patch(`/workspace/update/${editingWorkspace._id}`, data);
            } else {
                await api.post('/workspace/create', data);
            }
            await loadWorkspaces();
            return { success: true };
        } catch (err) {
            return {
                success: false,
                error: err.response?.data?.message || err.message,
            };
        }
    };

    const deleteWorkspace = async (workspaceId) => {
        console.log('Workspace устгах:', workspaceId);
        try {
            await api.delete(`/workspace/hard/${workspaceId}`);
            await loadWorkspaces();

            if (selectedWorkspace === workspaceId) {
                setSelectedWorkspace(null);
            }
            return { success: true };
        } catch (err) {
            return {
                success: false,
                error: err.response?.data?.message || err.message,
            };
        }
    };

    const openCreateModal = () => {
        setEditingWorkspace(null);
        setIsWorkspaceModalOpen(true);
    };

    const openEditModal = (workspace) => {
        setEditingWorkspace(workspace);
        setIsWorkspaceModalOpen(true);
    };

    const closeModal = () => {
        setIsWorkspaceModalOpen(false);
        setEditingWorkspace(null);
    };

    useEffect(() => {
        loadWorkspaces();
    }, []);

    return {
        workspaces,
        selectedWorkspace,
        setSelectedWorkspace,
        isWorkspaceModalOpen,
        editingWorkspace,
        loading,
        saveWorkspace,
        deleteWorkspace,
        openCreateModal,
        openEditModal,
        closeModal,
        reloadWorkspaces: loadWorkspaces,
    };
}