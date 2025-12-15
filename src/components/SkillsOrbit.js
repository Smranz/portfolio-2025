"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const tools = [
    { name: "Photoshop", logo: "/photoshop.png", color: "#31A8FF", radius: 120, duration: 20 },
    { name: "Illustrator", logo: "/AI.png", color: "#FF9A00", radius: 180, duration: 25 },
    { name: "Canva", logo: "/canva.png", color: "#00C4CC", radius: 240, duration: 30 },
    { name: "Figma", logo: "/figma.png", color: "#F24E1E", radius: 160, duration: 22 },
    { name: "PowerPoint", logo: "/ppt.png", color: "#D04423", radius: 200, duration: 28 },
];

export default function SkillsOrbit() {
    return (
        <section id="skills" className="py-32 px-8 max-w-7xl mx-auto text-center">
            <motion.p
                className="text-sm text-purple-500 uppercase tracking-widest mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Skills & Tools
            </motion.p>
            <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
            >
                My Creative Arsenal
            </motion.h2>

            {/* Solar System Container */}
            <motion.div
                className="hidden md:block relative w-full max-w-3xl aspect-square mx-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                {/* Center Sun (Your Brand) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 gradient-bg rounded-full shadow-lg shadow-purple-500/50 flex items-center justify-center text-3xl z-10">
                    ✨
                </div>

                {/* Orbit Paths - More Visible */}
                {tools.map((tool, index) => (
                    <div
                        key={`orbit-${index}`}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white/20 rounded-full pointer-events-none"
                        style={{
                            width: tool.radius * 2,
                            height: tool.radius * 2,
                            boxShadow: `0 0 20px rgba(139, 92, 246, 0.1)`,
                        }}
                    />
                ))}

                {/* Orbiting Tool Logos */}
                {tools.map((tool, index) => (
                    <motion.div
                        key={tool.name}
                        className="absolute top-1/2 left-1/2 pointer-events-none"
                        style={{
                            width: tool.radius * 2,
                            height: tool.radius * 2,
                            marginLeft: -tool.radius,
                            marginTop: -tool.radius,
                        }}
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: tool.duration,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        <motion.div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 pointer-events-auto"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                        >
                            <motion.div
                                className="relative group cursor-pointer"
                                whileHover={{
                                    scale: 1.4,
                                    y: -10,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 15
                                }}
                                animate={{ rotate: -360 }}
                                style={{
                                    animation: `counter-rotate ${tool.duration}s linear infinite`,
                                }}
                            >
                                {/* Glow Effect */}
                                <div
                                    className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-300"
                                    style={{ backgroundColor: tool.color }}
                                />

                                {/* Logo Container - Round */}
                                <div className="relative bg-white rounded-full p-2 group-hover:shadow-2xl transition-all duration-300 w-14 h-14 flex items-center justify-center group-hover:ring-4 group-hover:ring-white/20">
                                    <Image
                                        src={tool.logo}
                                        alt={tool.name}
                                        width={40}
                                        height={40}
                                        className="object-contain"
                                    />
                                </div>

                                {/* Tooltip */}
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black/90 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    {tool.name}
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Mobile List */}
            <div className="md:hidden flex flex-wrap justify-center gap-6 mt-8">
                {tools.map((tool, index) => (
                    <motion.div
                        key={tool.name}
                        className="bg-white rounded-full p-4 hover:shadow-lg transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                    >
                        <Image
                            src={tool.logo}
                            alt={tool.name}
                            width={48}
                            height={48}
                            className="object-contain mx-auto mb-2"
                        />
                        <p className="text-xs font-medium text-gray-900">{tool.name}</p>
                    </motion.div>
                ))}
            </div>

            <style jsx>{`
        @keyframes counter-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
        </section>
    );
}
