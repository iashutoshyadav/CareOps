import { MessageSquare, Calendar, FileText, Activity, AlertCircle, XCircle, Mail, Clock } from 'lucide-react';

const ProblemSection = () => {
    return (
        <section className="py-16 bg-slate-50 relative overflow-hidden">

            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                        Running a business on <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">disconnected tools</span> is costing you
                    </h2>
                    <p className="text-xl text-slate-500 leading-relaxed">
                        Most service businesses lose 20% of revenue simply because they can't respond fast enough or track what's happening
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            title: "Leads Lost in Inbox",
                            desc: "New inquiries get buried under hundreds of emails. By the time you reply, they've booked someone else.",
                            icon: Mail
                        },
                        {
                            title: "Manual Chase-Up",
                            desc: "Wasting hours texting back-and-forth just to find a time that works or confirm an appointment.",
                            icon: Clock
                        },
                        {
                            title: "Scattered Forms",
                            desc: "Intake forms, contracts, and notes live in different apps. You never have the full picture when you need it.",
                            icon: FileText
                        },
                        {
                            title: "Flying Blind",
                            desc: "No real-time visibility into inventory or staff availability. You're constantly reacting to fires.",
                            icon: Activity
                        },
                    ].map((pain, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-red-500 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>

                            <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-500 group-hover:rotate-6 transition-all duration-300">
                                <pain.icon className="w-7 h-7 text-red-600 group-hover:text-white transition-colors" />
                            </div>

                            <h4 className="font-bold text-slate-900 text-xl mb-3 group-hover:text-red-600 transition-colors">
                                {pain.title}
                            </h4>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                {pain.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProblemSection;
