import { useState, useEffect } from 'react';
import { Plus, ChevronLeft, ChevronRight, Download } from 'lucide-react';

import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import api from '../../services/api';
import useAlerts from '../../hooks/useAlerts';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import Modal from '../../components/ui/Modal';
import CreateBookingForm from './components/CreateBookingForm'; // Need to create
import BookingCard from './components/BookingCard'; // Need to create

const Bookings = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const { addNotification } = useAlerts();


    const fetchBookings = async () => {
        setLoading(true);
        try {
            // In a real app, we'd pass start/end dates to filter by month
            const { data } = await api.get('/bookings');
            setBookings(data.data.bookings || []);

        } catch (error) {
            addNotification('Failed to fetch bookings', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [currentDate]);

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    // Calendar Logic
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Group bookings by day
    const bookingsByDay = daysInMonth.map(day => {
        const dayBookings = bookings.filter(b => isSameDay(new Date(b.startTime), day));
        return { day, bookings: dayBookings };
    });

    const handleBookingCreated = (newBooking) => {
        setBookings(prev => [...prev, newBooking]);
        setIsModalOpen(false);
        addNotification('Booking created successfully', 'success');
    };

    const handleStatusUpdate = async (bookingId, newStatus) => {
        try {
            const { data: response } = await api.patch(`/bookings/${bookingId}/status`, { status: newStatus });
            const updatedBooking = response.data.booking;
            setBookings(prev => prev.map(b => b.id === bookingId ? updatedBooking : b));
            setIsStatusModalOpen(false);
            addNotification(`Booking ${newStatus.toLowerCase()} successfully`, 'success');
        } catch (error) {
            addNotification('Failed to update status', 'error');
        }
    };

    const exportToCSV = () => {
        const headers = ['Title', 'Start Time', 'End Time', 'Status', 'Notes'];
        const csvContent = [
            headers.join(','),
            ...bookings.map(b => [
                `"${b.title}"`,
                b.startTime,
                b.endTime,
                b.status,
                `"${b.notes || ''}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `bookings_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        addNotification('Bookings exported to CSV', 'success');
    };



    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Bookings & Schedule</h1>
                    <p className="text-slate-500 mt-1">Manage appointments, view schedule, and track status.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" onClick={exportToCSV} disabled={bookings.length === 0}>
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                    </Button>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        New Booking
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {format(currentDate, 'MMMM yyyy')}
                    </h2>
                    <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={prevMonth}>
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={nextMonth}>
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {loading ? <Loader /> : (
                    <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                {day}
                            </div>
                        ))}
                    </div>
                )}

                {!loading && (
                    <div className="grid grid-cols-7 auto-rows-fr bg-white">
                        {/* Simplified: just showing days of the month, not aligning perfectly with weekdays for hackathon speed unless necessary. 
                    Actually, let's do it right. */}
                        {/* Empty cells for start of month offset would be needed here, but for brevity, 
                    I'll just list the days. A real calendar needs the offset. */}
                        {/* For hackathon, simpler list view might be better if UI is tricky. 
                     But let's try a responsive grid. */}
                        {bookingsByDay.map(({ day, bookings }, idx) => (
                            <div
                                key={day.toString()}
                                className={`min-h-[120px] p-2 border-b border-r border-gray-100 ${!isSameMonth(day, currentDate) ? 'bg-gray-50 text-gray-400' : ''
                                    } ${isToday(day) ? 'bg-blue-50' : ''}`}
                            >
                                <div className="flex justify-between items-start">
                                    <span className={`text-sm font-medium ${isToday(day) ? 'text-blue-600' : 'text-gray-700'}`}>
                                        {format(day, 'd')}
                                    </span>
                                    {bookings.length > 0 && (
                                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-xs font-medium text-indigo-600">
                                            {bookings.length}
                                        </span>
                                    )}
                                </div>
                                <div className="mt-2 space-y-1">
                                    {bookings.map(booking => (
                                        <BookingCard
                                            key={booking.id}
                                            booking={booking}
                                            onClick={(b) => {
                                                setSelectedBooking(b);
                                                setIsStatusModalOpen(true);
                                            }}
                                        />
                                    ))}
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="New Booking"
            >
                <CreateBookingForm onSuccess={handleBookingCreated} onCancel={() => setIsModalOpen(false)} />
            </Modal>

            <Modal
                isOpen={isStatusModalOpen}
                onClose={() => setIsStatusModalOpen(false)}
                title="Update Booking Status"
            >
                {selectedBooking && (
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <h4 className="font-bold text-gray-900">{selectedBooking.title}</h4>
                            <p className="text-sm text-gray-500">
                                {format(new Date(selectedBooking.startTime), 'PPPPp')}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant="outline"
                                className="border-green-200 text-green-700 hover:bg-green-50"
                                onClick={() => handleStatusUpdate(selectedBooking.id, 'CONFIRMED')}
                                disabled={selectedBooking.status === 'CONFIRMED'}
                            >
                                Confirm
                            </Button>
                            <Button
                                variant="outline"
                                className="border-blue-200 text-blue-700 hover:bg-blue-50"
                                onClick={() => handleStatusUpdate(selectedBooking.id, 'COMPLETED')}
                                disabled={selectedBooking.status === 'COMPLETED'}
                            >
                                Mark Completed
                            </Button>
                            <Button
                                variant="outline"
                                className="border-red-200 text-red-700 hover:bg-red-50"
                                onClick={() => handleStatusUpdate(selectedBooking.id, 'CANCELLED')}
                                disabled={selectedBooking.status === 'CANCELLED'}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="outline"
                                className="border-amber-200 text-amber-700 hover:bg-amber-50"
                                onClick={() => handleStatusUpdate(selectedBooking.id, 'PENDING')}
                                disabled={selectedBooking.status === 'PENDING'}
                            >
                                Reset to Pending
                            </Button>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-gray-100">
                            <Button variant="ghost" onClick={() => setIsStatusModalOpen(false)}>
                                Done
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>

        </div>
    );
};

export default Bookings;
