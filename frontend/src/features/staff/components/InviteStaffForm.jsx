import { useForm } from 'react-hook-form';
import api from '../../../services/api';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InviteStaffForm = ({ onSuccess, onCancel }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        try {
            const { data: response } = await api.post('/staff', data);
            onSuccess(response.data.staff);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label="Full Name"
                {...register('name', { required: 'Name is required' })}
                error={errors.name?.message}
            />

            <Input
                label="Email Address"
                type="email"
                {...register('email', { required: 'Email is required' })}
                error={errors.email?.message}
            />

            <div className="bg-blue-50 p-3 rounded text-sm text-blue-700">
                Note: An invitation email will be sent to this address with login instructions.
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <Button variant="secondary" onClick={onCancel} type="button">
                    Cancel
                </Button>
                <Button type="submit" isLoading={isSubmitting}>
                    Send Invite
                </Button>
            </div>
        </form>
    );
};

export default InviteStaffForm;
