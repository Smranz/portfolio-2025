"use client";
import { motion } from "framer-motion";

const links = [
    { name: "Work", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
];

export default function Navbar() {
    return (
        <motion.nav
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[1000] flex items-center justify-between gap-4 px-6 md:px-10 py-3 md:py-4 glass rounded-full w-[90%] md:w-auto max-w-sm md:max-w-none"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <a href="#hero" className="font-bold text-xl md:text-2xl gradient-text">
                Portfolio
            </a>

            <div className="hidden md:flex items-center gap-6">
                {links.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className="text-gray-400 text-sm md:text-base font-medium px-2 md:px-5 py-2 rounded-full hover:text-white hover:bg-white/5 transition-all"
                    >
                        {link.name}
                    </a>
                ))}
            </div>

            <a
                href="#contact"
                className="ml-4 px-6 py-2.5 gradient-bg text-white rounded-full font-semibold text-base hover:opacity-90 transition-opacity"
            >
                Let's Talk
            </a>
        </motion.nav>
    );
}
