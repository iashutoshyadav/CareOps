import { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import api from '../../../services/api';
import { CheckCircle, XCircle, Loader2, AlertCircle, Rocket, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const RequirementItem = ({ label, isMet, link, description }) => (
    <div className={`flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 ${isMet ? 'bg-emerald-50/30 border-emerald-100' : 'bg-white border-gray-100'}`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isMet ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-gray-50 text-gray-300 border border-gray-100'}`}>
            {isMet ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
        </div>
        <div className="flex-1">
            <div className="flex items-center justify-between">
                <span className={`text-base font-black tracking-tight ${isMet ? 'text-gray-900' : 'text-gray-400'}`}>{label}</span>
                {!isMet && link && (
                    <Link to={link} className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-100">
                        CONFIGURE
                    </Link>
                )}
            </div>
            <p className={`text-xs mt-1 ${isMet ? 'text-emerald-700/70 font-medium' : 'text-gray-400'}`}>
                {isMet ? 'Ready to go live.' : description}
            </p>
        </div>
    </div>
);

const ActivationReview = ({ onNext, onBack }) => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activating, setActivating] = useState(false);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const { data: response } = await api.get('/onboarding/status');
                setStatus(response.data.result);
            } catch (error) {
                console.error('Failed to fetch activation status', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStatus();
    }, []);

    const handleActivate = async () => {
        setActivating(true);
        try {
            await api.post('/onboarding/activate');
            onNext();
        } catch (error) {
            console.error('Activation failed', error);
        } finally {
            setActivating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 bg-indigo-600 rounded-full animate-pulse" />
                    </div>
                </div>
                <p className="text-gray-400 text-xs font-black uppercase tracking-widest mt-4">Calibrating Workspace</p>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-fade-in">
            <div className="space-y-4">
                <RequirementItem
                    label="Patient Communication"
                    isMet={status?.integrations}
                    link="/onboarding?step=5"
                    description="Requires at least one verified delivery channel (Email or SMS)."
                />
                <RequirementItem
                    label="Core Clinical Services"
                    isMet={status?.services}
                    link="/onboarding?step=1"
                    description="Requires at least one defined primary clinic service."
                />
                <RequirementItem
                    label="Scheduling Engine"
                    isMet={status?.availability}
                    link="/onboarding?step=2"
                    description="Requires weekly operating hours to be configured."
                />
            </div>

            {status?.isReady ? (
                <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl shadow-indigo-200 group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                        <Rocket className="w-24 h-24" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5 text-indigo-200" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200">System Ready for Launch</span>
                        </div>
                        <h3 className="text-3xl font-black tracking-tight mb-2 italic">Ready to Revolutionize?</h3>
                        <p className="text-indigo-100 text-sm max-w-[320px] leading-relaxed mb-8 opacity-80">
                            Your workspace is perfectly configured. Activate now to go live with your public booking interface.
                        </p>

                        <Button
                            onClick={handleActivate}
                            disabled={activating}
                            className="bg-white text-indigo-600 hover:bg-neutral-50 px-8 py-6 text-lg font-black italic uppercase tracking-tighter shadow-xl shadow-indigo-900/20"
                        >
                            {activating ? 'Launching...' : 'Activate Workspace'}
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="p-8 bg-amber-50 border border-amber-100 rounded-3xl">
                    <div className="flex items-center gap-2 text-amber-700 mb-2">
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Action Required</span>
                    </div>
                    <p className="text-sm text-gray-700 font-bold">
                        Please complete the remaining configuration items above to unlock your workspace launch.
                    </p>
                </div>
            )}

            <div className="flex justify-between pt-6">
                <Button variant="ghost" onClick={onBack} disabled={activating}>
                    Adjust Details
                </Button>
            </div>
        </div>
    );
};

export default ActivationReview;
