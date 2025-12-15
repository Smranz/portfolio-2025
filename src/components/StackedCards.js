"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
    { id: 1, category: "UI/UX Design", title: "E-Commerce Experience", desc: "A modern shopping platform with seamless checkout flow and intuitive product discovery.", color: "from-purple-600 to-purple-900" },
    { id: 2, category: "Dashboard Design", title: "Analytics Dashboard", desc: "Real-time data visualization with dark mode interface and interactive charts.", color: "from-pink-500 to-red-600" },
    { id: 3, category: "Mobile App", title: "Travel Booking App", desc: "Immersive travel experience with morph transitions and smooth animations.", color: "from-cyan-400 to-blue-600" },
    { id: 4, category: "Brand Identity", title: "Startup Branding", desc: "Complete brand identity including logo, typography, and visual guidelines.", color: "from-green-400 to-emerald-600" },
];

export default function StackedCards() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [exitDirection, setExitDirection] = useState(0);

    const handleDragEnd = (event, info) => {
        const threshold = 100;
        if (info.offset.x > threshold) {
            setExitDirection(1);
            setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
        } else if (info.offset.x < -threshold) {
            setExitDirection(-1);
            setCurrentIndex((prev) => (prev + 1) % projects.length);
        }
    };

    return (
        <section id="projects" className="py-32 px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <motion.p
                    className="text-sm text-purple-500 uppercase tracking-widest mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Selected Works
                </motion.p>
                <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    Featured Projects
                </motion.h2>
                <motion.p
                    className="text-gray-400 max-w-lg mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    Drag the cards to explore my recent work
                </motion.p>
            </div>

            <div className="relative h-[500px] max-w-4xl mx-auto perspective-1000">
                <AnimatePresence mode="popLayout">
                    {projects.map((project, index) => {
                        const position = (index - currentIndex + projects.length) % projects.length;
                        const isActive = position === 0;

                        if (position > 2) return null;

                        return (
                            <motion.div
                                key={project.id}
                                className="absolute w-full h-full cursor-grab active:cursor-grabbing"
                                initial={{ scale: 1 - position * 0.05, y: position * 20, zIndex: projects.length - position, opacity: 1 - position * 0.2 }}
                                animate={{ scale: 1 - position * 0.05, y: position * 20, zIndex: projects.length - position, opacity: 1 - position * 0.2, rotateZ: 0 }}
                                exit={{ x: exitDirection * 500, opacity: 0, rotateZ: exitDirection * 20 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                drag={isActive ? "x" : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.7}
                                onDragEnd={handleDragEnd}
                                style={{ zIndex: projects.length - position }}
                            >
                                <div className="w-full h-full bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden flex flex-col shadow-2xl hover:border-purple-500/30 transition-colors">
                                    <div className={`flex-1 bg-gradient-to-br ${project.color} relative flex items-center justify-center overflow-hidden`}>
                                        <div className="absolute inset-0 opacity-50" />
                                        <span className="text-[8rem] font-extrabold text-white/5 absolute">0{project.id}</span>
                                    </div>
                                    <div className="p-8 bg-[#0a0a0a]">
                                        <span className="text-xs text-purple-500 uppercase tracking-wider block mb-2">{project.category}</span>
                                        <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{project.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            <div className="flex justify-center gap-3 mt-12">
                {projects.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex ? 'bg-purple-500 scale-125' : 'bg-white/10'}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>

            <p className="text-center text-gray-500 text-sm mt-6">← Swipe to navigate →</p>
        </section>
    );
}
