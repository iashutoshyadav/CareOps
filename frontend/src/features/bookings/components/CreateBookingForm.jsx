import { useForm } from 'react-hook-form';
import api from '../../../services/api';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CreateBookingForm = ({ onSuccess, onCancel }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        try {
            const { data: response } = await api.post('/bookings', data);
            onSuccess(response.data.booking);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label="Title"
                placeholder="e.g. Consultation with John"
                {...register('title', { required: 'Title is required' })}
                error={errors.title?.message}
            />

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Start Time"
                    type="datetime-local"
                    {...register('startTime', { required: 'Start time is required' })}
                    error={errors.startTime?.message}
                />
                <Input
                    label="End Time"
                    type="datetime-local"
                    {...register('endTime', { required: 'End time is required' })}
                    error={errors.endTime?.message}
                />
            </div>

            <Input
                label="Notes"
                {...register('notes')}
                placeholder="Optional notes..."
            />

            {/* Ideally select Contact here */}
            <Input
                label="Contact ID (Optional)"
                {...register('contactId')}
                placeholder="Paste ID for now"
            />

            <div className="flex justify-end space-x-3 pt-4">
                <Button variant="secondary" onClick={onCancel} type="button">
                    Cancel
                </Button>
                <Button type="submit" isLoading={isSubmitting}>
                    Schedule
                </Button>
            </div>
        </form>
    );
};

export default CreateBookingForm;
