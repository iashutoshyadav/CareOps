import { useState, useEffect } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Plus, Trash2, Clock, DollarSign, Loader, Briefcase } from 'lucide-react';
import api from '../../../services/api';

const ServicesStep = ({ onNext, onBack }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);

    // Form State
    const [isAdding, setIsAdding] = useState(false);
    const [newService, setNewService] = useState({ name: '', duration: 60, price: 0, description: '' });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await api.get('/services');
            setServices(res.data.data.services || []);
        } catch (error) {
            console.error('Failed to fetch services', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddService = async () => {
        try {
            await api.post('/services', newService);
            fetchServices();
            setIsAdding(false);
            setNewService({ name: '', duration: 60, price: 0, description: '' });
        } catch (error) {
            console.error('FAILED TO ADD SERVICE:', error.response?.data || error.message);
            alert('Failed to add service: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure?')) return;
        try {
            await api.delete(`/services/${id}`);
            fetchServices();
        } catch (error) {
            console.error('FAILED TO DELETE SERVICE:', error.response?.data || error.message);
            alert('Failed to delete service');
        }
    };

    if (isLoading) return <div className="text-center py-10"><Loader className="animate-spin w-8 h-8 text-indigo-600 mx-auto" /></div>;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 mb-8">
                <p className="text-sm text-gray-600 leading-relaxed">
                    Define the primary services your clinic provides. You can add more detailed services later in your settings.
                </p>
            </div>

            {/* Service List */}
            <div className="grid grid-cols-1 gap-4">
                {services.map(service => (
                    <div key={service.id} className="group flex justify-between items-center p-5 bg-white border border-gray-200 rounded-2xl hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                <Briefcase className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-black text-gray-900 leading-tight">{service.name}</h4>
                                <div className="flex items-center gap-3 mt-1.5">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                                        <Clock className="w-3 h-3 mr-1" /> {service.duration} min
                                    </span>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-50 text-[10px] font-bold text-green-700 uppercase tracking-wider">
                                        <DollarSign className="w-3 h-3 mr-1 text-green-600" /> ${service.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => handleDelete(service.id)} className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2.5 rounded-xl transition-all">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}

                {services.length === 0 && !isAdding && (
                    <div className="text-center py-12 px-6 bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-2xl">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-400 mx-auto mb-4 shadow-sm">
                            <Plus className="w-6 h-6" />
                        </div>
                        <p className="font-bold text-gray-900">No services yet</p>
                        <p className="text-xs text-gray-500 mt-1">Add your first service to continue onboarding.</p>
                    </div>
                )}
            </div>

            {/* Add Service Section */}
            {isAdding ? (
                <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl animate-in zoom-in-95 duration-300">
                    <h4 className="font-black text-gray-800 mb-6 text-sm flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-600" />
                        Create New Service
                    </h4>
                    <div className="space-y-4">
                        <Input
                            placeholder="Service Name (e.g. Initial Consultation)"
                            value={newService.name}
                            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Duration (min)"
                                type="number"
                                value={newService.duration ?? ''}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    setNewService({ ...newService, duration: isNaN(val) ? undefined : val });
                                }}
                            />
                            <Input
                                label="Price ($)"
                                type="number"
                                value={newService.price ?? ''}
                                onChange={(e) => {
                                    const val = parseFloat(e.target.value);
                                    setNewService({ ...newService, price: isNaN(val) ? undefined : val });
                                }}
                            />
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                            <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>Cancel</Button>
                            <Button size="sm" onClick={handleAddService} disabled={!newService.name}>Add Service</Button>
                        </div>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsAdding(true)}
                    className="group w-full py-4 border-2 border-dashed border-indigo-200 text-indigo-600 rounded-2xl hover:bg-indigo-50 hover:border-indigo-400 transition-all flex items-center justify-center font-bold tracking-tight"
                >
                    <Plus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" /> Add Service
                </button>
            )}

            <div className="flex justify-between pt-10 border-t border-gray-100">
                <Button variant="ghost" onClick={onBack}>Go Back</Button>
                <Button onClick={onNext} disabled={services.length === 0}>
                    Next: Set Availability
                </Button>
            </div>
        </div>
    );
};

export default ServicesStep;
