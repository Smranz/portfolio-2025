"use client";
import { useEffect, useRef } from "react";

export default function ParticleBackground() {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let particles = [];

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener("resize", () => {
            setCanvasSize();
            initParticles();
        });

        // Google Antigravity Particle Class
        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                // Start from bottom or random position
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + Math.random() * 100;

                // Very small particles like Google Antigravity
                this.size = Math.random() * 1.5 + 0.5;

                // Slow upward drift (antigravity)
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = -(Math.random() * 0.5 + 0.2); // Negative = upward

                // Lifecycle for fade in/out
                this.life = 0;
                this.maxLife = Math.random() * 300 + 200;
                this.fadeInDuration = 50;
                this.fadeOutDuration = 50;

                // Subtle horizontal drift
                this.driftSpeed = (Math.random() - 0.5) * 0.05;
                this.driftPhase = Math.random() * Math.PI * 2;
            }

            update() {
                // Move upward (antigravity effect)
                this.y += this.speedY;
                this.x += this.speedX;

                // Add subtle horizontal drift with sine wave
                this.driftPhase += 0.02;
                this.x += Math.sin(this.driftPhase) * this.driftSpeed;

                // Update lifecycle
                this.life++;

                // Reset when particle dies or goes off screen
                if (this.life >= this.maxLife || this.y < -20) {
                    this.reset();
                }
            }

            draw() {
                // Calculate opacity based on lifecycle (fade in/out)
                let opacity;
                if (this.life < this.fadeInDuration) {
                    // Fade in
                    opacity = this.life / this.fadeInDuration;
                } else if (this.life > this.maxLife - this.fadeOutDuration) {
                    // Fade out
                    opacity = (this.maxLife - this.life) / this.fadeOutDuration;
                } else {
                    // Full opacity
                    opacity = 1;
                }

                opacity = Math.max(0, Math.min(1, opacity)) * 0.6;

                // Draw particle - grey/white like Google Antigravity
                const grey = 200 + Math.floor(Math.random() * 55);

                // Outer glow (very subtle)
                ctx.beginPath();
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size * 4
                );
                gradient.addColorStop(0, `rgba(${grey}, ${grey}, ${grey}, ${opacity * 0.8})`);
                gradient.addColorStop(1, `rgba(${grey}, ${grey}, ${grey}, 0)`);
                ctx.fillStyle = gradient;
                ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
                ctx.fill();

                // Core particle
                ctx.beginPath();
                ctx.fillStyle = `rgba(${grey}, ${grey}, ${grey}, ${opacity})`;
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles - many more for Google Antigravity effect
        const initParticles = () => {
            particles = [];
            // Higher density for the Google Antigravity effect
            const particleDensity = window.innerWidth < 768 ? 6000 : 4000;
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / particleDensity);

            for (let i = 0; i < numberOfParticles; i++) {
                const particle = new Particle();
                // Initialize at random positions for initial appearance
                particle.y = Math.random() * canvas.height;
                particle.life = Math.random() * particle.maxLife;
                particles.push(particle);
            }
            particlesRef.current = particles;
        };
        initParticles();

        // Animation loop
        let lastTime = 0;
        const fps = 60;
        const interval = 1000 / fps;

        const animate = (currentTime) => {
            const deltaTime = currentTime - lastTime;

            if (deltaTime >= interval) {
                // Clear with slight trail effect for smoother appearance
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Update and draw all particles
                particles.forEach((particle) => {
                    particle.update();
                    particle.draw();
                });

                lastTime = currentTime - (deltaTime % interval);
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };
        animate(0);

        // Cleanup
        return () => {
            window.removeEventListener("resize", setCanvasSize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{ opacity: 0.8 }}
        />
    );
}
