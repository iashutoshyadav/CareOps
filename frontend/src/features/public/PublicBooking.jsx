import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, ChevronRight, CheckCircle, ArrowLeft, Info } from 'lucide-react';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import api from '../../services/api';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Loader from '../../components/ui/Loader';

const PublicBooking = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [workspaceInfo, setWorkspaceInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(1); // 1: Service, 2: Date/Time, 3: Details, 4: Success

    const [selectedService, setSelectedService] = useState(null);
    const [selectedDate, setSelectedDate] = useState(startOfToday());
    const [selectedTime, setSelectedTime] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [isFetchingSlots, setIsFetchingSlots] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        notes: ''
    });

    useEffect(() => {
        const fetchWorkspace = async () => {
            try {
                const { data } = await api.get(`/public/book/${slug}`);
                setWorkspaceInfo(data.data.info);
            } catch (error) {
                console.error('Failed to fetch workspace', error);
            } finally {
                setLoading(false);
            }
        };
        fetchWorkspace();
    }, [slug]);

    useEffect(() => {
        if (workspaceInfo && selectedService && selectedDate) {
            const fetchSlots = async () => {
                setIsFetchingSlots(true);
                try {
                    const { data } = await api.get('/public/slots', {
                        params: {
                            workspaceId: workspaceInfo.id,
                            serviceId: selectedService.id,
                            date: format(selectedDate, 'yyyy-MM-dd')
                        }
                    });
                    setAvailableSlots(data.data.slots);
                } catch (error) {
                    console.error('Failed to fetch slots', error);
                } finally {
                    setIsFetchingSlots(false);
                }
            };
            fetchSlots();
        }
    }, [workspaceInfo, selectedService, selectedDate]);

    const handleConfirmBooking = async () => {
        setLoading(true);
        try {
            await api.post(`/public/book/${slug}/confirm`, {
                data: {
                    title: `${selectedService.name} - ${formData.firstName} ${formData.lastName}`,
                    startTime: new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${selectedTime}:00`),
                    endTime: new Date(new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${selectedTime}:00`).getTime() + selectedService.duration * 60000),
                    notes: formData.notes
                },
                contactInfo: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone
                }
            });
            setStep(4);
        } catch (error) {
            console.error('Booking failed', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading && step !== 4) return <div className="h-screen flex items-center justify-center"><Loader /></div>;
    if (!workspaceInfo && !loading) return <div className="p-8 text-center text-red-500">Workspace not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 py-6 px-4 mb-8">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{workspaceInfo?.name}</h1>
                        <p className="text-gray-500 text-sm">Schedule an appointment online</p>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4">
                {/* Progress Bar */}
                {step < 4 && (
                    <div className="flex items-center justify-between mb-8 px-4">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex flex-col items-center flex-1 relative">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold z-10 ${step >= s ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                                    }`}>
                                    {s}
                                </div>
                                <span className={`text-xs mt-2 font-medium ${step >= s ? 'text-indigo-600' : 'text-gray-400'}`}>
                                    {s === 1 ? 'Service' : s === 2 ? 'Date & Time' : 'Your Details'}
                                </span>
                                {s < 3 && <div className={`absolute top-4 left-[50%] w-full h-0.5 ${step > s ? 'bg-indigo-600' : 'bg-gray-200'}`} />}
                            </div>
                        ))}
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Step 1: Select Service */}
                    {step === 1 && (
                        <div className="p-8 space-y-6">
                            <h2 className="text-xl font-bold text-gray-900">Select a Service</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {workspaceInfo.serviceTypes.map(service => (
                                    <div
                                        key={service.id}
                                        onClick={() => { setSelectedService(service); setStep(2); }}
                                        className="group p-6 rounded-xl border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all cursor-pointer flex items-center justify-between"
                                    >
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">{service.name}</h3>
                                            <p className="text-sm text-gray-500 mt-1">{service.description || 'Professional service at your convenience'}</p>
                                            <div className="mt-2 flex items-center text-xs text-gray-400 font-medium">
                                                <Clock className="w-3 h-3 mr-1" /> {service.duration} mins
                                                {service.price && <span className="mx-2">•</span>}
                                                {service.price && <span>${service.price}</span>}
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 transition-colors" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Select Date & Time */}
                    {step === 2 && (
                        <div className="p-8 space-y-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Services
                                </Button>
                            </div>

                            <h2 className="text-xl font-bold text-gray-900">Choose Date & Time</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Calendar Sidebar (Simplified) */}
                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Select Date</label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {[0, 1, 2, 3, 4, 5, 6].map(offset => {
                                            const date = addDays(startOfToday(), offset);
                                            const isSelected = isSameDay(date, selectedDate);
                                            return (
                                                <button
                                                    key={offset}
                                                    onClick={() => setSelectedDate(date)}
                                                    className={`p-3 rounded-lg text-left text-sm font-medium transition-colors border ${isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {format(date, 'EEEE, MMM do')}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Availability Slots */}
                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Available Slots</label>
                                    {isFetchingSlots ? (
                                        <div className="flex items-center justify-center p-12"><Loader className="w-6 h-6" /></div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-2">
                                            {availableSlots.map(slot => (
                                                <button
                                                    key={slot}
                                                    onClick={() => { setSelectedTime(slot); setStep(3); }}
                                                    className="p-3 rounded-lg text-center text-sm font-bold transition-all border border-gray-200 hover:border-indigo-600 hover:text-indigo-600"
                                                >
                                                    {slot}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Enter Details */}
                    {step === 3 && (
                        <div className="p-8 space-y-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Scheduling
                                </Button>
                            </div>

                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="flex-1 space-y-4">
                                    <h2 className="text-xl font-bold text-gray-900">Your Contact Information</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="First Name"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        />
                                        <Input
                                            label="Last Name"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        />
                                    </div>
                                    <Input
                                        label="Email Address"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    <Input
                                        label="Phone Number"
                                        value={formData.phone}
                                        placeholder="(+1) 123-456-7890"
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Any notes for us?</label>
                                        <textarea
                                            className="w-full flex min-h-[100px] rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            value={formData.notes}
                                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        />
                                    </div>

                                    <Button
                                        className="w-full py-6 text-lg"
                                        onClick={handleConfirmBooking}
                                        disabled={!formData.firstName || !formData.lastName || !formData.email}
                                        isLoading={loading}
                                    >
                                        Confirm Booking
                                    </Button>
                                </div>

                                <div className="w-full md:w-80">
                                    <Card className="p-6 bg-gray-50 border-gray-100 space-y-4">
                                        <h3 className="font-bold text-gray-900 flex items-center">
                                            <Info className="w-4 h-4 mr-2 text-indigo-500" />
                                            Booking Summary
                                        </h3>
                                        <div className="space-y-3 py-4 border-y border-gray-200">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Service:</span>
                                                <span className="font-bold text-gray-900">{selectedService?.name}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Duration:</span>
                                                <span className="text-gray-900 font-medium">{selectedService?.duration} mins</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Date:</span>
                                                <span className="text-gray-900 font-medium">{format(selectedDate, 'MMM do, yyyy')}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Time:</span>
                                                <span className="text-indigo-600 font-bold">{selectedTime}</span>
                                            </div>
                                        </div>
                                        {selectedService?.price && (
                                            <div className="flex justify-between items-center text-lg font-bold">
                                                <span>Total:</span>
                                                <span className="text-indigo-600">${selectedService.price}</span>
                                            </div>
                                        )}
                                    </Card>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Success Message */}
                    {step === 4 && (
                        <div className="p-12 text-center space-y-6">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                                <CheckCircle className="w-12 h-12" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-gray-900">Booking Confirmed!</h2>
                            <p className="text-lg text-gray-500 max-w-md mx-auto">
                                Thank you, {formData.firstName}. Your appointment has been scheduled with {workspaceInfo.name}.
                            </p>
                            <div className="p-6 bg-indigo-50 rounded-2xl max-w-sm mx-auto text-left space-y-2">
                                <p className="text-sm font-bold text-indigo-900 uppercase tracking-widest">Appointment Details</p>
                                <p className="text-indigo-800 font-medium">{selectedService.name}</p>
                                <p className="text-indigo-700">{format(selectedDate, 'EEEE, MMMM do')}</p>
                                <p className="text-indigo-700 font-bold">{selectedTime}</p>
                            </div>
                            <div className="pt-8">
                                <Button variant="outline" onClick={() => window.location.reload()}>
                                    Make Another Booking
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default PublicBooking;
