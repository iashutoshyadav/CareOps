import { useState, useEffect } from 'react';
import { Plus, Search, AlertTriangle, Package, Minus, PlusCircle, Trash2, History } from 'lucide-react';


import api from '../../services/api';
import useAlerts from '../../hooks/useAlerts';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';
import Modal from '../../components/ui/Modal';
import CreateInventoryForm from './components/CreateInventoryForm'; // Need to create

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addNotification } = useAlerts();

    const fetchData = async () => {
        try {
            const [itemsRes, forecastRes] = await Promise.all([
                api.get('/inventory'),
                api.get('/inventory/forecast')
            ]);
            setItems(itemsRes.data.data.items || []);
            setForecast(forecastRes.data.data.forecast || []);
        } catch (error) {
            addNotification('Failed to fetch inventory data', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleItemCreated = (newItem) => {
        setItems(prev => [newItem, ...prev]);
        setIsModalOpen(false);
        addNotification('Item added successfully', 'success');
    };

    const handleUpdateQuantity = async (id, currentQty, delta) => {
        const newQty = Math.max(0, currentQty + delta);
        try {
            const { data: response } = await api.patch(`/inventory/${id}`, { quantity: newQty });
            const updatedItem = response.data.item;
            setItems(prev => prev.map(item => item.id === id ? updatedItem : item));
            addNotification(`Quantity updated: ${newQty}`, 'success');
        } catch (error) {
            addNotification('Failed to update quantity', 'error');
        }
    };

    const handleDeleteItem = async (id) => {
        if (!window.confirm('Delete this item?')) return;
        try {
            await api.delete(`/inventory/${id}`);
            setItems(prev => prev.filter(item => item.id !== id));
            addNotification('Item deleted', 'success');
        } catch (error) {
            addNotification('Failed to delete item', 'error');
        }
    };


    if (loading) return <Loader />;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Inventory Management</h1>
                    <p className="text-slate-500 mt-1">Track supplies, monitor usage, and predict shortages.</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                </Button>
            </div>

            <div className="flex items-center space-x-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 transition-all focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-200">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search inventory..."
                    className="flex-1 outline-none text-sm text-slate-700 placeholder:text-slate-400"
                />
            </div>

            {forecast.length > 0 && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Package className="w-5 h-5 text-blue-600" />
                        <h2 className="text-lg font-bold text-blue-900">Inventory Forecast (Next 7 Days)</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {forecast.map(item => (
                            <div key={`forecast-${item.id}`} className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm">
                                <p className="font-bold text-gray-900">{item.name}</p>
                                <p className="text-xs text-gray-500 mb-2">Projected: <span className="text-red-600 font-bold">{item.projectedQuantity}</span> remaining</p>
                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="bg-blue-500 h-full transition-all"
                                        style={{ width: `${Math.max(10, (item.projectedQuantity / item.threshold) * 50)}%` }}
                                    />
                                </div>
                                <p className="text-[10px] text-blue-600 mt-2 font-medium">Predicted from {item.usageCount} upcoming bookings</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <Card key={item.id} className="p-6 relative overflow-hidden">
                        {item.quantity <= item.threshold && (
                            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-lg flex items-center">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Low Stock
                            </div>
                        )}

                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                                <Package className="w-6 h-6" />
                            </div>
                            <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="text-gray-300 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>


                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">{item.sku || 'No SKU'}</p>

                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-semibold">Quantity</p>
                                <div className="flex items-center gap-3">
                                    <p className={`text-2xl font-bold ${item.quantity <= item.threshold ? 'text-red-600' : 'text-gray-900'
                                        }`}>
                                        {item.quantity}
                                    </p>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                                            className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                                            className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            <PlusCircle className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500 uppercase font-semibold">Usage rate</p>
                                <p className="text-sm font-medium text-indigo-600">
                                    {item.usagePerBooking || 0} / booking
                                </p>
                                <p className="text-xs text-gray-400 mt-2">${item.price || '0.00'}</p>
                            </div>
                        </div>

                    </Card>
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add Inventory Item"
            >
                <CreateInventoryForm onSuccess={handleItemCreated} onCancel={() => setIsModalOpen(false)} />
            </Modal>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                    <History className="w-4 h-4 text-gray-400" />
                    <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Recent Activity</h2>
                </div>
                <div className="divide-y divide-gray-50">
                    {[
                        { id: 1, action: 'Stock Added', item: 'Gloves', count: '+50', time: '2 mins ago' },
                        { id: 2, action: 'Item Used', item: 'Masks', count: '-10', time: '1 hour ago' },
                        { id: 3, action: 'New Item', item: 'Scalpel', count: '10', time: '4 hours ago' },
                    ].map(log => (
                        <div key={log.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${log.count.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                    }`}>
                                    {log.count}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">{log.action}</p>
                                    <p className="text-xs text-gray-500">{log.item}</p>
                                </div>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">{log.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Inventory;

