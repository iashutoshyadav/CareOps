import { Loader2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    isLoading,
    disabled,
    type = 'button',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-xl font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95';

    const variants = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-lg shadow-indigo-200 hover:shadow-indigo-300',
        secondary: 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/30 focus:ring-indigo-500 shadow-sm',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-lg shadow-red-100',
        ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500',
        outline: 'bg-transparent border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 focus:ring-indigo-500',
    };

    const sizes = {
        sm: 'h-9 px-4 text-xs tracking-wider uppercase',
        md: 'h-11 px-6 py-2.5 text-sm',
        lg: 'h-14 px-8 text-base',
    };

    return (
        <button
            type={type}
            className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {children}
        </button>
    );
};

export default Button;
