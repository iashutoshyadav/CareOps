import { useState, useEffect } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Mail, MessageSquare, CheckCircle, AlertTriangle, Loader } from 'lucide-react';
import api from '../../../services/api';
import useAlerts from '../../../hooks/useAlerts';

const IntegrationsStep = ({ onNext, onBack }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [integrations, setIntegrations] = useState([]);
    const [isTesting, setIsTesting] = useState(false);
    const { addNotification } = useAlerts();

    // Form States
    const [emailKey, setEmailKey] = useState('');
    const [smsSid, setSmsSid] = useState('');
    const [smsToken, setSmsToken] = useState('');
    const [smsFrom, setSmsFrom] = useState('');

    useEffect(() => {
        fetchIntegrations();
    }, []);

    const fetchIntegrations = async () => {
        try {
            const res = await api.get('/integrations');
            setIntegrations(res.data.data.integrations || []);
        } catch (error) {
            console.error('Failed to fetch integrations', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleConnectEmail = async () => {


        setIsTesting(true);
        try {
            await api.post('/integrations', {
                provider: 'SENDGRID',
                credentials: { apiKey: emailKey }
            });
            addNotification('Email connected successfully!', 'success');
            fetchIntegrations();
            setEmailKey('');
        } catch (error) {
            addNotification(error.response?.data?.message || 'Failed to connect Email', 'error');
        } finally {
            setIsTesting(false);
        }
    };

    const handleConnectSMS = async () => {
        setIsTesting(true);
        try {
            await api.post('/integrations', {
                provider: 'TWILIO',
                credentials: { accountSid: smsSid, authToken: smsToken, fromPhone: smsFrom }
            });
            addNotification('SMS connected successfully!', 'success');
            fetchIntegrations();
            setSmsSid('');
            setSmsToken('');
            setSmsFrom('');
        } catch (error) {
            addNotification(error.response?.data?.message || 'Failed to connect SMS', 'error');
        } finally {
            setIsTesting(false);
        }
    };

    const isConnected = (provider) => integrations.some(i => i.provider === provider && i.isActive);
    const hasAnyConnection = integrations.some(i => i.isActive);

    if (isLoading) return <div className="text-center py-10"><Loader className="animate-spin w-8 h-8 text-indigo-600 mx-auto" /></div>;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 mb-8">
                <p className="text-sm text-gray-600 leading-relaxed">
                    Connect your communication channels. Modern clinics require at least <span className="font-bold text-indigo-600">one active integration</span> to maintain patient engagement.
                </p>
            </div>

            {/* Email Integration */}
            <div className={`p-6 rounded-3xl border transition-all duration-500 ${isConnected('SENDGRID') ? 'border-emerald-200 bg-emerald-50/30' : 'bg-white border-gray-200 shadow-sm'}`}>
                <div className="flex items-start gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${isConnected('SENDGRID') ? 'bg-emerald-500 text-white' : 'bg-indigo-50 text-indigo-600'}`}>
                        <Mail className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                            <h4 className="text-lg font-black text-gray-900 tracking-tight">Email Delivery</h4>
                            {isConnected('SENDGRID') && (
                                <span className="flex items-center text-[10px] font-black text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl uppercase tracking-widest border border-emerald-200">
                                    <CheckCircle className="w-3 h-3 mr-1.5" /> SECURE
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-500 mb-6">Powered by SendGrid. Automation of confirmations and reminders.</p>

                        {!isConnected('SENDGRID') ? (
                            <div className="space-y-4">
                                <Input
                                    label="SendGrid API Key"
                                    placeholder="SG.xxxxxxxxxxxxxxxxxxxxxxxxxx"
                                    value={emailKey}
                                    onChange={(e) => setEmailKey(e.target.value)}
                                    className="bg-gray-50/50 font-mono text-xs"
                                />
                                <p className="text-xs text-gray-400 px-1">
                                    Required for email delivery. You can generate this in your <a href="https://app.sendgrid.com/settings/api_keys" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">SendGrid Dashboard</a>.
                                    <br /><span className="text-indigo-500 font-medium">Or enter 'TEST' or your email to use simulated emails.</span>
                                </p>
                                <Button
                                    onClick={handleConnectEmail}
                                    disabled={!emailKey || isTesting}
                                    size="sm"
                                    variant={emailKey ? 'primary' : 'outline'}
                                    className="w-full"
                                >
                                    {isTesting ? 'Authenticating...' : 'Authorize Email Channel'}
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center text-xs text-emerald-600 font-black uppercase tracking-widest">
                                <CheckCircle className="w-4 h-4 mr-2" /> Connection Operational
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* SMS Integration */}
            <div className={`p-6 rounded-3xl border transition-all duration-500 ${isConnected('TWILIO') ? 'border-emerald-200 bg-emerald-50/30' : 'bg-white border-gray-200 shadow-sm'}`}>
                <div className="flex items-start gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${isConnected('TWILIO') ? 'bg-emerald-500 text-white' : 'bg-blue-50 text-blue-600'}`}>
                        <MessageSquare className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                            <h4 className="text-lg font-black text-gray-900 tracking-tight">SMS Gateway</h4>
                            {isConnected('TWILIO') && (
                                <span className="flex items-center text-[10px] font-black text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl uppercase tracking-widest border border-emerald-200">
                                    <CheckCircle className="w-3 h-3 mr-1.5" /> SECURE
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-500 mb-6">Powered by Twilio. High-priority patient text alerts.</p>

                        {!isConnected('TWILIO') ? (
                            <div className="space-y-4">
                                <Input
                                    placeholder="Twilio Account SID"
                                    value={smsSid}
                                    onChange={(e) => setSmsSid(e.target.value)}
                                    className="bg-gray-50/50"
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Input
                                        type="password"
                                        placeholder="Auth Token"
                                        value={smsToken}
                                        onChange={(e) => setSmsToken(e.target.value)}
                                        className="bg-gray-50/50"
                                    />
                                    <Input
                                        placeholder="Phone Number (+1...)"
                                        value={smsFrom}
                                        onChange={(e) => setSmsFrom(e.target.value)}
                                        className="bg-gray-50/50"
                                    />
                                </div>
                                <Button
                                    onClick={handleConnectSMS}
                                    disabled={!smsSid || !smsToken || !smsFrom || isTesting}
                                    size="sm"
                                    variant={smsSid && smsToken && smsFrom ? 'primary' : 'outline'}
                                    className="w-full"
                                >
                                    {isTesting ? 'Authenticating...' : 'Authorize SMS Channel'}
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center text-xs text-emerald-600 font-black uppercase tracking-widest">
                                <CheckCircle className="w-4 h-4 mr-2" /> Connection Operational
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center pt-10 border-t border-gray-100 gap-6">
                <Button variant="ghost" onClick={onBack}>Go Back</Button>
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    {!hasAnyConnection ? (
                        <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl border border-red-100 animate-pulse">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Channel Required</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Network Verified</span>
                        </div>
                    )}
                    <Button onClick={() => onNext({ skipped: !hasAnyConnection })} size="lg" className="w-full sm:w-auto" variant={hasAnyConnection ? 'primary' : 'outline'}>
                        {hasAnyConnection ? 'Continue to Forms' : 'Skip for now'}
                    </Button>
                </div>
            </div>
        </div >
    );
};

export default IntegrationsStep;
