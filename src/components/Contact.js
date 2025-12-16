"use client";
import { motion } from "framer-motion";
import { Send, Linkedin, Instagram, Mail, Github } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="py-32 px-8 max-w-3xl mx-auto">
            <div className="text-center mb-16">
                <motion.p
                    className="text-sm text-purple-500 uppercase tracking-widest mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Get in Touch
                </motion.p>
                <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    Let's Work Together
                </motion.h2>
                <motion.p
                    className="text-gray-400 max-w-md mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    Have a project in mind? I'd love to hear from you.
                </motion.p>
            </div>

            <motion.div
                className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-12 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-radial from-purple-500/15 via-transparent to-transparent rounded-full pointer-events-none" />

                <form className="flex flex-col gap-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-400 font-medium">Name</label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="w-full px-5 py-4 bg-[#111111] border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all placeholder:text-gray-600"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-400 font-medium">Email</label>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="w-full px-5 py-4 bg-[#111111] border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all placeholder:text-gray-600"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-400 font-medium">Subject</label>
                        <input
                            type="text"
                            placeholder="What's this about?"
                            className="w-full px-5 py-4 bg-[#111111] border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all placeholder:text-gray-600"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-400 font-medium">Message</label>
                        <textarea
                            placeholder="Tell me about your project..."
                            className="w-full px-5 py-4 bg-[#111111] border border-white/10 rounded-xl text-white min-h-[150px] resize-y focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all placeholder:text-gray-600"
                        />
                    </div>
                    <motion.button
                        type="submit"
                        className="px-8 py-4 gradient-bg text-white rounded-full font-semibold text-base flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Send Message <Send size={18} />
                    </motion.button>
                </form>
            </motion.div>

            <motion.div
                className="flex justify-center gap-4 mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
            >
                {/* LinkedIn - Blue */}
                <a
                    href="http://www.linkedin.com/in/smranz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#0a0a0a] border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:border-[#0A66C2] hover:text-[#0A66C2] hover:-translate-y-1 transition-all"
                >
                    <Linkedin size={20} />
                </a>

                {/* Instagram - Pink */}
                <a
                    href="https://www.instagram.com/samranz.official?igsh=MWk4aTh1OHkwanlu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#0a0a0a] border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:border-[#E4405F] hover:text-[#E4405F] hover:-translate-y-1 transition-all"
                >
                    <Instagram size={20} />
                </a>

                {/* Email - Orange (Opens Gmail Compose) */}
                <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=samranzahid34@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#0a0a0a] border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:border-orange-500 hover:text-orange-500 hover:-translate-y-1 transition-all"
                >
                    <Mail size={20} />
                </a>

                {/* GitHub - Gray */}
                <a
                    href="https://github.com/Smranz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#0a0a0a] border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:border-gray-300 hover:text-gray-300 hover:-translate-y-1 transition-all"
                >
                    <Github size={20} />
                </a>

                {/* Fiverr - Green */}
                <a
                    href="https://www.fiverr.com/users/samranz/seller_dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#0a0a0a] border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:border-[#1DBF73] hover:text-[#1DBF73] hover:shadow-[0_0_15px_rgba(29,191,115,0.5)] hover:-translate-y-1 transition-all"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                    >
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        <path stroke="none" d="M13.8 11v6H11.5v-4.5c0-1.2-.5-1.8-1.7-1.8-1.2 0-1.8.6-1.9 1.9v4.4H5.5V11a5.6 5.6 0 0 1 0-1h2.4v1.2c.5-.9 1.5-1.5 2.8-1.5 2.1 0 3.1 1.3 3.1 3.8zM6.8 8.5c-.8 0-1.5-.7-1.5-1.5 0-.8.7-1.5 1.5-1.5.8 0 1.5.7 1.5 1.5 0 .8-.7 1.5-1.5 1.5z" />
                    </svg>
                </a>
            </motion.div>
        </section>
    );
}
