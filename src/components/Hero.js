"use client";
import { motion } from "framer-motion";
import ParticleBackground from "./ParticleBackground";

export default function Hero() {
    return (
        <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-8">
            {/* Particle Animation */}
            <ParticleBackground />

            {/* Animated Gradient Background */}
            <div className="absolute inset-0 -z-20">
                <div className="absolute inset-0 bg-gradient-radial from-purple-500/30 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-transparent to-transparent" style={{ top: '60%', left: '70%' }} />
            </div>

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 -z-10 opacity-30"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                    maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)'
                }}
            />

            {/* Floating Shapes */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <motion.div
                    className="absolute top-[10%] left-[10%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-purple-500/10 to-transparent blur-sm"
                    animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-[60%] right-[15%] w-[200px] h-[200px] rounded-full bg-gradient-to-br from-cyan-500/10 to-transparent blur-sm"
                    animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-[20%] right-[20%] w-[150px] h-[150px] border border-purple-500/20 blur-sm"
                    style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl">
                <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-gray-400 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Available for freelance work
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 tracking-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    Crafting Digital <br />
                    <span className="gradient-text">Experiences</span>
                </motion.h1>

                <motion.p
                    className="text-base md:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Graphic Designer & UI/UX Designer specializing in morph transitions, clean interfaces, and premium aesthetics. Transforming ideas into pixel-perfect reality.
                </motion.p>

                <motion.div
                    className="flex gap-4 justify-center flex-wrap"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <motion.a
                        href="#projects"
                        className="px-10 py-4 gradient-bg text-white rounded-full font-semibold text-base shadow-lg shadow-purple-500/30"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        View My Work
                    </motion.a>
                    <motion.a
                        href="#contact"
                        className="px-10 py-4 bg-transparent text-white rounded-full font-semibold text-base border border-white/10 hover:border-gray-400 hover:bg-white/5 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Get in Touch
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
