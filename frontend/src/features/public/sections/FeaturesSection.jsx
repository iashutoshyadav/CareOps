import { Calendar, MessageSquare, FileText, Package, Users, Activity } from 'lucide-react';
import FadeIn from '../../../components/animations/FadeIn';

const FeaturesSection = () => {
    return (
        <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h3 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Designed for modern operations
                        </h3>
                        <p className="mt-4 text-lg text-slate-500">
                            We've obsessively designed every detail to help you save time and never miss an opportunity
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Calendar, color: "bg-purple-100 text-purple-600",
                            title: "Smart Booking System",
                            desc: "Public booking pages with automatic confirmations, reminders, and follow-ups. Your customers book online 24/7"
                        },
                        {
                            icon: MessageSquare, color: "bg-blue-100 text-blue-600",
                            title: "Unified Inbox",
                            desc: "Email and SMS in one place. Complete conversation history per contact. Never miss a message"
                        },
                        {
                            icon: FileText, color: "bg-green-100 text-green-600",
                            title: "Automated Forms",
                            desc: "Send intake forms and agreements automatically. Track completion in real-time. No more chasing paperwork"
                        },
                        {
                            icon: Package, color: "bg-orange-100 text-orange-600",
                            title: "Inventory Tracking",
                            desc: "Real-time stock levels for supplies. Get alerts when running low. Plan ahead instead of reacting late"
                        },
                        {
                            icon: Users, color: "bg-teal-100 text-teal-600",
                            title: "Team Management",
                            desc: "Add staff with role-based permissions. Clear accountability for who handles what"
                        },
                        {
                            icon: Activity, color: "bg-pink-100 text-pink-600",
                            title: "Real-Time Dashboard",
                            desc: "See everything happening in your business right now. Get alerts for items needing attention"
                        }
                    ].map((feature, idx) => (
                        <FadeIn key={idx} delay={idx * 0.1} direction="up">
                            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all group h-full">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${feature.color}`}>
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
                                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
