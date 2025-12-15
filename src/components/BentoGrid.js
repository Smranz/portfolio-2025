"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

const items = [
    {
        id: 1,
        category: "Social Media & Banners",
        title: "Marketing Assets",
        color: "from-purple-600 to-purple-900",
        size: "large",
        images: [
            "/graphics/poster1.jpg",
            "/graphics/poster2.jpg",
            "/graphics/poster3.jpg",
            "/graphics/poster4.jpg"
        ]
    },
    {
        id: 2,
        category: "Card Design",
        title: "Business Cards",
        color: "from-pink-500 to-red-600",
        size: "normal",
        images: [
            "/cards/card1.jpg",
            "/cards/card2.jpg",
            "/cards/card3.jpg",
            "/cards/card4.png",
            "/cards/card5.png"
        ]
    },
    {
        id: 3,
        category: "Video Editing",
        title: "Commercial Reel",
        color: "from-cyan-400 to-blue-600",
        size: "tall",
        videos: [
            "/video/reel_open.mp4",
            "/video/video1.mp4",
            "/video/video2.mp4",
            "/video/video3.mp4",
            "/video/video4.mp4"
        ]
    },
    {
        id: 4,
        category: "Video Editing",
        title: "Morph Presentations",
        color: "from-green-400 to-emerald-600",
        size: "normal",
        videos: [
            "/ppt/ai_magic_wand.mp4",
            "/ppt/group_4_presentation.webm",
            "/ppt/introduction_to_robotics.mp4",
            "/ppt/screen_recording_132923.mp4"
        ]
    },
];

function MediaLightbox({ src, type, onClose }) {
    if (!src) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-50"
            >
                <X size={24} />
            </button>

            {type === 'video' ? (
                <motion.video
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    src={src}
                    className="max-w-full max-h-screen object-contain"
                    controls
                    autoPlay
                    onClick={(e) => e.stopPropagation()}
                />
            ) : (
                <motion.img
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    src={src}
                    alt="Full screen preview"
                    className="max-w-full max-h-screen object-contain"
                    onClick={(e) => e.stopPropagation()}
                />
            )}
        </motion.div>
    );
}

function GalleryModal({ item, onClose }) {
    const [previewMedia, setPreviewMedia] = useState(null);

    if (!item) return null;

    const mediaList = item.images || item.videos || [];
    const isVideo = !!item.videos;

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-[#111] w-full max-w-5xl rounded-3xl overflow-hidden border border-white/10 relative max-h-[90vh] flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#111] z-10 sticky top-0">
                        <div>
                            <span className="text-purple-500 text-sm uppercase tracking-wider">{item.category}</span>
                            <h2 className="text-2xl font-bold">{item.title}</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="overflow-y-auto p-4 md:p-6 bg-[#111]">
                        <div className="columns-1 md:columns-2 gap-4 space-y-4">
                            {mediaList.map((media, idx) => (
                                <div
                                    key={idx}
                                    className="break-inside-avoid relative rounded-xl overflow-hidden border border-white/5 bg-white/5 group shadow-2xl cursor-zoom-in"
                                    onClick={() => setPreviewMedia({ src: media, type: isVideo ? 'video' : 'image' })}
                                >
                                    {isVideo ? (
                                        <video
                                            src={media}
                                            className="w-full h-auto object-contain"
                                            muted
                                            loop
                                            onMouseOver={e => e.target.play()}
                                            onMouseOut={e => e.target.pause()}
                                        />
                                    ) : (
                                        <img
                                            src={media}
                                            alt={`${item.title} ${idx + 1}`}
                                            className="w-full h-auto object-contain"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                        <span className="opacity-0 group-hover:opacity-100 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm transition-opacity">
                                            {isVideo ? 'Play Video' : 'View Full Size'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {previewMedia && (
                    <MediaLightbox src={previewMedia.src} type={previewMedia.type} onClose={() => setPreviewMedia(null)} />
                )}
            </AnimatePresence>
        </>
    );
}

function BentoItem({ item, index, onClick }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (!item.images || item.images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [item.images]);

    return (
        <motion.div
            className={`
              bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden relative cursor-pointer
              hover:border-purple-500/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/30 transition-all group
              ${item.size === 'large' ? 'col-span-1 row-span-2 md:col-span-2 md:row-span-2' : ''}
              ${item.size === 'tall' ? 'row-span-2 md:row-span-2' : ''}
              ${item.size === 'wide' ? 'md:col-span-2' : ''}
            `}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onClick(item)}
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all`} />

            {item.videos && item.videos.length > 0 && (
                <div className="absolute inset-0">
                    <video
                        src={item.videos[0]}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                </div>
            )}

            {item.images && (
                <div className="absolute inset-0">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentImageIndex}
                            src={item.images[currentImageIndex]}
                            alt={item.title}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        />
                    </AnimatePresence>
                </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all z-10">
                <span className="text-xs text-purple-400 uppercase tracking-wider block mb-1">{item.category}</span>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                {item.images && <p className="text-xs text-gray-300 mt-2 flex items-center gap-1">Click to view gallery <ArrowUpRight size={12} /></p>}
                {item.videos && <p className="text-xs text-gray-300 mt-2 flex items-center gap-1">Click to view gallery <ArrowUpRight size={12} /></p>}
            </div>

            {!item.images && !item.videos && (
                <div className="absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all z-10">
                    <ArrowUpRight size={18} />
                </div>
            )}
        </motion.div>
    );
}

export default function BentoGrid() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [playingVideo, setPlayingVideo] = useState(null);

    const handleItemClick = (item) => {
        if ((item.images && item.images.length > 0) || (item.videos && item.videos.length > 0)) {
            setSelectedItem(item);
        }
    };

    return (
        <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <motion.p
                    className="text-sm text-purple-500 uppercase tracking-widest mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Gallery
                </motion.p>
                <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    Creative Showcase
                </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-6">
                {items.map((item, index) => (
                    <BentoItem
                        key={item.id}
                        item={item}
                        index={index}
                        onClick={handleItemClick}
                    />
                ))}
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <GalleryModal item={selectedItem} onClose={() => setSelectedItem(null)} />
                )}
                {playingVideo && (
                    <MediaLightbox src={playingVideo} type="video" onClose={() => setPlayingVideo(null)} />
                )}
            </AnimatePresence>
        </section>
    );
}
