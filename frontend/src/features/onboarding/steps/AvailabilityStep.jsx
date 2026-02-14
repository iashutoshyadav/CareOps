import { useState, useEffect } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { Loader } from 'lucide-react';
import api from '../../../services/api';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const AvailabilityStep = ({ onNext, onBack }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [availability, setAvailability] = useState([]);

    useEffect(() => {
        fetchAvailability();
    }, []);

    const fetchAvailability = async () => {
        try {
            const res = await api.get('/workspaces/availability');

            // Initialize with all days if empty
            let data = res.data.data.availability || [];
            if (data.length === 0) {
                data = DAYS.map((day, idx) => ({
                    dayOfWeek: idx,
                    startTime: '09:00',
                    endTime: '17:00',
                    isActive: idx !== 0 && idx !== 6 // Default Mon-Fri
                }));
            } else {
                // Merge with defaults to ensure all days present
                data = DAYS.map((day, idx) => {
                    const existing = data.find(d => d.dayOfWeek === idx);
                    return existing || { dayOfWeek: idx, startTime: '09:00', endTime: '17:00', isActive: false };
                });
            }
            setAvailability(data);
        } catch (error) {
            console.error('Failed to fetch availability', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleDay = (idx) => {
        const newData = [...availability];
        newData[idx].isActive = !newData[idx].isActive;
        setAvailability(newData);
    };

    const handleChangeTime = (idx, field, value) => {
        const newData = [...availability];
        newData[idx][field] = value;
        setAvailability(newData);
    };

    const handleSave = async () => {
        try {
            await api.put('/workspaces/availability', availability);
            onNext();
        } catch (error) {
            alert('Failed to save availability');
        }
    };

    if (isLoading) return <div className="text-center py-10"><Loader className="animate-spin w-8 h-8 text-indigo-600 mx-auto" /></div>;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 mb-8">
                <p className="text-sm text-gray-600 leading-relaxed">
                    Set your standard weekly operating hours. Your staff will be available for bookings during these times.
                </p>
            </div>

            <div className="space-y-3">
                {availability.map((slot, idx) => (
                    <div key={idx} className={`flex items-center p-4 rounded-2xl transition-all duration-300 ${slot.isActive ? 'bg-white border border-gray-200 shadow-sm' : 'bg-gray-50/50 border border-transparent opacity-60'}`}>
                        <div className="w-36 flex items-center gap-3">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={slot.isActive}
                                    onChange={() => handleToggleDay(idx)}
                                />
                                <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                            <span className={`text-sm font-black uppercase tracking-tight ${slot.isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                                {DAYS[idx]}
                            </span>
                        </div>

                        {slot.isActive ? (
                            <div className="flex items-center gap-4 flex-1">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="time"
                                        className="bg-gray-50 px-3 py-1.5 border border-transparent rounded-xl text-sm font-bold text-gray-700 focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all"
                                        value={slot.startTime}
                                        onChange={(e) => handleChangeTime(idx, 'startTime', e.target.value)}
                                    />
                                    <span className="text-gray-300 font-bold">—</span>
                                    <input
                                        type="time"
                                        className="bg-gray-50 px-3 py-1.5 border border-transparent rounded-xl text-sm font-bold text-gray-700 focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all"
                                        value={slot.endTime}
                                        onChange={(e) => handleChangeTime(idx, 'endTime', e.target.value)}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1.5 rounded-lg">Closed</div>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex justify-between pt-10 border-t border-gray-100">
                <Button variant="ghost" onClick={onBack}>Go Back</Button>
                <Button onClick={handleSave} size="lg">
                    Continue to Inventory
                </Button>
            </div>
        </div>
    );
};

export default AvailabilityStep;
