import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Inbox,
    Calendar,
    Users,
    FileText,
    Package,
    UserCog,
    Settings as SettingsIcon,
    LogOut
} from 'lucide-react';

import useAuth from '../hooks/useAuth';
import clsx from 'clsx';

const Sidebar = () => {
    const { logout, user } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
        // Use timeout to ensure navigation happens before state update triggers PrivateRoute redirect
        setTimeout(() => {
            logout();
        }, 100);
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Inbox, label: 'Inbox', path: '/inbox' },
        { icon: Calendar, label: 'Bookings', path: '/bookings' },
        { icon: Users, label: 'Contacts', path: '/contacts' },
        { icon: FileText, label: 'Forms', path: '/forms' },
        { icon: Package, label: 'Inventory', path: '/inventory' },
        { icon: UserCog, label: 'Staff', path: '/staff', adminOnly: true },
        { icon: SettingsIcon, label: 'Settings', path: '/settings', adminOnly: true },
    ];

    const filteredItems = navItems.filter(item => !item.adminOnly || user?.role === 'ADMIN');




    return (
        <aside className="w-64 bg-white border-r border-slate-100 h-screen flex flex-col fixed left-0 top-0 z-40 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)]">
            <div className="h-20 flex items-center px-8 border-b border-slate-50">
                <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">C</div>
                    CareOps
                </span>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {filteredItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            clsx(
                                'flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 mx-3 mb-1 group relative',
                                isActive
                                    ? 'bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            )
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon className={clsx(
                                    "w-5 h-5 mr-3 transition-colors",
                                    isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                                )} />
                                {item.label}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
