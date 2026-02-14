import { useState, useEffect } from 'react';
import { Plus, Search, Mail, Shield, Trash2 } from 'lucide-react';

import api from '../../services/api';
import useAlerts from '../../hooks/useAlerts';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';
import Modal from '../../components/ui/Modal';
import InviteStaffForm from './components/InviteStaffForm'; // Need to create

const Staff = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addNotification } = useAlerts();

    const fetchStaff = async () => {
        try {
            const { data } = await api.get('/staff');
            setStaff(data.data.staff || []);

        } catch (error) {
            addNotification('Failed to fetch staff', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    const handleStaffAdded = (newStaff) => {
        setStaff(prev => [newStaff, ...prev]);
        setIsModalOpen(false);
        addNotification('Staff member added', 'success');
    };

    const handleRemoveStaff = async (id) => {
        if (!window.confirm('Are you sure you want to remove this staff member?')) return;
        try {
            await api.delete(`/staff/${id}`);
            setStaff(prev => prev.filter(s => s.id !== id));
            addNotification('Staff member removed', 'success');
        } catch (error) {
            addNotification('Failed to remove staff', 'error');
        }
    };


    if (loading) return <Loader />;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Staff Management</h1>
                    <p className="text-slate-500 mt-1">Manage team members, roles, and permissions.</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Invite Staff
                </Button>
            </div>

            <div className="flex items-center space-x-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 transition-all focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-200">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search staff..."
                    className="flex-1 outline-none text-sm text-slate-700 placeholder:text-slate-400"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staff.map((member) => (
                    <Card key={member.id} className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                                    {member.name[0]}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Shield className="w-3 h-3 mr-1" />
                                        {member.role}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemoveStaff(member.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>


                        <div className="pt-4 border-t border-gray-100 text-sm text-gray-500">
                            <div className="flex items-center">
                                <Mail className="w-4 h-4 mr-2" />
                                {member.email}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Invite Staff Member"
            >
                <InviteStaffForm onSuccess={handleStaffAdded} onCancel={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default Staff;
