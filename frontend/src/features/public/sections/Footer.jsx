import { Link } from 'react-router-dom';
import { Twitter, Github, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-50 border-t border-slate-200 py-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">


                    <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                        <span className="font-bold text-slate-900 tracking-tight">CareOps</span>
                        <span className="hidden md:block text-slate-300">|</span>
                        <p className="text-sm text-slate-500">
                            &copy; {new Date().getFullYear()} CareOps Inc.
                        </p>
                    </div>


                    <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 font-medium">
                        <Link to="#" className="hover:text-indigo-600 transition-colors">Privacy</Link>
                        <Link to="#" className="hover:text-indigo-600 transition-colors">Terms</Link>
                        <Link to="#" className="hover:text-indigo-600 transition-colors">Twitter</Link>
                        <Link to="#" className="hover:text-indigo-600 transition-colors">GitHub</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
