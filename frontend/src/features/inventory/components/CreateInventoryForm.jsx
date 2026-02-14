import { useForm } from 'react-hook-form';
import api from '../../../services/api';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CreateInventoryForm = ({ onSuccess, onCancel }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        try {
            const { data: response } = await api.post('/inventory', {
                ...data,
                quantity: parseInt(data.quantity),
                threshold: parseInt(data.threshold),
                price: parseFloat(data.price || 0),
            });
            onSuccess(response.data.item);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label="Item Name"
                {...register('name', { required: 'Name is required' })}
                error={errors.name?.message}
            />

            <Input
                label="SKU (Optional)"
                {...register('sku')}
            />

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Quantity"
                    type="number"
                    {...register('quantity', { required: 'Quantity is required', min: 0 })}
                    error={errors.quantity?.message}
                />
                <Input
                    label="Low Stock Threshold"
                    type="number"
                    {...register('threshold', { required: 'Threshold is required', min: 0 })}
                    defaultValue={10}
                    error={errors.threshold?.message}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Price ($)"
                    type="number"
                    step="0.01"
                    {...register('price')}
                />
                <Input
                    label="Usage per Booking"
                    type="number"
                    min={0}
                    defaultValue={0}
                    {...register('usagePerBooking')}
                    helperText="Amount subtracted per booking"
                />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <Button variant="secondary" onClick={onCancel} type="button">
                    Cancel
                </Button>
                <Button type="submit" isLoading={isSubmitting}>
                    Add Item
                </Button>
            </div>
        </form>
    );
};

export default CreateInventoryForm;
