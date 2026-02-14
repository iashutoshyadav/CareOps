import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from './ui/Button';

const PublicNavbar = ({ openLogin, openRegister }) => {
    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 supports-[backdrop-filter]:bg-white/60">
            <div className="w-full px-6 md:px-12">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-12">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center"
                            >
                                <span className="text-white font-bold text-xl">C</span>
                            </motion.div>
                            <span className="text-xl font-bold text-slate-900 tracking-tight">CareOps</span>
                        </Link>
                        <div className="hidden md:flex items-center space-x-8">
                            {['Solutions', 'Features', 'How it Works', 'Reviews'].map((item, i) => (
                                <motion.a
                                    key={item}
                                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + (i * 0.1), duration: 0.5 }}
                                    className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={openLogin} className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
                            Log in
                        </button>
                        <Button onClick={openRegister} className="rounded-full font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30">Start Free Trial</Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default PublicNavbar;
