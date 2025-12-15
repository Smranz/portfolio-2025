"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    { id: 1, text: "Exceptional design work! The attention to detail and creative approach exceeded our expectations. Highly recommended.", name: "Sarah Johnson", role: "Product Manager, TechCorp", initials: "SJ" },
    { id: 2, text: "A true professional who understands user experience. Our conversion rates improved significantly after the redesign.", name: "Michael Chen", role: "CEO, StartupXYZ", initials: "MC" },
    { id: 3, text: "Creative, punctual, and incredibly talented. The final product was even better than what we envisioned.", name: "Emily Davis", role: "Marketing Director, BrandCo", initials: "ED" },
];

export default function Testimonials() {
    return (
        <section className="py-32 px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <motion.p
                    className="text-sm text-purple-500 uppercase tracking-widest mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Testimonials
                </motion.p>
                <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    What Clients Say
                </motion.h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={testimonial.id}
                        className="glass p-8 rounded-3xl relative overflow-hidden hover:-translate-y-2 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all group"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 }}
                    >
                        <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="text-6xl leading-none gradient-text mb-4 relative z-10">"</div>
                        <div className="flex gap-1 mb-4 relative z-10">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill="#f59e0b" strokeWidth={0} />
                            ))}
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-8 relative z-10">{testimonial.text}</p>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center font-semibold text-lg">
                                {testimonial.initials}
                            </div>
                            <div>
                                <span className="font-semibold block">{testimonial.name}</span>
                                <span className="text-gray-500 text-sm">{testimonial.role}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
