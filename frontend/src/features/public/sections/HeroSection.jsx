import { Play, Activity, Users, Calendar, FileText, MessageSquare, Bell, Search, Menu } from 'lucide-react';
import Button from '../../../components/ui/Button';
import FadeIn from '../../../components/animations/FadeIn';

const HeroSection = ({ openRegister }) => {
    return (
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#6366f110_100%)]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <FadeIn delay={0.1}>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
                        Stop Juggling Tools<br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                            Start Running Your Business
                        </span>
                    </h1>

                    <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-500 mb-10 leading-relaxed">
                        One platform for bookings, communication, forms, and inventory — built for service businesses tired of operational chaos.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
                        <Button
                            onClick={openRegister}
                            size="lg"
                            className="rounded-full px-8 py-4 text-lg font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            Start Free Trial
                        </Button>
                        <Button
                            onClick={() => { }} // Placeholder for demo video modal
                            variant="secondary"
                            size="lg"
                            className="rounded-full px-8 py-4 text-lg font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center"
                        >
                            <Play className="w-4 h-4 mr-2 fill-slate-700" />
                            Watch Demo
                        </Button>
                    </div>
                </FadeIn>


                <FadeIn delay={0.3} direction="up" className="relative max-w-5xl mx-auto mt-8">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-2xl shadow-indigo-500/10">
                        {/* Dashboard Mockup */}
                        <div className="w-full h-full bg-slate-50 flex flex-col text-left">
                            {/* Mock Navbar */}
                            <div className="h-12 bg-white border-b border-slate-200 flex items-center justify-between px-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-xs">C</div>
                                    <div className="hidden sm:block text-slate-400 text-xs">Dashboard / Overview</div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-64 hidden sm:block h-8 bg-slate-50 rounded-lg border border-slate-200 flex items-center px-3">
                                        <Search className="w-3 h-3 text-slate-400 mr-2" />
                                        <div className="w-16 h-2 bg-slate-200 rounded-full"></div>
                                    </div>
                                    <Bell className="w-4 h-4 text-slate-400" />
                                    <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
                                </div>
                            </div>

                            <div className="flex-1 flex overflow-hidden">
                                {/* Mock Sidebar */}
                                <div className="w-16 sm:w-48 bg-white border-r border-slate-200 flex flex-col py-4 space-y-4">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="px-4 flex items-center space-x-3 opacity-60">
                                            <div className="w-5 h-5 bg-slate-200 rounded"></div>
                                            <div className="hidden sm:block w-20 h-2 bg-slate-200 rounded-full"></div>
                                        </div>
                                    ))}
                                </div>

                                {/* Mock Content */}
                                <div className="flex-1 p-4 sm:p-6 overflow-hidden">
                                    <div className="flex justify-between items-end mb-6">
                                        <div>
                                            <div className="w-32 h-4 bg-slate-200 rounded-full mb-2"></div>
                                            <div className="w-48 h-2 bg-slate-100 rounded-full"></div>
                                        </div>
                                        <div className="w-24 h-8 bg-indigo-600 rounded-lg"></div>
                                    </div>

                                    {/* Mock Stats Grid */}
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                        {[
                                            { label: "Bookings", val: "12", color: "indigo" },
                                            { label: "Revenue", val: "$2.4k", color: "emerald" },
                                            { label: "Patients", val: "148", color: "blue" },
                                            { label: "Tasks", val: "5", color: "orange" }
                                        ].map((stat, i) => (
                                            <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                                <div className={`w-8 h-8 rounded-lg bg-${stat.color}-50 flex items-center justify-center mb-3`}>
                                                    <div className={`w-4 h-4 bg-${stat.color}-500 rounded`}></div>
                                                </div>
                                                <div className="text-xl font-bold text-slate-800">{stat.val}</div>
                                                <div className="text-xs text-slate-400">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Mock List */}
                                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
                                        <div className="w-32 h-4 bg-slate-200 rounded-full mb-4"></div>
                                        {[1, 2, 3].map((j) => (
                                            <div key={j} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100"></div>
                                                    <div>
                                                        <div className="w-24 h-2 bg-slate-200 rounded-full mb-1"></div>
                                                        <div className="w-16 h-2 bg-slate-100 rounded-full"></div>
                                                    </div>
                                                </div>
                                                <div className="w-12 h-4 bg-emerald-50 rounded text-emerald-600 text-[10px] flex items-center justify-center font-bold">PAID</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <button
                                onClick={openRegister}
                                className="bg-white/95 backdrop-blur-md px-8 py-4 rounded-full border border-indigo-100 shadow-2xl shadow-indigo-500/20 transform translate-y-12 transition-all duration-300 hover:scale-105 hover:-translate-y-12 hover:shadow-indigo-500/40 cursor-pointer group"
                            >
                                <span className="text-slate-900 font-bold flex items-center text-lg">
                                    <div className="relative flex h-3 w-3 mr-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                    </div>
                                    Interactive Live Demo
                                    <Play className="w-4 h-4 ml-3 fill-slate-900 group-hover:text-indigo-600 group-hover:fill-indigo-600 transition-colors" />
                                </span>
                            </button>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default HeroSection;
