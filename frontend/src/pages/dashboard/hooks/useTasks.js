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

    // ✅ fetchParams-д бүх параметр багтсан
    const fetchParams = useMemo(() => {
        return {
            workspaceId: selectedWorkspace,
            page: currentPage,
            limit: pageSize,
            sortBy: sortOption,
            priority: filters.priority,
            status: filters.status,
            category: filters.category,
            search: searchQuery,
        };
    }, [selectedWorkspace, currentPage, pageSize, sortOption, filters, searchQuery]);

    // ✅ loadTasks-ийг useCallback-ээр wrap хийх
    const loadTasks = useCallback(async () => {
        if (!selectedWorkspace) {
            setTasks([]);
            setTotalTasks(0);
            return;
        }

        try {
            setLoading(true);

            const params = new URLSearchParams();
            Object.entries(fetchParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    params.append(key, value);
                }
            });

            // ✅ Console.log нэмэх - request-д юу явагдаж байгааг харах
            console.log('📤 Fetching tasks with params:', params.toString());
            console.log('📤 Full URL:', `/workspace/getlazy/${selectedWorkspace}?${params.toString()}`);

            const res = await api.get(`/workspace/getlazy/${selectedWorkspace}?${params.toString()}`);

            if (res.data.success) {
                setTasks(res.data.data.tasks || []);
                setTotalTasks(res.data.data.total || 0);
            }
        } catch (err) {
            console.error('Tasks авахад алдаа:', err);
            setTasks([]);
            setTotalTasks(0);
        } finally {
            setLoading(false);
        }
    }, [selectedWorkspace, fetchParams]);

    // ✅ fetchParams өөрчлөгдөхөд дахин ачаалах
    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    // ✅ Filter өөрчлөх → page 1 рүү буцах
    const setFilter = (key, value) => {
        console.log(`🔍 Filter changed: ${key} = ${value}`);
        setFilters(prev => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    };

    // ✅ Sort өөрчлөх → page 1 рүү буцах
    const changeSortOption = (value) => {
        console.log(`📊 Sort changed: ${value}`);
        setSortOption(value);
        setCurrentPage(1);
    };

    // ✅ Page size өөрчлөх → page 1 рүү буцах
    const changePageSize = (value) => {
        console.log(`📄 Page size changed: ${value}`);
        setPageSize(value);
        setCurrentPage(1);
    };

    // ✅ Search өөрчлөх → page 1 рүү буцах
    const changeSearchQuery = (value) => {
        console.log(` Search changed: ${value}`);
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const saveTask = async (data) => {
        try {
            if (data._id) {
                await api.patch(`/task/update/${data._id}?workspaceId=${selectedWorkspace}`, data);
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
        setSearchQuery: changeSearchQuery,  // ✅ Wrapper функц
        setFilter,
        sortOption,
        setSortOption: changeSortOption,    // ✅ Wrapper функц
        pageSize,
        setPageSize: changePageSize,        // ✅ Wrapper функц
        currentPage,
        setCurrentPage,
        totalPages,
        saveTask,
        deleteTask,
        reloadTasks: loadTasks,
    };
}