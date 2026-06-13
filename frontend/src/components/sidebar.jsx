export default function Sidebar({ 
  workspaces, 
  selectedWorkspace, 
  onSelectWorkspace,
  onNewWorkspace,
  onEditWorkspace,
  onRequestDeleteWorkspace,
  onLogout,
  user
}) {
  return (
    <aside className="h-screen bg-primary-800 text-slate-300 flex flex-col">
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20 flex-shrink-0">
            <span className="text-white font-bold text-lg">TM</span>
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-white tracking-tight truncate">OTM</h1>
            <p className="text-xs text-primary-400 truncate">Task Management</p>
          </div>
        </div>
      </div>

      <div className="p-3">
        <button
          onClick={onNewWorkspace}
          className="w-full px-3 py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg hover:shadow-primary-500/30"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="truncate">Шинэ төсөл</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        <div className="px-3 py-2 text-xs font-semibold text-primary-400 uppercase tracking-wider">
          Төсөлүүд
        </div>
        
        <button
          onClick={() => onSelectWorkspace('all')}
          className={`w-full text-left px-3 py-2 rounded-lg mb-1 text-sm flex items-center gap-3 transition ${
            selectedWorkspace === 'all' 
              ? 'bg-primary-900/30 text-white border-l-4 border-primary-500' 
              : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'
          }`}
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
          </svg>
          <span className="truncate">Бүгд</span>
        </button>

        {workspaces.map(workspace => (
          <div 
            key={workspace._id}
            className={`group mb-1 rounded-lg transition ${
              selectedWorkspace === workspace._id 
                ? 'bg-primary-900/30 border-l-4 border-primary-500' 
                : ''
            }`}
          >
            <button
              onClick={() => onSelectWorkspace(workspace._id)}
              className={`w-full text-left px-3 py-2 text-sm flex items-center gap-3 transition ${
                selectedWorkspace === workspace._id ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-lg flex-shrink-0">{workspace.icon || '📁'}</span>
              <span className="flex-1 truncate">{workspace.title}</span>
            </button>
            
            {selectedWorkspace === workspace._id && (
              <div className="flex gap-1 px-2 pb-2">
                <button
                  onClick={(e) => { e.stopPropagation(); onEditWorkspace(workspace); }}
                  className="p-1.5 text-slate-500 hover:text-primary-400 hover:bg-slate-800 rounded transition"
                  title="Засах"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onRequestDeleteWorkspace(workspace._id, workspace.title); ; }}
                  className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded transition"
                  title="Устгах"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        ))}

        {workspaces.length === 0 && (
          <p className="px-3 py-4 text-xs text-slate-500 italic text-center">
            Workspace алга
          </p>
        )}
      </div>

      <div className="p-3 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-sm font-bold shadow-md flex-shrink-0 ring-2 ring-slate-800">
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white font-medium truncate">
              {user?.fullname || user?.username}
            </p>
            <p className="text-xs text-primary-400/80 truncate">
              {user?.email || ''}
            </p>
          </div>
          <button
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition flex-shrink-0"
            title="Гарах"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}