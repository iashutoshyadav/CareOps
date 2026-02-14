import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Users, Shield } from 'lucide-react';

const StaffSetup = ({ data, updateData, onNext, onBack }) => {
    // Assuming 'user' is available in the scope or passed as a prop,
    // for the purpose of this edit, we'll assume it's accessible.
    // If 'user' is not defined, it will default to 'U' and 'You'.
    const user = data.user; // Placeholder: You might need to adjust where 'user' comes from

    return (
        <div className="space-y-8">
            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 shrink-0">
                    <Users className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900">Collaboration Engine</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Add your team members to help manage bookings and communications. You can assign granular permissions later.
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="p-5 bg-white rounded-2xl border border-gray-200 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-200">
                            {user?.name?.[0] || 'U'}
                        </div>
                        <div>
                            <p className="text-base font-black text-gray-900 leading-tight">{user?.name || 'You'} (Owner)</p>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Full Administrative Access</p>
                        </div>
                    </div>
                    <div className="flex items-center text-[10px] font-black text-green-600 bg-green-50 px-3 py-1.5 rounded-xl border border-green-100 tracking-widest">
                        <Shield className="w-3 h-3 mr-1.5" /> ONLINE
                    </div>
                </div>

                <div className="group p-8 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white hover:border-indigo-400 transition-all duration-300">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 group-hover:text-indigo-600 group-hover:scale-110 transition-all mb-3 shadow-sm">
                        <Users className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-bold text-gray-900">Invite Staff Member</p>
                    <p className="text-xs text-gray-400 mt-1">Click to add team members to your workspace.</p>
                </div>
            </div>

            <div className="flex justify-between pt-10 border-t border-gray-100">
                <Button variant="ghost" onClick={onBack}>Go Back</Button>
                <Button onClick={onNext} size="lg">
                    Continue to Integrations
                </Button>
            </div>
        </div>
    );
};

export default StaffSetup;
