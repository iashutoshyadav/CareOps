import FadeIn from '../../../components/animations/FadeIn';

const HowItWorksSection = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Set up once. Run forever.
                        </h2>
                    </div>
                </FadeIn>

                <div className="max-w-4xl mx-auto">
                    <div className="relative">

                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-100 hidden md:block"></div>

                        {[
                            {
                                step: "1", title: "Create Your Workspace",
                                desc: "Connect email, SMS, and define your services. Set your availability. Takes about 10 minutes."
                            },
                            {
                                step: "2", title: "Customer Books Online",
                                desc: "They find your public booking page, select a time, and book. Automatic confirmations and forms are sent instantly."
                            },
                            {
                                step: "3", title: "Staff Handles the Work",
                                desc: "Your team manages everything from one dashboard. Inbox, bookings, forms — all in one place."
                            },
                            {
                                step: "4", title: "You Stay Informed",
                                desc: "Real-time alerts show what needs attention. Dashboard gives you complete operational visibility."
                            }
                        ].map((item, idx) => (
                            <FadeIn key={idx} delay={idx * 0.2} direction="left">
                                <div className="flex gap-8 mb-12 relative group">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 rounded-full bg-white border-2 border-indigo-100 text-indigo-600 font-bold text-2xl flex items-center justify-center shadow-sm group-hover:border-indigo-600 group-hover:bg-indigo-50 transition-colors relative z-10">
                                            {item.step}
                                        </div>
                                    </div>
                                    <div className="pt-3">
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                        <p className="text-slate-500 text-lg leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
