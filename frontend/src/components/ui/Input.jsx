import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

const Input = forwardRef(({ label, error, className, id, leftIcon: LeftIcon, ...props }, ref) => {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                    {label}
                </label>
            )}
            <div className="relative">
                {LeftIcon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LeftIcon className="h-5 w-5 text-gray-400" />
                    </div>
                )}
                <input
                    id={id}
                    ref={ref}
                    className={twMerge(clsx(
                        "flex h-12 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
                        LeftIcon && "pl-11",
                        error && "border-red-500 focus:ring-red-500/20 focus:border-red-500",
                        className
                    ))}
                    {...props}
                />
            </div>
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
});

Input.displayName = 'Input';
export default Input;
