import { useState, useEffect } from 'react';
import { Mail, Search, User } from 'lucide-react';
import api from '../../services/api';
import useAlerts from '../../hooks/useAlerts';
import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';

const Inbox = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMsg, setSelectedMsg] = useState(null);
    const [reply, setReply] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sending, setSending] = useState(false);
    const { addNotification } = useAlerts();

    const fetchMessages = async () => {
        try {
            const { data: response } = await api.get('/inbox');
            setMessages(response.data.messages || []);
        } catch (error) {

            addNotification('Failed to fetch messages', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleSendMessage = async () => {
        if (!reply.trim()) return;
        setSending(true);
        try {
            const { data: response } = await api.post('/inbox', {
                content: reply,
                receiverId: selectedMsg.senderId === 'ME' ? selectedMsg.receiverId : selectedMsg.senderId,
                contactId: selectedMsg.contactId
            });
            setMessages([response.data.message, ...messages]);
            if (selectedMsg.contact) {
                selectedMsg.contact.isManualMode = true; // Optimistic update
            }
            setReply('');
            addNotification('Message sent. Manual Mode activated.', 'success');
        } catch (error) {
            addNotification('Failed to send message', 'error');
        } finally {
            setSending(false);
        }
    };

    const filteredMessages = messages.filter(msg =>
        msg.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.sender?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );


    if (loading) return <Loader />;

    return (
        <div className="h-[calc(100vh-8rem)] flex gap-6">
            {/* Thread List */}
            <Card className="w-1/3 flex flex-col overflow-hidden border-slate-100 shadow-sm">
                <div className="p-4 border-b border-slate-100 bg-white/50 backdrop-blur-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Inbox</h2>
                    <div className="flex items-center space-x-2 bg-slate-50 p-2 rounded-xl border border-slate-100 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                        <Search className="w-4 h-4 text-slate-400" />
                        <input
                            className="bg-transparent outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {filteredMessages.length === 0 ? (
                        <div className="p-12 text-center text-gray-500 text-sm">No messages found.</div>
                    ) : (
                        filteredMessages.map(msg => (
                            <div
                                key={msg.id}
                                onClick={() => setSelectedMsg(msg)}
                                className={`p-4 border-b border-gray-100 cursor-pointer transition-all border-l-4 ${selectedMsg?.id === msg.id
                                    ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-100'
                                    : 'hover:bg-gray-50 border-transparent'
                                    }`}
                            >
                                <div className="flex justify-between mb-1">
                                    <span className="font-semibold text-gray-900 truncate">
                                        {msg.sender?.name || 'External Contact'}
                                    </span>
                                    <span className="text-[10px] text-gray-400 font-medium">
                                        {new Date(msg.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 truncate">{msg.content || 'No content'}</p>
                            </div>
                        ))
                    )}
                </div>

            </Card>

            {/* Message View */}
            <Card className="flex-1 flex flex-col bg-white overflow-hidden">
                {selectedMsg ? (
                    <>
                        <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                    {selectedMsg.sender?.name?.[0] || 'C'}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{selectedMsg.sender?.name || 'External Contact'}</h3>
                                    <p className="text-xs text-gray-500">{selectedMsg.sender?.email || 'via Webhook'}</p>
                                </div>
                            </div>
                            {selectedMsg.contact?.isManualMode && (
                                <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full border border-amber-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                    Manual Mode Active (Automation Paused)
                                </span>
                            )}
                        </div>

                        <div className="flex-1 p-6 overflow-y-auto bg-slate-50 space-y-4">
                            <div className="max-w-[80%] bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                                <p className="text-sm text-gray-800 leading-relaxed">{selectedMsg.content}</p>
                                <span className="text-[10px] text-gray-400 mt-2 block">
                                    {new Date(selectedMsg.createdAt).toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-200 bg-white">
                            <div className="flex gap-2">
                                <textarea
                                    className="flex-1 min-h-[50px] max-h-[150px] p-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-all"
                                    placeholder="Type your reply..."
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={sending || !reply.trim()}
                                    className="px-6 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                                >
                                    {sending ? '...' : 'Send'}
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-center p-8">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                            <Mail className="w-10 h-10 text-gray-200" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Your Communication Hub</h3>
                        <p className="text-sm text-gray-500 max-w-xs mt-2">Select a message from the left to view the full conversation and send a reply.</p>
                    </div>
                )}
            </Card>

        </div>
    );
};

export default Inbox;
