"use client";
import { useEffect, useRef } from "react";

export default function ParticleBackground() {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0, radius: 150 });
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

        // Particle colors matching your design
        const colors = [
            { r: 168, g: 85, b: 247 },   // Purple
            { r: 6, g: 182, b: 212 },     // Cyan
            { r: 236, g: 72, b: 153 },    // Pink
            { r: 139, g: 92, b: 246 },    // Violet
        ];

        // Particle class
        class Particle {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height;
                this.baseX = this.x;
                this.baseY = this.y;
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.baseX = this.x;
                this.baseY = this.y;
                this.size = Math.random() * 2.5 + 0.8;
                this.speedX = Math.random() * 0.4 - 0.2;
                this.speedY = Math.random() * 0.4 - 0.2;
                this.density = Math.random() * 30 + 5;
                this.pulseSpeed = Math.random() * 0.02 + 0.01;
                this.pulsePhase = Math.random() * Math.PI * 2;
            }

            update(mouse) {
                // Calculate distance from mouse
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = mouse.radius;
                const force = (maxDistance - distance) / maxDistance;

                if (distance < mouse.radius) {
                    // Repel from mouse with smooth easing
                    const directionX = forceDirectionX * force * this.density * 0.8;
                    const directionY = forceDirectionY * force * this.density * 0.8;
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    // Return to base position with smooth spring effect
                    if (this.x !== this.baseX) {
                        const dx = this.x - this.baseX;
                        this.x -= dx / 15;
                    }
                    if (this.y !== this.baseY) {
                        const dy = this.y - this.baseY;
                        this.y -= dy / 15;
                    }
                }

                // Drift slowly for organic movement
                this.baseX += this.speedX;
                this.baseY += this.speedY;

                // Pulse animation
                this.pulsePhase += this.pulseSpeed;

                // Wrap around edges
                if (this.baseX < -10) this.baseX = canvas.width + 10;
                if (this.baseX > canvas.width + 10) this.baseX = -10;
                if (this.baseY < -10) this.baseY = canvas.height + 10;
                if (this.baseY > canvas.height + 10) this.baseY = -10;
            }

            draw() {
                // Pulsing size effect
                const pulse = Math.sin(this.pulsePhase) * 0.3 + 1;
                const currentSize = this.size * pulse;

                // Draw particle with gradient
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, currentSize * 3
                );

                gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.8)`);
                gradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.4)`);
                gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, currentSize * 2, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();

                // Core particle
                ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.9)`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }

        // Initialize particles
        const initParticles = () => {
            particles = [];
            // Responsive particle count based on screen size
            const particleDensity = window.innerWidth < 768 ? 12000 : 9000;
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / particleDensity);
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
            particlesRef.current = particles;
        };
        initParticles();

        // Connect particles with lines
        const connectParticles = () => {
            const maxConnectionDistance = 100;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxConnectionDistance) {
                        const opacity = (1 - distance / maxConnectionDistance) * 0.25;

                        // Mix colors for the connection line
                        const r = (particles[i].color.r + particles[j].color.r) / 2;
                        const g = (particles[i].color.g + particles[j].color.g) / 2;
                        const b = (particles[i].color.b + particles[j].color.b) / 2;

                        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
                        ctx.lineWidth = 0.7;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        // Mouse move handler
        const handleMouseMove = (e) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };

        // Touch move handler for mobile
        const handleTouchMove = (e) => {
            if (e.touches.length > 0) {
                mouseRef.current.x = e.touches[0].clientX;
                mouseRef.current.y = e.touches[0].clientY;
            }
        };

        // Touch end handler
        const handleTouchEnd = () => {
            mouseRef.current.x = -1000;
            mouseRef.current.y = -1000;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("touchend", handleTouchEnd);

        // Animation loop with performance optimization
        let lastTime = 0;
        const fps = 60;
        const interval = 1000 / fps;

        const animate = (currentTime) => {
            const deltaTime = currentTime - lastTime;

            if (deltaTime >= interval) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                particles.forEach((particle) => {
                    particle.update(mouseRef.current);
                    particle.draw();
                });

                connectParticles();

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
            window.removeEventListener("touchend", handleTouchEnd);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{ opacity: 0.65 }}
        />
    );
}

