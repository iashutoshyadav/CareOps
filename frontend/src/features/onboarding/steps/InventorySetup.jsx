import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Package } from 'lucide-react';

const InventorySetup = ({ data, updateData, onNext, onBack }) => {
    return (
        <div className="space-y-8">
            <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100 flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-orange-600 shrink-0">
                    <Package className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900">Inventory Intelligence</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Track essential medical supplies automatically. Every service performed will deduct from your stock in real-time.
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 opacity-5">
                        <Package className="w-16 h-16 text-indigo-600" />
                    </div>

                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex flex-col items-center justify-center text-[10px] font-black text-gray-400 border border-gray-100">
                        SKU
                        <span className="text-indigo-600 text-xs">A-102</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-base font-black text-gray-900 leading-tight">Exam Gloves (Nitrile)</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="inline-flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pr-2 border-r border-gray-100">Active Tracking</span>
                            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest pl-2">System Managed</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Standard Stock</p>
                        <p className="text-2xl font-black text-indigo-600 tracking-tight">500 <span className="text-xs font-bold text-gray-400">units</span></p>
                    </div>
                </div>

                <p className="text-xs text-center text-gray-400 italic bg-gray-50 py-3 rounded-xl border border-dashed border-gray-200">
                    Your base inventory is automatically initialized using community defaults.
                </p>
            </div>

            <div className="flex justify-between pt-10 border-t border-gray-100">
                <Button variant="ghost" onClick={onBack}>Go Back</Button>
                <Button onClick={onNext} size="lg">
                    Continue to Staff
                </Button>
            </div>
        </div>
    );
};

export default InventorySetup;
