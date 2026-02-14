import { useState, useEffect, useContext } from 'react';
import {
    Users,
    Calendar,
    FileText,
    UserCog,
    AlertTriangle,
    MessageSquare,
    CheckCircle,
    ArrowRight,
    Package
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Card from '../../components/ui/Card';
import useAlerts from '../../hooks/useAlerts';
import FadeIn from '../../components/animations/FadeIn';
import api from '../../services/api';

// --- Components ---

const MetricCard = ({ label, value, icon: Icon, colorBg, colorText }) => (
    <Card className="p-6 flex items-center space-x-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className={`p-3 rounded-full ${colorBg} ${colorText}`}>
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-2xl font-bold text-gray-900">{value !== undefined ? value : '-'}</p>
        </div>
    </Card>
);

const AlertItem = ({ alert }) => (
    <Link to={alert.link} className="block group">
        <div className={`flex items-center justify-between p-4 rounded-lg transition-colors border ${alert.type === 'forecast'
            ? 'bg-blue-50 border-blue-100 hover:bg-blue-100'
            : 'bg-orange-50 border-orange-100 hover:bg-orange-100'
            }`}>
            <div className="flex items-center space-x-3">
                {alert.type === 'forecast' ? (
                    <Package className="w-5 h-5 text-blue-600" />
                ) : (
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                )}
                <div className="flex flex-col">
                    <span className={`font-medium ${alert.type === 'forecast' ? 'text-blue-900 group-hover:text-blue-950' : 'text-orange-900 group-hover:text-orange-950'}`}>
                        {alert.message}
                    </span>
                    {alert.type === 'forecast' && (
                        <span className="text-[10px] text-blue-600 font-medium">Predicted based on upcoming bookings</span>
                    )}
                </div>
            </div>
            <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${alert.type === 'forecast' ? 'text-blue-400' : 'text-orange-400'}`} />
        </div>
    </Link>
);

const ActivityItem = ({ item }) => (
    <div className="flex flex-col py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 rounded-md transition-colors cursor-pointer">
        <span className="text-sm text-gray-900 font-medium">{item.text}</span>
        <span className="text-xs text-gray-400 mt-1">{new Date(item.time).toLocaleString()}</span>
    </div>
);

const AppointmentItem = ({ appt }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
        <div className="flex items-center space-x-3">
            <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900">{new Date(appt.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <span className="text-xs text-gray-500">{new Date(appt.time).toLocaleDateString()}</span>
            </div>
        </div>
        <div className="text-right">
            <div className="text-sm font-medium text-gray-900">{appt.name}</div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${appt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {appt.status}
            </span>
        </div>
    </div>
);

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { addNotification } = useAlerts();

    const isAdmin = user?.role === 'ADMIN';

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/dashboard/stats');
                console.log("Dashboard Data:", response.data); // Debugging
                setStats(response.data.data.stats);

            } catch (error) {
                console.error("Dashboard fetch error:", error);
                // Don't show error notification immediately to avoid annoyance if it's just empty
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, [addNotification]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    // Default empty state if stats is null
    const metrics = stats?.metrics || { bookingsToday: 0, newInquiries: 0, pendingForms: 0, activeStaff: 0 };
    const alerts = stats?.alerts || [];
    const upcoming = stats?.upcoming || [];
    const activity = stats?.activity || [];
    const bookingStats = stats?.bookingStats || { completed: 0, upcoming: 0, noShows: 0 };
    const formStats = stats?.formStats || { pending: 0, overdue: 0, completed: 0 };

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* 1. Header */}
            <FadeIn>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Operations Overview</h1>
                    <p className="text-slate-500 mt-2 text-lg">Here's what's happening in your business today.</p>
                </div>
            </FadeIn>

            {/* 2. Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Today's Bookings", value: metrics.bookingsToday, icon: Calendar, color: "bg-indigo-50 text-indigo-600" },
                    { label: "New Inquiries", value: metrics.newInquiries, icon: MessageSquare, color: "bg-blue-50 text-blue-600" },
                    { label: "Pending Forms", value: metrics.pendingForms, icon: FileText, color: "bg-amber-50 text-amber-600" },
                    { label: isAdmin ? "Total Staff" : "Assigned View", value: metrics.activeStaff, icon: UserCog, color: "bg-emerald-50 text-emerald-600" }
                ].map((metric, idx) => (
                    <FadeIn key={idx} delay={idx * 0.1} direction="up">
                        <Card className="p-6 flex items-center space-x-4 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow h-full">
                            <div className={`p-4 rounded-xl ${metric.color}`}>
                                <metric.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">{metric.label}</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">{metric.value !== undefined ? metric.value : '-'}</p>
                            </div>
                        </Card>
                    </FadeIn>
                ))}
            </div>

            {/* 3. Alerts Section (CRITICAL) */}
            <FadeIn delay={0.2}>
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center">
                        <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
                        Action Required
                    </h2>
                    {alerts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {alerts.map((alert, idx) => (
                                <AlertItem key={alert.id || idx} alert={alert} />
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700 flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            All clear! No urgent items.
                        </div>
                    )}
                </div>
            </FadeIn>

            {/* 4. Two-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column (2/3 width on large screens) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Upcoming Appointments */}
                    <FadeIn delay={0.3} direction="up">
                        <Card className="p-6 h-full">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-slate-900">Upcoming Appointments</h3>
                                <Link to="/bookings" className="text-sm text-indigo-600 hover:text-indigo-700 font-bold flex items-center">
                                    View Calendar <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                            <div className="space-y-1">
                                {upcoming.length > 0 ? (
                                    upcoming.map(appt => <AppointmentItem key={appt.id} appt={appt} />)
                                ) : (
                                    <p className="text-slate-400 text-sm py-4 italic">No upcoming appointments.</p>
                                )}
                            </div>
                        </Card>
                    </FadeIn>

                    {/* Bookings Summary */}
                    <FadeIn delay={0.4} direction="up">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Card className="p-4 bg-white border border-slate-200/60 text-center">
                                <p className="text-3xl font-bold text-slate-900">{bookingStats.completed}</p>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">Completed (Total)</p>
                            </Card>
                            <Card className="p-4 bg-white border border-slate-200/60 text-center">
                                <p className="text-3xl font-bold text-indigo-600">{bookingStats.upcoming}</p>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">Upcoming</p>
                            </Card>
                            <Card className="p-4 bg-white border border-slate-200/60 text-center">
                                <p className="text-3xl font-bold text-rose-500">{bookingStats.noShows}</p>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">No-Shows</p>
                            </Card>
                        </div>
                    </FadeIn>
                </div>

                {/* Right Column (1/3 width on large screens) */}
                <div className="space-y-8">
                    {/* Forms Status */}
                    <FadeIn delay={0.4} direction="up">
                        <Card className="p-6">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Forms Status</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center group cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors">
                                    <span className="text-sm font-medium text-slate-600">Pending Completion</span>
                                    <span className="text-sm font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">{formStats.pending}</span>
                                </div>
                                <div className="flex justify-between items-center group cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors">
                                    <span className="text-sm font-medium text-slate-600">Overdue</span>
                                    <span className="text-sm font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md">{formStats.overdue}</span>
                                </div>
                                <div className="flex justify-between items-center group cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors">
                                    <span className="text-sm font-medium text-slate-600">Completed (Total)</span>
                                    <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">{formStats.completed}</span>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-100">
                                <Link to="/forms" className="text-sm text-indigo-600 hover:text-indigo-700 font-bold flex items-center justify-center group">
                                    Manage Forms <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </Card>
                    </FadeIn>

                    {/* Recent Activity */}
                    <FadeIn delay={0.5} direction="up">
                        <Card className="p-6">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
                            <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {activity.length > 0 ? (
                                    activity.map((item, idx) => <ActivityItem key={item.id || idx} item={item} />)
                                ) : (
                                    <p className="text-slate-400 text-sm py-4 italic">No recent activity.</p>
                                )}
                            </div>
                        </Card>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
