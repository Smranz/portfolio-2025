"use client";
import { useEffect, useRef } from "react";

export default function ParticleBackground() {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
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

        // Mouse reveal radius (bubble size)
        const REVEAL_RADIUS = 200;
        const REPEL_FORCE = 80;

        // Particle Class with Mouse Bubble Effect
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.baseX = this.x;
                this.baseY = this.y;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.density = (Math.random() * 20) + 10;
            }

            update(mouse) {
                // Calculate distance from mouse
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Mouse repulsion within bubble
                if (distance < REPEL_FORCE) {
                    const force = (REPEL_FORCE - distance) / REPEL_FORCE;
                    const directionX = (this.x - mouse.x) / distance;
                    const directionY = (this.y - mouse.y) / distance;
                    this.x += directionX * force * this.density * 0.3;
                    this.y += directionY * force * this.density * 0.3;
                } else {
                    // Spring back to base position
                    const dx = this.x - this.baseX;
                    const dy = this.y - this.baseY;
                    this.x -= dx * 0.05;
                    this.y -= dy * 0.05;
                }

                // Subtle drift
                this.baseX += this.speedX;
                this.baseY += this.speedY;

                // Wrap around edges
                if (this.baseX < 0) this.baseX = canvas.width;
                if (this.baseX > canvas.width) this.baseX = 0;
                if (this.baseY < 0) this.baseY = canvas.height;
                if (this.baseY > canvas.height) this.baseY = 0;
            }

            draw(mouse) {
                // Calculate distance from mouse for visibility
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Only draw if within reveal radius (bubble effect)
                if (distance < REVEAL_RADIUS) {
                    // Fade based on distance from mouse (bubble edge fade)
                    const opacity = 1 - (distance / REVEAL_RADIUS);
                    const finalOpacity = Math.pow(opacity, 0.8); // Smoother falloff

                    // Draw glow
                    const gradient = ctx.createRadialGradient(
                        this.x, this.y, 0,
                        this.x, this.y, this.size * 3
                    );

                    const grey = 220 + Math.floor(Math.random() * 35);
                    gradient.addColorStop(0, `rgba(${grey}, ${grey}, ${grey}, ${finalOpacity * 0.8})`);
                    gradient.addColorStop(1, `rgba(${grey}, ${grey}, ${grey}, 0)`);

                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                    ctx.fill();

                    // Core particle
                    ctx.fillStyle = `rgba(${grey}, ${grey}, ${grey}, ${finalOpacity})`;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        // Connect particles with lines (only visible in bubble)
        const connectParticles = (mouse) => {
            const maxDistance = 80;

            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];

                // Check if particle is in reveal radius
                const dx1 = mouse.x - p1.x;
                const dy1 = mouse.y - p1.y;
                const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

                if (dist1 < REVEAL_RADIUS) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const p2 = particles[j];

                        // Check if second particle is also in reveal radius
                        const dx2 = mouse.x - p2.x;
                        const dy2 = mouse.y - p2.y;
                        const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                        if (dist2 < REVEAL_RADIUS) {
                            // Calculate distance between particles
                            const pdx = p1.x - p2.x;
                            const pdy = p1.y - p2.y;
                            const particleDist = Math.sqrt(pdx * pdx + pdy * pdy);

                            if (particleDist < maxDistance) {
                                // Calculate opacity based on both particles' distance from mouse
                                const opacity1 = 1 - (dist1 / REVEAL_RADIUS);
                                const opacity2 = 1 - (dist2 / REVEAL_RADIUS);
                                const avgOpacity = (opacity1 + opacity2) / 2;
                                const lineOpacity = (1 - particleDist / maxDistance) * avgOpacity * 0.3;

                                ctx.strokeStyle = `rgba(200, 200, 200, ${lineOpacity})`;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(p1.x, p1.y);
                                ctx.lineTo(p2.x, p2.y);
                                ctx.stroke();
                            }
                        }
                    }
                }
            }
        };

        // Initialize particles
        const initParticles = () => {
            particles = [];
            const particleDensity = window.innerWidth < 768 ? 8000 : 5000;
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / particleDensity);

            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
            particlesRef.current = particles;
        };
        initParticles();

        // Mouse move handler
        const handleMouseMove = (e) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };

        // Touch move handler
        const handleTouchMove = (e) => {
            if (e.touches.length > 0) {
                mouseRef.current.x = e.touches[0].clientX;
                mouseRef.current.y = e.touches[0].clientY;
            }
        };

        // Mouse leave - hide bubble
        const handleMouseLeave = () => {
            mouseRef.current.x = -1000;
            mouseRef.current.y = -1000;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        // Animation loop
        let lastTime = 0;
        const fps = 60;
        const interval = 1000 / fps;

        const animate = (currentTime) => {
            const deltaTime = currentTime - lastTime;

            if (deltaTime >= interval) {
                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw bubble glow effect around mouse
                if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
                    const bubbleGradient = ctx.createRadialGradient(
                        mouseRef.current.x, mouseRef.current.y, 0,
                        mouseRef.current.x, mouseRef.current.y, REVEAL_RADIUS
                    );
                    bubbleGradient.addColorStop(0, 'rgba(168, 85, 247, 0.03)');
                    bubbleGradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.01)');
                    bubbleGradient.addColorStop(1, 'rgba(168, 85, 247, 0)');

                    ctx.fillStyle = bubbleGradient;
                    ctx.beginPath();
                    ctx.arc(mouseRef.current.x, mouseRef.current.y, REVEAL_RADIUS, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Update and draw particles
                particles.forEach((particle) => {
                    particle.update(mouseRef.current);
                    particle.draw(mouseRef.current);
                });

                // Connect particles
                connectParticles(mouseRef.current);

                lastTime = currentTime - (deltaTime % interval);
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };
        animate(0);

        // Cleanup
        return () => {
            window.removeEventListener("resize", setCanvasSize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{ opacity: 0.9 }}
        />
    );
}
