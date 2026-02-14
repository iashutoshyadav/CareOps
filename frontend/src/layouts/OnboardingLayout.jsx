import { Outlet } from 'react-router-dom';
import { OnboardingProvider, useOnboarding } from '../context/OnboardingContext';
import { CheckCircle2, Circle, Layout, Briefcase, Clock, Package, Users, Cpu, FileText, Rocket } from 'lucide-react';

const STEPS = [
    { id: 'workspace', title: 'Workspace', icon: Layout },
    { id: 'services', title: 'Services', icon: Briefcase },
    { id: 'availability', title: 'Availability', icon: Clock },
    { id: 'inventory', title: 'Inventory', icon: Package },
    { id: 'staff', title: 'Staff', icon: Users },
    { id: 'integrations', title: 'Integrations', icon: Cpu },
    { id: 'forms', title: 'Forms', icon: FileText },
    { id: 'review', title: 'Review', icon: Rocket },
];

const ProgressSidebar = () => {
    const { currentStep } = useOnboarding();

    return (
        <div className="space-y-6">
            {STEPS.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                    <div key={step.id} className="flex items-center gap-4 group">
                        <div className={`
                            w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                            ${isActive ? 'bg-white text-indigo-600 shadow-lg scale-110' :
                                isCompleted ? 'bg-indigo-400/30 text-white' : 'bg-indigo-400/10 text-indigo-300'}
                        `}>
                            {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                            <p className={`text-sm font-bold tracking-wide uppercase ${isActive ? 'text-white' : isCompleted ? 'text-indigo-200' : 'text-indigo-300'}`}>
                                {step.title}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const OnboardingLayoutContent = () => {
    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row font-outfit">
            {/* Left Side: Branding & Progress (Context) */}
            <div className="md:w-[400px] bg-indigo-600 text-white relative overflow-hidden hidden md:flex flex-col h-screen sticky top-0">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

                <div className="relative z-10 p-8 md:p-12 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-12 shrink-0">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-700/50">
                            <div className="w-6 h-6 bg-indigo-600 rounded-lg" />
                        </div>
                        <h1 className="text-2xl font-black tracking-tighter uppercase italic">CareOps</h1>
                    </div>

                    <ProgressSidebar />
                </div>
            </div>

            {/* Right Side: Step Content */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-white relative">
                <div className="w-full max-w-2xl relative z-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

const OnboardingLayout = () => {
    return (
        <OnboardingProvider>
            <OnboardingLayoutContent />
        </OnboardingProvider>
    );
};

export default OnboardingLayout;
