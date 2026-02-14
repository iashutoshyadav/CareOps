import { useForm } from 'react-hook-form';
import api from '../../../services/api';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CreateFormModal = ({ onSuccess, onCancel }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        try {
            const { data: response } = await api.post('/forms', {
                ...data,
                schema: { fields: [] } // Placeholder schema for hackathon
            });
            onSuccess(response.data.form);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label="Form Title"
                {...register('title', { required: 'Title is required' })}
                error={errors.title?.message}
            />

            <Input
                label="Description"
                {...register('description')}
            />

            <div className="flex justify-end space-x-3 pt-4">
                <Button variant="secondary" onClick={onCancel} type="button">
                    Cancel
                </Button>
                <Button type="submit" isLoading={isSubmitting}>
                    Create Form
                </Button>
            </div>
        </form>
    );
};

export default CreateFormModal;
