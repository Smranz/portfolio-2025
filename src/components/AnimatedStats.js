"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
    { value: 4, suffix: "+", label: "Years Experience", decimals: 0 },
    { value: 10, suffix: "+", label: "Projects Completed", decimals: 0 },
    { value: 15, suffix: "+", label: "Happy Clients", decimals: 0 },
    { value: 100, suffix: "%", label: "Client Satisfaction", decimals: 0 },
];

function AnimatedNumber({ value, suffix, decimals }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const duration = 2000;
            const startTime = Date.now();

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = eased * value;

                setCount(current);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }
    }, [isInView, value]);

    return (
        <span ref={ref}>
            {count.toFixed(decimals)}{suffix}
        </span>
    );
}

export default function AnimatedStats() {
    return (
        <section className="py-20 bg-[#0a0a0a] border-y border-white/10">
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="text-center p-8 relative"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="text-5xl md:text-6xl font-bold gradient-text leading-none mb-2">
                                <AnimatedNumber
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    decimals={stat.decimals}
                                />
                            </div>
                            <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
                            {index < stats.length - 1 && (
                                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-3/5 bg-white/10" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
