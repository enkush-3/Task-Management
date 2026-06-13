import { useState, useEffect, useMemo, useCallback } from 'react';
import api from '../../../api/axios';

export function useTasks(selectedWorkspace) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalTasks, setTotalTasks] = useState(0);

    const [filters, setFilters] = useState({
        priority: 'all',
        status: 'all',
        category: 'all',
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('newest');
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    // ✅ Бүх параметрийг оруулсан
    const fetchParams = useMemo(() => {
        return {
            sortBy: sortOption,
            priority: filters.priority,
            status: filters.status,
            search: searchQuery,
        };
    }, [currentPage, pageSize, sortOption, filters, searchQuery]);

    const loadTasks = useCallback(async () => {
        if (!selectedWorkspace || selectedWorkspace === 'all') {
            setTasks([]);
            setTotalTasks(0);
            return;
        }

        try {
            setLoading(true);

            const params = new URLSearchParams();
            Object.entries(fetchParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '' && value !== 'all') {
                    params.append(key, value);
                }
            });

            const res = await api.get(`/workspace/getlazy/${selectedWorkspace}?${params.toString()}`);
            if (res.data.success) {
                setTasks(res.data.data.tasks || []);
                setTotalTasks(res.data.data.total || 0);
            }
        } catch (err) {
            console.error('❌ Tasks авахад алдаа:', err);
            setTasks([]);
            setTotalTasks(0);
        } finally {
            setLoading(false);
        }
    }, [selectedWorkspace, fetchParams]);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    const setFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    };

    const changeSortOption = (value) => {
        setSortOption(value);
        setCurrentPage(1);
    };

    const changePageSize = (value) => {
        setPageSize(value);
        setCurrentPage(1);
    };

    const changeSearchQuery = (value) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const saveTask = async (data) => {
        try {
            if (data._id) {
                await api.patch(`/task/update/${data._id}`, data);
            } else {
                await api.post(`/task/create?workspaceId=${selectedWorkspace}`, data);
            }
            await loadTasks();
            return { success: true };
        } catch (err) {
            return {
                success: false,
                error: err.response?.data?.message || err.message,
            };
        }
    };

    const deleteTask = async (id) => {
        try {
            await api.delete(`/task/${id}`);
            await loadTasks();
            return { success: true };
        } catch (err) {
            return {
                success: false,
                error: err.response?.data?.message || err.message,
            };
        }
    };

    const totalPages = Math.ceil(totalTasks / pageSize);

    return {
        tasks,
        allTasks: tasks,
        totalTasks,
        filters,
        searchQuery,
        loading,
        setSearchQuery: changeSearchQuery,
        setFilter,
        sortOption,
        setSortOption: changeSortOption,
        pageSize,
        setPageSize: changePageSize,
        currentPage,
        setCurrentPage,
        totalPages,
        saveTask,
        deleteTask,
        reloadTasks: loadTasks,
    };
}

export function useOverviewTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadAllTasks = useCallback(async () => {
        try {
            setLoading(true);
            const res = await api.get('/workspace/getlazyall');
            
            if (res.data.success) {
                // ✅ Backend response бүтцийг тохируулах
                setTasks(res.data.data?.tasks || res.data.tasks || []);
            }
        } catch (err) {
            console.error('❌ Overview tasks авахад алдаа:', err);
            setTasks([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadAllTasks();
    }, [loadAllTasks]);

    return {
        tasks,
        loading,
        reloadTasks: loadAllTasks,
    };
}