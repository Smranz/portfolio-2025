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
                        <path d="M21.469 16.587c.801 0 1.258-.457 1.258-1.295V10.23c0-3.351-1.847-5.388-5.748-5.388-3.046 0-5.121 1.77-5.464 4.512h2.247c.229-1.485 1.504-2.285 3.01-2.285 1.866 0 2.876.952 2.876 2.475v.571-1.923H21.469V16.587zm-11.826 0V10.744H7.265v5.843H9.643zm8.569 0V12.763c0-1.219-.533-2.057-1.809-2.057-1.352 0-2.095.952-2.133 2.152v3.729h-2.361V10.744h2.361v1.161c.609-.895 1.561-1.428 2.818-1.428 2.057 0 3.485 1.295 3.485 3.5v2.609H18.212zm-15.679 0h2.361V4.842H2.533V16.587zm2.361-13.483c0 .762-.571 1.333-1.333 1.333-.762 0-1.333-.571-1.333-1.333 0-.762.571-1.333 1.333-1.333.762 0 1.333.571 1.333 1.333z" />
                    </svg>
                </a>
            </motion.div>
        </section>
    );
}
