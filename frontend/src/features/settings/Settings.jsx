import { useState, useEffect } from 'react';
import { Save, Globe, Clock, MessageSquare, Shield, Check, Terminal } from 'lucide-react';
import api from '../../services/api';
import useAlerts from '../../hooks/useAlerts';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Loader from '../../components/ui/Loader';
import useWorkspace from '../../hooks/useWorkspace';


const Settings = () => {
    const { workspace, setWorkspace } = useWorkspace();
    const { addNotification } = useAlerts();
    const [activeTab, setActiveTab] = useState('general');
    const [loading, setLoading] = useState(false);

    // General Settings State
    const [workspaceData, setWorkspaceData] = useState({
        name: '',
        slug: ''
    });

    // Integrity State
    const [integrations, setIntegrations] = useState([]);

    // Availability State
    const [availability, setAvailability] = useState([]);

    useEffect(() => {
        if (workspace) {
            setWorkspaceData({
                name: workspace.name || '',
                slug: workspace.slug || ''
            });
            fetchIntegrations();
            fetchAvailability();
        }
    }, [workspace]);

    const fetchIntegrations = async () => {
        try {
            const { data } = await api.get('/integrations');
            setIntegrations(data.data.integrations || []);
        } catch (error) {
            console.error('Failed to fetch integrations', error);
        }
    };

    const fetchAvailability = async () => {
        try {
            const { data } = await api.get('/workspace/availability');
            setAvailability(data.data.availability || []);
        } catch (error) {
            console.error('Failed to fetch availability', error);
        }
    };

    const handleSaveGeneral = async () => {
        setLoading(true);
        try {
            const { data } = await api.patch('/workspace', workspaceData);
            setWorkspace(data.data.workspace);
            addNotification('Workspace settings updated', 'success');
        } catch (error) {
            addNotification('Failed to update workspace', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveAvailability = async () => {
        setLoading(true);
        try {
            await api.put('/workspace/availability', availability);
            addNotification('Availability updated', 'success');
        } catch (error) {
            addNotification('Failed to update availability', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleIntegrationToggle = async (provider, isActive) => {
        // Logic for toggling integration
    };

    const handleTestConnection = async (provider) => {
        setLoading(true);
        try {
            // Mock test for now or call a real endpoint if it exists
            await new Promise(resolve => setTimeout(resolve, 1000));
            addNotification(`${provider} connection successful`, 'success');
        } catch (error) {
            addNotification(`Failed to connect to ${provider}`, 'error');
        } finally {
            setLoading(false);
        }
    };


    const tabs = [
        { id: 'general', label: 'General', icon: Globe },
        { id: 'availability', label: 'Availability', icon: Clock },
        { id: 'integrations', label: 'Integrations', icon: MessageSquare },
        { id: 'security', label: 'Security', icon: Shield },
    ];

    if (!workspace) return <Loader />;

    return (
        <div className="space-y-6 max-w-5xl">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            </div>

            <div className="flex gap-8">
                {/* Sidebar Tabs */}
                <div className="w-64 space-y-1">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === tab.id
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    <Card className="p-8">
                        {activeTab === 'general' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 mb-1">General Settings</h2>
                                    <p className="text-sm text-gray-500">Configure your workspace identity and public URL.</p>
                                </div>
                                <div className="space-y-4 max-w-md">
                                    <Input
                                        label="Workspace Name"
                                        value={workspaceData.name}
                                        onChange={(e) => setWorkspaceData({ ...workspaceData, name: e.target.value })}
                                    />
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Public Booking Slug</label>
                                        <div className="flex items-center gap-2">
                                            <div className="bg-gray-100 px-3 py-2 rounded-lg text-sm text-gray-500 border border-gray-200">
                                                careops.com/book/
                                            </div>
                                            <input
                                                className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                value={workspaceData.slug}
                                                onChange={(e) => setWorkspaceData({ ...workspaceData, slug: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <Button onClick={handleSaveGeneral} isLoading={loading}>
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'availability' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 mb-1">Operating Hours</h2>
                                    <p className="text-sm text-gray-500">Set your weekly schedule for public bookings.</p>
                                </div>
                                <div className="space-y-4">
                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, idx) => {
                                        const dayData = availability.find(a => a.dayOfWeek === idx + 1) || { dayOfWeek: idx + 1, startTime: '09:00', endTime: '17:00', isActive: true };
                                        return (
                                            <div key={day} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <div className="flex items-center gap-4 w-40">
                                                    <input
                                                        type="checkbox"
                                                        checked={dayData.isActive}
                                                        className="w-4 h-4 text-indigo-600 rounded"
                                                        onChange={(e) => {
                                                            const newAvailability = [...availability];
                                                            const existingIdx = newAvailability.findIndex(a => a.dayOfWeek === idx + 1);
                                                            if (existingIdx >= 0) {
                                                                newAvailability[existingIdx].isActive = e.target.checked;
                                                            } else {
                                                                newAvailability.push({ ...dayData, isActive: e.target.checked });
                                                            }
                                                            setAvailability(newAvailability);
                                                        }}
                                                    />
                                                    <span className="font-medium text-sm text-gray-900">{day}</span>
                                                </div>
                                                <div className="flex-1 flex justify-center items-center gap-4">
                                                    <input
                                                        type="time"
                                                        value={dayData.startTime}
                                                        className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
                                                        onChange={(e) => {
                                                            const newAvailability = [...availability];
                                                            const existingIdx = newAvailability.findIndex(a => a.dayOfWeek === idx + 1);
                                                            if (existingIdx >= 0) newAvailability[existingIdx].startTime = e.target.value;
                                                            setAvailability(newAvailability);
                                                        }}
                                                    />
                                                    <span className="text-gray-400">to</span>
                                                    <input
                                                        type="time"
                                                        value={dayData.endTime}
                                                        className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
                                                        onChange={(e) => {
                                                            const newAvailability = [...availability];
                                                            const existingIdx = newAvailability.findIndex(a => a.dayOfWeek === idx + 1);
                                                            if (existingIdx >= 0) newAvailability[existingIdx].endTime = e.target.value;
                                                            setAvailability(newAvailability);
                                                        }}
                                                    />
                                                </div>
                                                <div className="w-20 text-right">
                                                    {!dayData.isActive && <span className="text-xs font-bold text-red-400 uppercase">Closed</span>}
                                                    {dayData.isActive && <span className="text-xs font-bold text-green-400 uppercase">Open</span>}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className="pt-4">
                                        <Button onClick={handleSaveAvailability} isLoading={loading}>
                                            <Save className="w-4 h-4 mr-2" />
                                            Update Schedule
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'integrations' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 mb-1">Integrations</h2>
                                    <p className="text-sm text-gray-500">Connect your favorite tools to automate communications.</p>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        { id: 'twilio', name: 'Twilio SMS', description: 'Send automated SMS reminders to your clients.', icon: MessageSquare },
                                        { id: 'sendgrid', name: 'SendGrid Email', description: 'Professional email delivery for bookings and forms.', icon: Terminal },
                                    ].map(prov => {
                                        const Icon = prov.icon;
                                        const isConnected = integrations.some(i => i.provider === prov.id && i.isActive);
                                        return (
                                            <div key={prov.id} className="p-6 rounded-2xl border border-gray-100 hover:border-indigo-100 transition-all flex items-start justify-between bg-white shadow-sm hover:shadow-md">
                                                <div className="flex gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                                                        <Icon className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-gray-900">{prov.name}</h3>
                                                        <p className="text-sm text-gray-500 max-w-sm mt-1">{prov.description}</p>
                                                        {isConnected && (
                                                            <div className="mt-3 flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit">
                                                                <Check className="w-3 h-3" />
                                                                CONNECTED
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    {isConnected && (
                                                        <Button variant="outline" size="sm" onClick={() => handleTestConnection(prov.id)} isLoading={loading}>
                                                            Test Connection
                                                        </Button>
                                                    )}
                                                    <Button variant={isConnected ? "outline" : "primary"} size="sm">
                                                        {isConnected ? "Configure" : "Connect"}
                                                    </Button>
                                                </div>

                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Settings;
