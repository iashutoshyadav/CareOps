import { useForm } from 'react-hook-form';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Layout } from 'lucide-react';

const WorkspaceSetup = ({ data, updateData, onNext }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { workspaceName: data.workspaceName || '' }
    });

    const onSubmit = (values) => {
        onNext(values);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600 shrink-0">
                    <Layout className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900">Workspace Identity</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        This is the name of your organization. It will be used on all patient communications and booking pages.
                    </p>
                </div>
            </div>

            <div className="space-y-2">
                <Input
                    label="Workspace Name"
                    placeholder="e.g. Skyline Medical Group"
                    {...register('workspaceName', { required: 'Workspace name is required' })}
                    error={errors.workspaceName?.message}
                />
            </div>

            <div className="pt-4">
                <Button type="submit" size="lg" className="w-full">
                    Continue to Services
                </Button>
            </div>
        </form>
    );
};

export default WorkspaceSetup;
