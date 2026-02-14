import { useState, useEffect } from 'react';
import { Plus, Search, FileText, ExternalLink, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import useAlerts from '../../hooks/useAlerts';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

import Loader from '../../components/ui/Loader';
import Modal from '../../components/ui/Modal';
import CreateFormModal from './components/CreateFormModal'; // Need to create

const Forms = () => {
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addNotification } = useAlerts();
    const navigate = useNavigate();


    const fetchForms = async () => {
        try {
            const { data } = await api.get('/forms');
            setForms(data.data.forms || []);
        } catch (error) {

            addNotification('Failed to fetch forms', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchForms();
    }, []);

    const handleFormCreated = (newForm) => {
        setForms(prev => [newForm, ...prev]);
        setIsModalOpen(false);
        addNotification('Form created successfully', 'success');
    };

    if (loading) return <Loader />;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Form Builder</h1>
                    <p className="text-slate-500 mt-1">Create and manage intake forms and surveys.</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Form
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {forms.map((form) => (
                    <Card key={form.id} className="p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{form.title}</h3>
                                <p className="text-sm text-gray-500">{form.description || 'No description'}</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {form._count?.submissions || 0} Submissions
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-indigo-600"
                                onClick={() => navigate(`/forms/${form.id}`)}
                            >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                            </Button>

                        </div>
                    </Card>
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Form"
            >
                <CreateFormModal onSuccess={handleFormCreated} onCancel={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default Forms;
