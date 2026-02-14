import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, ExternalLink, Send } from 'lucide-react';
import api from '../../services/api';
import useAlerts from '../../hooks/useAlerts';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';

const FormDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addNotification } = useAlerts();

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const { data } = await api.get(`/forms/${id}`);
                setForm(data.data.form);
            } catch (error) {

                addNotification('Failed to fetch form details', 'error');
                navigate('/forms');
            } finally {
                setLoading(false);
            }
        };
        fetchForm();
    }, [id, navigate, addNotification]);

    const copySubLink = () => {
        const url = `${window.location.origin}/f/${id}`;
        navigator.clipboard.writeText(url);
        addNotification('Public link copied to clipboard', 'success');
    };

    if (loading) return <Loader />;
    if (!form) return <div>Form not found</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={() => navigate('/forms')}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>
                <h1 className="text-2xl font-bold text-gray-900">{form.title}</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6">
                        <h2 className="text-lg font-bold mb-4">Form Preview</h2>
                        <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300 text-center text-gray-500">
                            Schema Editor & Preview coming soon...
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-lg font-bold mb-4">Recent Submissions</h2>
                        <div className="text-center py-10 text-gray-500">
                            No submissions yet.
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="p-6 bg-indigo-50 border-indigo-100 text-indigo-900">
                        <h3 className="font-bold flex items-center mb-2">
                            <Send className="w-4 h-4 mr-2" />
                            Share Form
                        </h3>
                        <p className="text-sm mb-4">Sharing this link allows anyone to submit responses to this form.</p>
                        <div className="flex gap-2">
                            <Button size="sm" className="flex-1" onClick={copySubLink}>
                                <Copy className="w-4 h-4 mr-2" />
                                Copy Link
                            </Button>
                            <Button size="sm" variant="secondary" onClick={() => window.open(`/f/${id}`, '_blank')}>
                                <ExternalLink className="w-4 h-4" />
                            </Button>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="font-bold mb-4">Settings</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span>Collection Status</span>
                                <span className="font-medium text-green-600">Active</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span>Anonymous Submissions</span>
                                <span className="font-medium">Allowed</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default FormDetail;
