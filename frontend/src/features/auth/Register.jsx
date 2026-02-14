import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import useAlerts from '../../hooks/useAlerts';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Register = ({ onSuccess, onSwitch }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const { register: registerUser } = useAuth();
    const { addNotification } = useAlerts();
    const navigate = useNavigate();

    const [isRegistering, setIsRegistering] = useState(false);

    const onSubmit = async (data) => {
        if (isRegistering) return;
        setIsRegistering(true);
        try {
            await registerUser(data.name, data.email, data.password);
            addNotification('Account created successfully', 'success');
            if (onSuccess) {
                onSuccess();
            }
            navigate('/onboarding');
        } catch (error) {
            addNotification(error.response?.data?.message || 'Registration failed', 'error');
            setIsRegistering(false);
        }
    };

    return (
        <div className="w-full space-y-6">
            <div className="text-center">
                <p className="mt-2 text-sm text-gray-500 font-medium">
                    Get started with CareOps today.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Input
                    label="Full Name"
                    type="text"
                    id="name"
                    leftIcon={User}
                    placeholder="John Doe"
                    className="h-11 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20 bg-gray-50/50 focus:bg-white transition-all duration-200 font-medium"
                    {...register('name', { required: 'Name is required' })}
                    error={errors.name?.message}
                />

                <Input
                    label="Email"
                    type="email"
                    id="email"
                    leftIcon={Mail}
                    placeholder="name@company.com"
                    className="h-11 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20 bg-gray-50/50 focus:bg-white transition-all duration-200 font-medium"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
                    })}
                    error={errors.email?.message}
                />

                <Input
                    label="Password"
                    type="password"
                    id="password"
                    leftIcon={Lock}
                    placeholder="Create a password"
                    className="h-11 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20 bg-gray-50/50 focus:bg-white transition-all duration-200 font-medium"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters' }
                    })}
                    error={errors.password?.message}
                />

                <Button
                    type="submit"
                    isLoading={isSubmitting || isRegistering}
                    className="w-full h-11 text-sm font-bold tracking-wide rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                    Create account <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
            </form>



            <p className="mt-6 text-center text-sm text-gray-500 font-medium">
                Already have an account?{' '}
                {onSwitch ? (
                    <button onClick={onSwitch} className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors hover:underline">
                        Sign in
                    </button>
                ) : (
                    <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors hover:underline">
                        Sign in
                    </Link>
                )}
            </p>
        </div>
    );
};

export default Register;
