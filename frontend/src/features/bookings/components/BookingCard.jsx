const BookingCard = ({ booking, onClick }) => {
    const statusColors = {
        PENDING: 'bg-amber-100 text-amber-700 border-amber-200',
        CONFIRMED: 'bg-green-100 text-green-700 border-green-200',
        CANCELLED: 'bg-red-100 text-red-700 border-red-200',
        COMPLETED: 'bg-blue-100 text-blue-700 border-blue-200',
    };

    return (
        <div
            onClick={() => onClick(booking)}
            className="group flex flex-col gap-1 rounded-md bg-white border border-gray-100 p-2 hover:shadow-sm transition-all cursor-pointer text-xs"
        >
            <div className="flex justify-between items-start gap-1">
                <div className="font-semibold text-gray-900 truncate flex-1">
                    {booking.title}
                </div>
                <div className={`px-1.5 py-0.5 rounded-full border text-[10px] font-bold ${statusColors[booking.status] || 'bg-gray-100 text-gray-600'}`}>
                    {booking.status}
                </div>
            </div>
            <div className="text-gray-500 truncate">
                {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
    );
};

export default BookingCard;

