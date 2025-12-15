export default function Ticker() {
    const tools = ["Figma", "Canva", "Photoshop", "Illustrator", "After Effects", "Adobe XD", "Premiere Pro", "Lightroom"];
    const doubledTools = [...tools, ...tools];

    return (
        <div className="w-full overflow-hidden bg-[#0a0a0a] py-8 border-y border-white/10">
            <div className="flex whitespace-nowrap animate-scroll-ticker">
                {doubledTools.map((tool, index) => (
                    <span key={index} className="flex items-center gap-6 mx-8">
                        <span className="text-4xl md:text-5xl font-bold text-transparent hover:[-webkit-text-stroke:1px_#8b5cf6] transition-all uppercase" style={{ WebkitTextStroke: '1px rgb(82 82 91)' }}>
                            {tool}
                        </span>
                        <span className="w-3 h-3 bg-purple-500 rounded-full opacity-50" />
                    </span>
                ))}
            </div>
        </div>
    );
}
