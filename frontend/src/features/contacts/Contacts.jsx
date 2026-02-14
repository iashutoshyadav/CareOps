import { useState, useEffect } from 'react';
import { Plus, Search, Mail, Phone, MoreHorizontal, Download, Trash2 } from 'lucide-react';


import api from '../../services/api';
import useAlerts from '../../hooks/useAlerts';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';
import Modal from '../../components/ui/Modal'; // Need to create this
import CreateContactForm from './CreateContactForm'; // Need to create this

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addNotification } = useAlerts();

    const fetchContacts = async () => {
        try {
            const { data } = await api.get('/contacts');
            setContacts(data.data.contacts || []);
        } catch (error) {

            addNotification('Failed to fetch contacts', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleContactCreated = (newContact) => {
        setContacts(prev => [newContact, ...prev]);
        setIsModalOpen(false);
        addNotification('Contact created successfully', 'success');
    };

    const exportToCSV = () => {
        const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Type'];
        const csvContent = [
            headers.join(','),
            ...contacts.map(c => [c.firstName, c.lastName, c.email || '', c.phone || '', c.type].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `contacts_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        addNotification('Contacts exported to CSV', 'success');
    };

    const handleDeleteContact = async (id) => {
        if (!window.confirm('Are you sure you want to delete this contact?')) return;
        try {
            await api.delete(`/contacts/${id}`);
            setContacts(prev => prev.filter(c => c.id !== id));
            addNotification('Contact deleted', 'success');
        } catch (error) {
            addNotification('Failed to delete contact', 'error');
        }
    };



    if (loading) return <Loader />;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Patients & Clients</h1>
                    <p className="text-slate-500 mt-1">Manage your relationship with patients and external contacts.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" onClick={exportToCSV} disabled={contacts.length === 0}>
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                    </Button>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Contact
                    </Button>
                </div>
            </div>

            <div className="flex items-center space-x-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 transition-all focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-200">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search patients..."
                    className="flex-1 outline-none text-sm text-slate-700 placeholder:text-slate-400"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contacts.map((contact) => (
                    <Card key={contact.id} className="p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                                {contact.firstName[0]}
                            </div>
                            <button
                                onClick={() => handleDeleteContact(contact.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>

                        </div>

                        <h3 className="text-lg font-semibold text-gray-900">
                            {contact.firstName} {contact.lastName}
                        </h3>
                        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 mt-1 mb-4">
                            {contact.type}
                        </span>

                        <div className="space-y-2 text-sm text-gray-500">
                            <div className="flex items-center">
                                <Mail className="w-4 h-4 mr-2" />
                                {contact.email || 'No email'}
                            </div>
                            <div className="flex items-center">
                                <Phone className="w-4 h-4 mr-2" />
                                {contact.phone || 'No phone'}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Contact"
            >
                <CreateContactForm onSuccess={handleContactCreated} onCancel={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default Contacts;
