import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { LayoutGrid, Zap, Shield, BarChart3, ArrowRight, X, Check } from 'lucide-react';
import FadeIn from '../../../components/animations/FadeIn';

const SolutionSection = () => {
    const { openRegister } = useOutletContext();
    return (
        <section className="py-6 bg-white relative overflow-hidden">

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50 rounded-full blur-3xl opacity-60"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 relative z-10">
                <FadeIn>
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-6">
                            Replace the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">fragmented stack</span>
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
                            Stop stitching together disconnected tools. CareOps gives you a complete, unified operating system designed for scale
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">


                    <FadeIn className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6" fullWidth>
                        <div className="lg:col-span-7 bg-slate-50 rounded-3xl border border-slate-200 p-8 relative overflow-hidden group hover:border-indigo-200 transition-colors duration-300 shadow-sm hover:shadow-md">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <LayoutGrid className="w-64 h-64 text-indigo-600" />
                            </div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 border border-slate-200 shadow-sm">
                                    <LayoutGrid className="w-6 h-6 text-indigo-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">Command Center</h3>
                                <p className="text-slate-600 mb-8 max-w-md">
                                    A single pane of glass for your entire operation. Manage bookings, inventory, and staff from one intuitive dashboard
                                </p>


                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                                        <div className="text-sm text-slate-500 mb-1 font-medium">Active Bookings</div>
                                        <div className="text-2xl font-bold text-slate-900">1,248</div>
                                        <div className="text-xs text-emerald-600 mt-2 flex items-center font-medium bg-emerald-50 w-fit px-2 py-1 rounded-full"><Zap className="w-3 h-3 mr-1" /> +12%</div>
                                    </div>
                                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                                        <div className="text-sm text-slate-500 mb-1 font-medium">Revenue</div>
                                        <div className="text-2xl font-bold text-slate-900">84.2k</div>
                                        <div className="text-xs text-emerald-600 mt-2 flex items-center font-medium bg-emerald-50 w-fit px-2 py-1 rounded-full"><BarChart3 className="w-3 h-3 mr-1" /> +5%</div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-8 flex flex-col relative group hover:border-red-200 transition-colors duration-300 shadow-sm hover:shadow-md">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                                    <span className="w-1.5 h-6 bg-red-500 rounded-full mr-3"></span>
                                    Why switch?
                                </h3>

                                <div className="space-y-4">

                                    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50">
                                        <div className="text-slate-500 text-sm font-medium">Typical Stack Cost</div>
                                        <div className="text-red-500 font-mono font-bold">$400+/mo</div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-xl border border-indigo-100 bg-indigo-50/50">
                                        <div className="text-indigo-900 text-sm font-bold">CareOps Cost</div>
                                        <div className="text-emerald-600 font-mono font-bold">$49/mo</div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-slate-100">
                                    <div className="space-y-3">
                                        <div className="flex items-center text-slate-500 text-sm">
                                            <X className="w-4 h-4 text-red-500 mr-3" />
                                            <span>No more data silos</span>
                                        </div>
                                        <div className="flex items-center text-slate-500 text-sm">
                                            <X className="w-4 h-4 text-red-500 mr-3" />
                                            <span>Stop paying for 5+ tools</span>
                                        </div>
                                        <div className="flex items-center text-slate-900 text-sm font-medium mt-4 bg-slate-50 p-2 rounded-lg">
                                            <Check className="w-4 h-4 text-emerald-500 mr-2" />
                                            <span>Everything included in one price</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>


                    <FadeIn delay={0.2} className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6" fullWidth>
                        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 hover:bg-slate-50 transition-colors group cursor-pointer shadow-sm hover:shadow-md">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-600 group-hover:scale-110 transition-transform">
                                <Zap className="w-5 h-5" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-900 mb-2">Automated Flows</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">Triggers emails, SMS, and tasks automatically based on status changes</p>
                        </div>


                        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 hover:bg-slate-50 transition-colors group cursor-pointer shadow-sm hover:shadow-md">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                                <Shield className="w-5 h-5" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-900 mb-2">Enterprise Security</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">Bank-grade encryption and role-based access control for your team.</p>
                        </div>


                        <div className="lg:col-span-4 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 flex flex-col justify-center items-start text-white shadow-lg shadow-indigo-200 group cursor-pointer hover:shadow-xl hover:shadow-indigo-300 transition-shadow">
                            <h4 className="text-xl font-bold mb-2">Ready to upgrade?</h4>
                            <p className="text-indigo-100 text-sm mb-6">Join 500+ care businesses scaling with CareOps.</p>
                            <button onClick={openRegister} className="bg-white text-indigo-700 px-5 py-2.5 rounded-lg font-bold text-sm flex items-center group-hover:bg-indigo-50 transition-colors shadow-sm inline-flex">
                                Get Started <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </FadeIn>

                </div>
            </div>
        </section>
    );
};

export default SolutionSection;
