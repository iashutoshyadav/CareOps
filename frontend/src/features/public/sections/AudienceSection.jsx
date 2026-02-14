import { CheckCircle } from 'lucide-react';
import FadeIn from '../../../components/animations/FadeIn';

const AudienceSection = () => {
    return (
        <section className="py-10 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
                            Whatever you do, if you serve clients — we've got you
                        </h3>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    {[
                        "Clinics & Healthcare", "Consulting Firms", "Home Services", "Salons & Spas",
                        "Repair Services", "Coaching & Training", "Legal Services", "Fitness & Wellness"
                    ].map((type, idx) => (
                        <FadeIn key={idx} delay={idx * 0.05} direction="up">
                            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-center shadow-sm h-full w-full">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                <span className="font-semibold text-slate-700 text-sm md:text-base">{type}</span>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AudienceSection;
