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
        const REVEAL_RADIUS = 220;
        const REPEL_FORCE = 100;

        // Particle Class with Smooth Zero-Gravity Physics
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.baseX = this.x;
                this.baseY = this.y;

                // Velocity for smooth momentum
                this.vx = 0;
                this.vy = 0;

                this.size = Math.random() * 2.5 + 0.8;

                // Gentle floating motion
                this.floatSpeed = (Math.random() - 0.5) * 0.3;
                this.floatAngle = Math.random() * Math.PI * 2;
                this.floatRadius = Math.random() * 1.5;

                // Physics properties for smooth movement
                this.friction = 0.92; // Fluid drag
                this.springStrength = 0.02; // Spring back to position
                this.mass = Math.random() * 0.5 + 0.5;
            }

            update(mouse) {
                // Calculate distance from mouse
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Smooth repulsion force (like pushing through water)
                if (distance < REPEL_FORCE && distance > 0) {
                    const force = (REPEL_FORCE - distance) / REPEL_FORCE;
                    const angle = Math.atan2(this.y - mouse.y, this.x - mouse.x);

                    // Apply force with smooth easing
                    const smoothForce = Math.pow(force, 1.5) * 2;
                    this.vx += Math.cos(angle) * smoothForce / this.mass;
                    this.vy += Math.sin(angle) * smoothForce / this.mass;
                }

                // Gentle floating motion (zero gravity drift)
                this.floatAngle += this.floatSpeed * 0.02;
                const floatX = Math.cos(this.floatAngle) * this.floatRadius * 0.1;
                const floatY = Math.sin(this.floatAngle) * this.floatRadius * 0.1;

                this.baseX += floatX;
                this.baseY += floatY;

                // Spring force back to base position (smooth elastic)
                const springDx = this.baseX - this.x;
                const springDy = this.baseY - this.y;

                this.vx += springDx * this.springStrength;
                this.vy += springDy * this.springStrength;

                // Apply friction (viscous drag like water)
                this.vx *= this.friction;
                this.vy *= this.friction;

                // Update position with velocity
                this.x += this.vx;
                this.y += this.vy;

                // Wrap around edges smoothly
                if (this.baseX < -10) this.baseX = canvas.width + 10;
                if (this.baseX > canvas.width + 10) this.baseX = -10;
                if (this.baseY < -10) this.baseY = canvas.height + 10;
                if (this.baseY > canvas.height + 10) this.baseY = -10;
            }

            draw(mouse) {
                // Calculate distance from mouse for visibility
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Only draw if within reveal radius (bubble effect)
                if (distance < REVEAL_RADIUS) {
                    // Smooth fade with easing curve
                    const rawOpacity = 1 - (distance / REVEAL_RADIUS);
                    const finalOpacity = Math.pow(rawOpacity, 1.2) * 0.85;

                    // Subtle pulsing effect
                    const pulse = Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.1 + 0.9;

                    // Draw soft glow (water-like shimmer)
                    const gradient = ctx.createRadialGradient(
                        this.x, this.y, 0,
                        this.x, this.y, this.size * 4
                    );

                    const grey = 220 + Math.floor(Math.random() * 35);
                    gradient.addColorStop(0, `rgba(${grey}, ${grey}, ${grey}, ${finalOpacity * pulse * 0.9})`);
                    gradient.addColorStop(0.4, `rgba(${grey}, ${grey}, ${grey}, ${finalOpacity * pulse * 0.5})`);
                    gradient.addColorStop(1, `rgba(${grey}, ${grey}, ${grey}, 0)`);

                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
                    ctx.fill();

                    // Core particle with soft edge
                    const coreGradient = ctx.createRadialGradient(
                        this.x, this.y, 0,
                        this.x, this.y, this.size
                    );
                    coreGradient.addColorStop(0, `rgba(${grey}, ${grey}, ${grey}, ${finalOpacity * pulse})`);
                    coreGradient.addColorStop(1, `rgba(${grey}, ${grey}, ${grey}, ${finalOpacity * pulse * 0.7})`);

                    ctx.fillStyle = coreGradient;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        // Connect particles with smooth, flowing lines
        const connectParticles = (mouse) => {
            const maxDistance = 90;

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
                                // Smooth opacity calculation
                                const opacity1 = Math.pow(1 - (dist1 / REVEAL_RADIUS), 1.2);
                                const opacity2 = Math.pow(1 - (dist2 / REVEAL_RADIUS), 1.2);
                                const avgOpacity = (opacity1 + opacity2) / 2;
                                const distanceOpacity = 1 - (particleDist / maxDistance);
                                const lineOpacity = avgOpacity * Math.pow(distanceOpacity, 0.8) * 0.35;

                                // Draw smooth line with gradient
                                const lineGradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                                lineGradient.addColorStop(0, `rgba(210, 210, 220, ${lineOpacity})`);
                                lineGradient.addColorStop(0.5, `rgba(220, 220, 230, ${lineOpacity * 1.2})`);
                                lineGradient.addColorStop(1, `rgba(210, 210, 220, ${lineOpacity})`);

                                ctx.strokeStyle = lineGradient;
                                ctx.lineWidth = 0.8;
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
            const particleDensity = window.innerWidth < 768 ? 7000 : 4500;
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / particleDensity);

            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
            particlesRef.current = particles;
        };
        initParticles();

        // Mouse move handler with smooth tracking
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

        // Animation loop with smooth rendering
        let lastTime = 0;
        const fps = 60;
        const interval = 1000 / fps;

        const animate = (currentTime) => {
            const deltaTime = currentTime - lastTime;

            if (deltaTime >= interval) {
                // Smooth clear with slight trail for fluid effect
                ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Draw soft bubble glow around mouse
                if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
                    const bubbleGradient = ctx.createRadialGradient(
                        mouseRef.current.x, mouseRef.current.y, 0,
                        mouseRef.current.x, mouseRef.current.y, REVEAL_RADIUS
                    );
                    bubbleGradient.addColorStop(0, 'rgba(168, 85, 247, 0.04)');
                    bubbleGradient.addColorStop(0.3, 'rgba(168, 85, 247, 0.02)');
                    bubbleGradient.addColorStop(0.7, 'rgba(6, 182, 212, 0.01)');
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

                // Connect particles with smooth lines
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
            style={{ opacity: 0.92 }}
        />
    );
}
