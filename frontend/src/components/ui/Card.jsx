import { twMerge } from 'tailwind-merge';

const Card = ({ children, className, ...props }) => {
    return (
        <div className={twMerge("bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300", className)} {...props}>
            {children}
        </div>
    );
};

export default Card;
