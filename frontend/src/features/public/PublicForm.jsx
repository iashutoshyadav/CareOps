import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Loader from '../../components/ui/Loader';

const PublicForm = () => {
    const { id } = useParams();
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    useEffect(() => {
        const fetchForm = async () => {
            try {
                // Public endpoint (doesn't need auth)
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/public/forms/${id}`);
                setForm(data.form);
            } catch (error) {
                console.error('Failed to fetch form', error);
            } finally {
                setLoading(false);
            }
        };
        fetchForm();
    }, [id]);

    const onSubmit = async (data) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/public/forms/${id}/submit`, {
                data,
                // Optional: attachment for contact creation
                contactInfo: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone
                }
            });
            setSubmitted(true);
        } catch (error) {
            console.error('Submission failed', error);
        }
    };

    if (loading) return <Loader />;
    if (!form) return (
        <div className="max-w-md mx-auto mt-20 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Form not found</h1>
            <p className="text-gray-500">The form you are looking for does not exist or has been disabled</p>
        </div>
    );

    if (submitted) return (
        <Card className="max-w-md mx-auto mt-20 p-8 text-center bg-white shadow-xl">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h1>
            <p className="text-gray-600">Your response has been successfully submitted</p>
        </Card>
    );

    return (
        <Card className="max-w-xl mx-auto my-12 p-8 bg-white shadow-xl">
            <div className="mb-8 border-b border-gray-100 pb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{form.title}</h1>
                <p className="text-gray-600">{form.description}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Contact Info for Auto-Contact Creation */}
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="First Name"
                        {...register('firstName', { required: 'Required' })}
                        error={errors.firstName?.message}
                    />
                    <Input
                        label="Last Name"
                        {...register('lastName', { required: 'Required' })}
                        error={errors.lastName?.message}
                    />
                </div>
                <Input
                    label="Email"
                    type="email"
                    {...register('email', { required: 'Required' })}
                    error={errors.email?.message}
                />
                <Input
                    label="Phone"
                    {...register('phone')}
                />

                <div className="pt-6 border-t border-gray-100">
                    <Button type="submit" className="w-full" isLoading={isSubmitting}>
                        Submit Form
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default PublicForm;
