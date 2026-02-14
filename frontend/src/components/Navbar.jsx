import { Bell } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import useWorkspace from '../hooks/useWorkspace';
import useAlerts from '../hooks/useAlerts';

const Navbar = () => {
    const { user } = useAuth();
    const { workspace } = useWorkspace();
    // const { notifications } = useAlerts(); // Could show badge count

    return (
        <header className="h-16 bg-white border-b border-slate-200/60 flex items-center justify-between px-8 fixed top-0 right-0 left-64 z-30 transition-all duration-300">
            <div className="flex items-center">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                    {workspace?.name || 'My Workspace'}
                </h2>
            </div>

            <div className="flex items-center gap-6">
                <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors relative rounded-full hover:bg-slate-50">
                    <Bell className="w-5 h-5" />
                    {/* <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span> */}
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                        <p className="text-xs text-slate-500 font-medium">{user?.role}</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20 ring-2 ring-indigo-50">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
