import { useForm } from 'react-hook-form';
import api from '../../services/api';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const CreateContactForm = ({ onSuccess, onCancel }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        try {
            const { data: response } = await api.post('/contacts', data);
            onSuccess(response.data.contact);

        } catch (error) {
            console.error(error);
            // Parent handles notification usually, or we can do it here
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="First Name"
                    {...register('firstName', { required: 'First name is required' })}
                    error={errors.firstName?.message}
                />
                <Input
                    label="Last Name"
                    {...register('lastName', { required: 'Last name is required' })}
                    error={errors.lastName?.message}
                />
            </div>

            <Input
                label="Email"
                type="email"
                {...register('email', { required: 'Email is required' })}
                error={errors.email?.message}
            />

            <Input
                label="Phone"
                type="tel"
                {...register('phone')}
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                    {...register('type')}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="PATIENT">Patient</option>
                    <option value="CLIENT">Client</option>
                    <option value="VENDOR">Vendor</option>
                </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <Button variant="secondary" onClick={onCancel} type="button">
                    Cancel
                </Button>
                <Button type="submit" isLoading={isSubmitting}>
                    Create Contact
                </Button>
            </div>
        </form>
    );
};

export default CreateContactForm;
