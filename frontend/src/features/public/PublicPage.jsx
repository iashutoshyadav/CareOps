import { Routes, Route } from 'react-router-dom';
import Card from '../../components/ui/Card';
import PublicForm from './PublicForm';

const BookingPage = () => (
    <Card className="max-w-md mx-auto p-8 text-center bg-white shadow-xl">
        <h1 className="text-2xl font-bold text-indigo-600 mb-4">Book an Appointment</h1>
        <p className="text-gray-600 mb-6">Select a time slot below to schedule your visit</p>
        <div className="bg-gray-100 p-4 rounded text-sm text-gray-500">
            Calendar Widget Placeholder (Public Access)
        </div>
    </Card>
);

const PublicPage = () => {
    return (
        <Routes>
            <Route path="booking/:id?" element={<BookingPage />} />
            <Route path="f/:id" element={<PublicForm />} />
            <Route path="*" element={<div className="text-center mt-10">404 - Page Not Found</div>} />
        </Routes>
    );
};


export default PublicPage;
