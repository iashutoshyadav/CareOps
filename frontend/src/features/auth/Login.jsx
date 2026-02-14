import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import useAlerts from '../../hooks/useAlerts';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Login = ({ onSuccess, onSwitch }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const { login } = useAuth();
    const { addNotification } = useAlerts();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const user = await login(data.email, data.password);
            addNotification('Logged in successfully', 'success');
            if (onSuccess) {
                onSuccess();
            }

            // Check if user has completed onboarding (has workspace)
            if (!user.workspaceId) {
                navigate('/onboarding');
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            addNotification(error.response?.data?.message || 'Login failed', 'error');
        }
    };

    return (
        <div className="w-full space-y-6">
            <div className="text-center">
                <p className="mt-2 text-sm text-gray-500 font-medium">
                    Welcome back! Please enter your details.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Input
                    label="Email"
                    type="email"
                    id="email"
                    leftIcon={Mail}
                    placeholder="Enter your email"
                    className="h-11 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20 bg-gray-50/50 focus:bg-white transition-all duration-200 font-medium"
                    {...register('email', { required: 'Email is required' })}
                    error={errors.email?.message}
                />

                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" class="block text-sm font-medium text-gray-700 uppercase tracking-wide">Password</label>
                        <Link to="/forgot-password" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                            Forgot password?
                        </Link>
                    </div>
                    <Input
                        type="password"
                        id="password"
                        leftIcon={Lock}
                        placeholder="Enter your password"
                        className="h-11 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20 bg-gray-50/50 focus:bg-white transition-all duration-200 font-medium"
                        {...register('password', { required: 'Password is required' })}
                        error={errors.password?.message}
                    />
                </div>

                <Button
                    type="submit"
                    isLoading={isSubmitting}
                    className="w-full h-11 text-sm font-bold tracking-wide rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                    Sign in <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
            </form>



            <p className="mt-6 text-center text-sm text-gray-500 font-medium">
                Don't have an account?{' '}
                {onSwitch ? (
                    <button onClick={onSwitch} className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors hover:underline">
                        Sign up
                    </button>
                ) : (
                    <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors hover:underline">
                        Sign up
                    </Link>
                )}
            </p>
        </div>
    );
};

export default Login;
