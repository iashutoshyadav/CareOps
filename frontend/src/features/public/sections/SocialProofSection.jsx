import { Layers, Star, Zap, Shield, Activity, Globe, Calendar, Clock } from 'lucide-react';
import FadeIn from '../../../components/animations/FadeIn';

const SocialProofSection = () => {
    return (
        <section className="py-12 bg-white border-t border-slate-100">

            <div className="text-center mb-10">
                <FadeIn>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest bg-slate-50 inline-block px-4 py-1 rounded-full border border-slate-100 shadow-sm">
                        Trusted by 500+ innovative businesses
                    </p>
                </FadeIn>
            </div>


            <div className="relative flex overflow-x-hidden group">

                <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                <div className="animate-marquee whitespace-nowrap flex space-x-16 items-center pl-4 py-4">
                    {[
                        { name: 'ApexConsult', icon: Layers, color: 'text-blue-600' },
                        { name: 'ZenSpa', icon: Star, color: 'text-amber-500' },
                        { name: 'TechFix', icon: Zap, color: 'text-emerald-500' },
                        { name: 'LegalFlow', icon: Shield, color: 'text-indigo-600' },
                        { name: 'FitLife', icon: Activity, color: 'text-cyan-500' },
                        { name: 'HomePro', icon: Globe, color: 'text-rose-500' },
                        { name: 'MediCare', icon: Calendar, color: 'text-violet-500' },
                        { name: 'SwiftRepair', icon: Clock, color: 'text-orange-500' },
                    ].map((brand, i) => (
                        <div key={i} className="flex items-center space-x-3 opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer transform hover:scale-105">
                            <brand.icon className={`w-7 h-7 ${brand.color}`} />
                            <span className="text-xl font-bold text-slate-700">{brand.name}</span>
                        </div>
                    ))}

                    {[
                        { name: 'ApexConsult', icon: Layers, color: 'text-blue-600' },
                        { name: 'ZenSpa', icon: Star, color: 'text-amber-500' },
                        { name: 'TechFix', icon: Zap, color: 'text-emerald-500' },
                        { name: 'LegalFlow', icon: Shield, color: 'text-indigo-600' },
                        { name: 'FitLife', icon: Activity, color: 'text-cyan-500' },
                        { name: 'HomePro', icon: Globe, color: 'text-rose-500' },
                        { name: 'MediCare', icon: Calendar, color: 'text-violet-500' },
                        { name: 'SwiftRepair', icon: Clock, color: 'text-orange-500' },
                    ].map((brand, i) => (
                        <div key={`dup-${i}`} className="flex items-center space-x-3 opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer transform hover:scale-105">
                            <brand.icon className={`w-7 h-7 ${brand.color}`} />
                            <span className="text-xl font-bold text-slate-700">{brand.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialProofSection;
