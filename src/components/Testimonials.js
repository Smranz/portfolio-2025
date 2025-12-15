"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, User, Briefcase, Mail } from "lucide-react";

export default function Testimonials() {
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        message: "",
        rating: 5
    });
    const [isClient, setIsClient] = useState(false);

    // Load reviews from LocalStorage on mount
    useEffect(() => {
        setIsClient(true);
        const savedReviews = localStorage.getItem("portfolioRequests");
        if (savedReviews) {
            setReviews(JSON.parse(savedReviews));
        }
    }, []);

    // Save reviews to LocalStorage whenever they change
    useEffect(() => {
        if (isClient) {
            localStorage.setItem("portfolioRequests", JSON.stringify(reviews));
        }
    }, [reviews, isClient]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.message) return;

        const newReview = {
            id: Date.now(),
            name: formData.name,
            role: formData.role || "Client",
            text: formData.message,
            initials: formData.name.substring(0, 2).toUpperCase(),
            rating: formData.rating
        };

        setReviews([newReview, ...reviews]);
        setFormData({ name: "", role: "", message: "", rating: 5 });
    };

    const handleEmailReview = () => {
        if (!formData.name || !formData.message) return;
        const subject = `New Portfolio Review from ${formData.name}`;
        const body = `Name: ${formData.name}%0D%0ARole: ${formData.role}%0D%0ARating: ${formData.rating} Stars%0D%0A%0D%0AReview:%0D%0A${formData.message}`;
        window.location.href = `mailto:samranzahid164@gmail.com?subject=${subject}&body=${body}`;
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
                    Testimonials
                </motion.p>
                <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    Client Reviews
                </motion.h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Form Section */}
                <motion.div
                    className="glass p-8 rounded-3xl"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-bold mb-6">Write a Review</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-purple-500 transition-colors"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="relative">
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Role / Company (Optional)"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-purple-500 transition-colors"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, rating: star })}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <Star
                                            size={24}
                                            fill={star <= formData.rating ? "#f59e0b" : "transparent"}
                                            stroke={star <= formData.rating ? "#f59e0b" : "#4b5563"}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <textarea
                            placeholder="Share your experience working with me..."
                            rows="4"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="submit"
                                className="w-full py-4 gradient-bg rounded-xl font-bold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                            >
                                <Send size={18} />
                                Post Locally
                            </button>
                            <button
                                type="button"
                                onClick={handleEmailReview}
                                className="w-full py-4 bg-white/5 border border-white/10 rounded-xl font-bold text-white hover:bg-white/10 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                            >
                                <Mail size={18} />
                                Send via Email
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-2">
                            *Post Locally saves to your device. Send via Email to submit for official implementation.
                        </p>
                    </form>
                </motion.div>

                {/* Reviews List */}
                <div className="space-y-6">
                    <AnimatePresence mode="popLayout">
                        {(!isClient || reviews.length === 0) ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12 glass rounded-3xl border-dashed border-2 border-white/10"
                            >
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Star size={32} className="text-gray-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
                                <p className="text-gray-400">Be the first to leave a review!</p>
                            </motion.div>
                        ) : (
                            reviews.map((review) => (
                                <motion.div
                                    key={review.id}
                                    layout
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className="glass p-6 rounded-2xl border border-white/10"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center font-bold text-sm">
                                                {review.initials}
                                            </div>
                                            <div>
                                                <h4 className="font-bold leading-tight">{review.name}</h4>
                                                <p className="text-gray-500 text-xs">{review.role}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    fill={i < review.rating ? "#f59e0b" : "transparent"}
                                                    stroke={i < review.rating ? "#f59e0b" : "#4b5563"}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed">"{review.text}"</p>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
