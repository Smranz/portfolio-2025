"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="py-32 px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <motion.p
                    className="text-sm text-purple-500 uppercase tracking-widest mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    About Me
                </motion.p>
                <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    Background & Journey
                </motion.h2>
                <motion.p
                    className="text-gray-400 max-w-lg mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    I craft digital experiences where creativity meets precision. Specializing in high-impact video editing and stunning graphic design, I transform complex ideas into visual narratives that captivate and inspire.
                </motion.p>
            </div>

            {/* Vector Portrait - Reduced Size */}
            <motion.div
                className="flex justify-center mb-20"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="relative max-w-2xl w-full">
                    <Image
                        src="/samran-vector.png"
                        alt="Samran Zahid - Portfolio Vector Illustration"
                        width={800}
                        height={400}
                        className="w-full h-auto rounded-3xl"
                        priority
                    />
                </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
                <motion.div
                    className="bg-[#0a0a0a] p-10 rounded-3xl border border-white/10 relative overflow-hidden hover:border-purple-500/30 hover:-translate-y-1 transition-all group"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center text-2xl mb-6">
                        🎓
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">BS Computer Science</h3>
                    <span className="text-purple-500 text-sm block mb-4">Lahore Garrison University</span>
                    <p className="text-gray-400 leading-relaxed">
                        My foundation in computer science gave me the analytical mindset to approach design systematically. I combine technical understanding with creative vision to build interfaces that are both beautiful and functional.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col gap-8">
                        {[
                            { year: "2023 - Present", title: "Freelance UI/UX Designer", desc: "Working with clients globally on web and mobile interfaces." },
                            { year: "2022 - 2023", title: "Graphics Design Focus", desc: "Mastered Adobe Creative Suite and Figma for professional workflows." },
                            { year: "2021", title: "Design Journey Began", desc: "Started exploring UI/UX design alongside my CS degree." }
                        ].map((item, index) => (
                            <div key={index} className="flex gap-6">
                                <div className="relative">
                                    <div className="w-3 h-3 bg-purple-500 rounded-full mt-2" />
                                    {index < 2 && <div className="absolute top-5 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-white/10" />}
                                </div>
                                <div className="flex-1">
                                    <span className="text-xs text-gray-500 block mb-1">{item.year}</span>
                                    <h4 className="font-semibold mb-1">{item.title}</h4>
                                    <p className="text-gray-400 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
