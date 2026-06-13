import { useState, useRef, useEffect, useCallback } from 'react';
import { useSensor, useSensors, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useAuth } from '../../context/authcontext';
import Sidebar from '../../components/sidebar';
import TaskModal from '../../components/taskmodal';
import WorkspaceModal from '../../components/workspacemodal';
import TopBar from './components/topbar';
import TaskTable from '../../components/tasktable';
import BoardView from './components/boardview';
import EmptyState from './components/emptystate';
import WelcomeState from './components/welcomestate';
import DashboardOverview from './components/overview';
import { useWorkspaces } from './hooks/useWorkspaces';
import { useTasks , useOverviewTasks} from './hooks/useTasks';
import ConfirmModal from "../../components/confirmmodal.jsx";

const SIDEBAR_MIN = 240;
const SIDEBAR_MAX = 400;
const SIDEBAR_DEFAULT = 288;
const SIDEBAR_STORAGE_KEY = 'opm_sidebar_width';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const workspaceHook = useWorkspaces();
    const taskHook = useTasks(workspaceHook.selectedWorkspace);
    const overviewHook = useOverviewTasks();

    const [viewMode, setViewMode] = useState('Жагсаалт');
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const [sidebarWidth, setSidebarWidth] = useState(() => {
        if (typeof window === 'undefined') return SIDEBAR_DEFAULT;
        const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
        if (saved) {
            const num = parseInt(saved, 10);
            if (!isNaN(num) && num >= SIDEBAR_MIN && num <= SIDEBAR_MAX) return num;
        }
        return SIDEBAR_DEFAULT;
    });

    const isResizing = useRef(false);

    const startResize = useCallback((e) => {
        isResizing.current = true;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        e.preventDefault();
    }, []);

    const stopResize = useCallback(() => {
        if (isResizing.current) {
            isResizing.current = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            setSidebarWidth(prev => {
                localStorage.setItem(SIDEBAR_STORAGE_KEY, String(prev));
                return prev;
            });
        }
    }, []);

    const doResize = useCallback((e) => {
        if (!isResizing.current) return;
        let newWidth = e.clientX;
        if (newWidth < SIDEBAR_MIN) newWidth = SIDEBAR_MIN;
        if (newWidth > SIDEBAR_MAX) newWidth = SIDEBAR_MAX;
        setSidebarWidth(newWidth);
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', doResize);
        window.addEventListener('mouseup', stopResize);
        return () => {
            window.removeEventListener('mousemove', doResize);
            window.removeEventListener('mouseup', stopResize);
        };
    }, [doResize, stopResize]);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleLogout = () => { logout(); window.location.href = '/login'; };
    const handleNewTask = () => { setEditingTask(null); setIsTaskModalOpen(true); };
    const handleEditTask = (task) => { setEditingTask(task); setIsTaskModalOpen(true); };
    const handleCloseTaskModal = () => { setIsTaskModalOpen(false); setEditingTask(null); };

    const handleSaveTask = async (data) => {
        const result = await taskHook.saveTask({
            ...editingTask, ...data,
            workspaceId: workspaceHook.selectedWorkspace,
        });
        if (!result.success) alert('Алдаа: ' + result.error);
        else overviewHook.reloadTasks();
    };

    const handleSaveWorkspace = async (data) => {
        const result = await workspaceHook.saveWorkspace(data);
        if (!result.success) alert('Алдаа: ' + result.error);
        else overviewHook.reloadTasks();
    };

    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        type: null,
        itemId: null,
        itemName: ''
    });
    const [isDeleting, setIsDeleting] = useState(false);

    const openDeleteModal = (type, id, name = '') => {
        setDeleteModal({ isOpen: true, type, itemId: id, itemName: name });
    };

    const closeDeleteModal = () => {
        setDeleteModal({ isOpen: false, type: null, itemId: null, itemName: '' });
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            if (deleteModal.type === 'task') {
                await taskHook.deleteTask(deleteModal.itemId);
                overviewHook.reloadTasks();
            } else if (deleteModal.type === 'workspace') {
                await workspaceHook.deleteWorkspace(deleteModal.itemId);
                overviewHook.reloadTasks();
            }
            closeDeleteModal();
        } catch (error) {
            console.error('❌ Устгахад алдаа гарлаа:', error);
            alert('Устгах үйлдэл амжилтгүй боллоо.');
        } finally {
            setIsDeleting(false);
        }
    };

    const currentWorkspace = workspaceHook.workspaces.find(w => w._id === workspaceHook.selectedWorkspace);
    const pageTitle = currentWorkspace?.title || 'Бүх Tasks';

    return (
        <div className="flex h-screen overflow-hidden bg-primary-50/30">
            <div 
                className="relative flex-shrink-0 h-full"
                style={{ width: `${sidebarWidth}px` }}
            >
                <Sidebar
                    workspaces={workspaceHook.workspaces}
                    selectedWorkspace={workspaceHook.selectedWorkspace}
                    onSelectWorkspace={workspaceHook.setSelectedWorkspace}
                    onNewWorkspace={workspaceHook.openCreateModal}
                    onEditWorkspace={workspaceHook.openEditModal}
                    onRequestDeleteWorkspace={(id, name) => openDeleteModal('workspace', id, name)}
                    onLogout={handleLogout}
                    user={user}
                />
                <div
                    onMouseDown={startResize}
                    className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary-500 active:bg-primary-600 transition-colors z-30 group"
                >
                    <div className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex flex-col gap-0.5">
                            <div className="w-0.5 h-1 bg-primary-400 rounded-full"></div>
                            <div className="w-0.5 h-1 bg-primary-400 rounded-full"></div>
                            <div className="w-0.5 h-1 bg-primary-400 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <div className="flex-1 overflow-y-auto">
                    
                    {workspaceHook.selectedWorkspace === 'all' ? (
                        <div className="p-8">
                            <DashboardOverview
                                tasks={overviewHook.tasks}
                                workspaces={workspaceHook.workspaces}
                                onTaskClick={handleEditTask}
                            />
                        </div>

                    ):workspaceHook.workspaces.length === 0 ? (
                        <WelcomeState onCreateWorkspace={workspaceHook.openCreateModal} />
                    ) : !workspaceHook.selectedWorkspace ? (
                        <div className="flex items-center justify-center h-full text-primary-400 font-medium">
                            Workspace сонгоно уу
                        </div>
                    ) : (
                        <>
                            <div className="sticky top-0 z-10 bg-primary-50/80 backdrop-blur-md border-b border-primary-100">
                                <TopBar
                                    pageTitle={pageTitle}
                                    taskCount={taskHook.tasks.length}
                                    searchQuery={taskHook.searchQuery}
                                    onSearchChange={taskHook.setSearchQuery}
                                    viewMode={viewMode}
                                    onViewModeChange={setViewMode}
                                    onNewTask={handleNewTask}
                                    canCreateTask={workspaceHook.workspaces.length > 0}
                                    sortOption={taskHook.sortOption}
                                    setSortOption={taskHook.setSortOption}
                                    filters={taskHook.filters}
                                    setFilter={taskHook.setFilter}
                                />
                            </div>

                            <div className="p-8 pt-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-primary-900">Бүх Task-ууд</h3>
                                    <p className="text-sm text-primary-500">
                                        Нийт {taskHook.totalTasks} task-аас {taskHook.tasks.length} харуулж байна
                                    </p>
                                </div>

                                {taskHook.tasks.length === 0 ? (
                                    <EmptyState hasSearch={!!taskHook.searchQuery} />
                                ) : (
                                    <>
                                        {viewMode === 'Жагсаалт' && (
                                            <TaskTable 
                                                tasks={taskHook.tasks}
                                                onEdit={handleEditTask}
                                                onRequestDelete={(id, name) => openDeleteModal('task', id, name)}
                                            />
                                        )}
                                        {viewMode === 'Самбар' && (
                                            <BoardView 
                                                tasks={taskHook.tasks} 
                                                onTaskClick={handleEditTask} 
                                            />
                                        )}
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </main>

            <WorkspaceModal 
                isOpen={workspaceHook.isWorkspaceModalOpen} 
                onClose={workspaceHook.closeModal} 
                onSave={handleSaveWorkspace} 
                initialData={workspaceHook.editingWorkspace} 
            />
            <TaskModal 
                isOpen={isTaskModalOpen} 
                onClose={handleCloseTaskModal} 
                onSave={handleSaveTask} 
                initialData={editingTask} 
                selectedWorkspace={workspaceHook.selectedWorkspace}
                workspaces={workspaceHook.workspaces}
            />
            <ConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={closeDeleteModal}
                onConfirm={handleConfirmDelete}
                isLoading={isDeleting}
                title={deleteModal.type === 'workspace' ? 'Workspace устгах' : 'Task устгах'}
                message={
                    deleteModal.type === 'workspace'
                        ? `"${deleteModal.itemName}" workspace болон түүнд хамаарах бүх task-ууд бүрмөсөн устна. Энэ үйлдлийг буцаах боломжгүй.`
                        : `"${deleteModal.itemName}" task-ыг устгахдаа итгэлтэй байна уу?`
                }
                confirmText="Тийм, устгах"
                cancelText="Үгүй, цуцлах"
            />
        </div>
    );
}