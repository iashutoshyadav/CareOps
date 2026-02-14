import Button from '../../../components/ui/Button';
import { ArrowRight } from 'lucide-react';
import FadeIn from '../../../components/animations/FadeIn';

const CTASection = ({ openRegister }) => {
    return (
        <section className="py-24 bg-white border-t border-slate-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <FadeIn>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        Let's get your business <span className="text-indigo-600">sorted out</span>
                    </h2>

                    <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
                        You didn't start your business to manage software. We'll handle the operations so you can focus on your clients
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
                        <Button
                            onClick={openRegister}
                            size="lg"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all flex items-center group"
                        >
                            Start your free trial
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default CTASection;
