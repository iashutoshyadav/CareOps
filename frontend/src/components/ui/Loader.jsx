import { Loader2 } from 'lucide-react';

const Loader = ({ className = "h-8 w-8", center = true }) => {
    if (center) {
        return (
            <div className="flex items-center justify-center w-full p-4">
                <Loader2 className={`animate-spin text-indigo-600 ${className}`} />
            </div>
        );
    }
    return <Loader2 className={`animate-spin text-indigo-600 ${className}`} />;
};

export default Loader;
