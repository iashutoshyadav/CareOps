import { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import { FileText, Plus, Trash2, Upload, CheckCircle, Loader2 } from 'lucide-react';
import api from '../../../services/api';
import useAlerts from '../../../hooks/useAlerts';

const FormSetup = ({ data, updateData, onNext, onBack }) => {
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [uploading, setUploading] = useState(false);
    const { addNotification } = useAlerts();

    // New Form State
    const [newForm, setNewForm] = useState({ title: '', type: 'JSON', fileUrl: '' });

    useEffect(() => {
        fetchForms();
    }, []);

    const fetchForms = async () => {
        try {
            const { data: response } = await api.get('/forms');
            setForms(response.data.forms || []);
        } catch (error) {
            console.error('Failed to fetch forms', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateForm = async () => {
        if (!newForm.title) return;
        try {
            const payload = {
                title: newForm.title,
                type: newForm.type,
                schema: newForm.type === 'JSON' ? { fields: [] } : undefined,
                fileUrl: newForm.type === 'PDF' ? newForm.fileUrl : undefined
            };
            const { data: response } = await api.post('/forms', payload);
            setForms([...forms, response.data.form]);
            setNewForm({ title: '', type: 'JSON', fileUrl: '' });
            setIsCreating(false);
            addNotification('Form added successfully', 'success');
        } catch (error) {
            addNotification('Failed to create form', 'error');
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file || file.type !== 'application/pdf') {
            addNotification('Please upload a PDF file', 'error');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const { data: response } = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setNewForm({ ...newForm, fileUrl: response.data.url, type: 'PDF' });
            addNotification('PDF uploaded and verified!', 'success');
        } catch (error) {
            addNotification('Upload failed', 'error');
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 mb-8">
                <p className="text-sm text-gray-600 leading-relaxed">
                    Build your clinical intake flow. Add custom digital forms or upload existing medical PDF documents for automated processing.
                </p>
            </div>

            <div className="grid gap-4">
                {forms.map(form => (
                    <div key={form.id} className="group flex items-center justify-between p-5 bg-white border border-gray-200 rounded-2xl hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <p className="text-base font-black text-gray-900 leading-tight">{form.title}</p>
                                <div className="flex items-center gap-2 mt-1.5">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                                        {form.type} Engine
                                    </span>
                                    {form.type === 'PDF' && <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest italic">OCR Verified</span>}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
                        </div>
                    </div>
                ))}

                {isCreating ? (
                    <div className="p-8 bg-gray-50 border border-gray-200 rounded-3xl animate-in zoom-in-95 duration-300 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 rounded-full bg-indigo-600" />
                            <h4 className="font-black text-gray-800 text-sm italic uppercase tracking-wider">New Form Definition</h4>
                        </div>

                        <Input
                            placeholder="Form Title (e.g. Health Declaration)"
                            value={newForm.title}
                            onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
                            className="bg-white"
                        />

                        <div className="flex gap-4">
                            <button
                                onClick={() => setNewForm({ ...newForm, type: 'JSON' })}
                                className={`flex-1 py-3 px-4 rounded-2xl border text-xs font-black uppercase tracking-widest transition-all ${newForm.type === 'JSON' ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200' : 'bg-white text-gray-400 border-gray-100 hover:border-indigo-200'}`}
                            >
                                JSON Builder
                            </button>
                            <button
                                onClick={() => setNewForm({ ...newForm, type: 'PDF' })}
                                className={`flex-1 py-3 px-4 rounded-2xl border text-xs font-black uppercase tracking-widest transition-all ${newForm.type === 'PDF' ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200' : 'bg-white text-gray-400 border-gray-100 hover:border-indigo-200'}`}
                            >
                                PDF Upload
                            </button>
                        </div>

                        {newForm.type === 'PDF' && (
                            <div className="mt-2 text-center">
                                {newForm.fileUrl ? (
                                    <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-700 animate-in fade-in duration-500">
                                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                            <CheckCircle className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-widest">Document Synchronized</span>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-3xl cursor-pointer hover:border-indigo-400 hover:bg-white transition-all group">
                                        {uploading ? (
                                            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                                        ) : (
                                            <>
                                                <Upload className="w-8 h-8 text-gray-300 group-hover:text-indigo-600 group-hover:scale-110 transition-all mb-2" />
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Patient PDF</span>
                                            </>
                                        )}
                                        <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} disabled={uploading} />
                                    </label>
                                )}
                            </div>
                        )}

                        <div className="flex justify-end gap-3 pt-4">
                            <Button variant="ghost" size="sm" onClick={() => setIsCreating(false)}>Cancel</Button>
                            <Button size="sm" onClick={handleCreateForm} disabled={!newForm.title || (newForm.type === 'PDF' && !newForm.fileUrl)}>
                                Add Document
                            </Button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsCreating(true)}
                        className="group flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-100 rounded-3xl text-gray-400 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/20 transition-all duration-500"
                    >
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-white group-hover:shadow-md transition-all">
                            <Plus className="w-6 h-6" />
                        </div>
                        <span className="font-black uppercase tracking-widest text-[10px]">Add New Intake Source</span>
                    </button>
                )}
            </div>

            <div className="flex justify-between pt-10 border-t border-gray-100">
                <Button variant="ghost" onClick={onBack}>Go Back</Button>
                <Button onClick={onNext} disabled={forms.length === 0} size="lg">
                    Continue to Review
                </Button>
            </div>
        </div>
    );
};

export default FormSetup;
