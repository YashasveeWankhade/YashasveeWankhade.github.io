import { useEffect, useRef } from 'react';

interface NebulaPoint {
    x: number;
    y: number;
    radius: number;
    color: string;
    alpha: number;
    drift: number;
    driftSpeed: number;
    phase: number;
}

export default function NebulaBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const frameRef = useRef<number>(0);
    const pointsRef = useRef<NebulaPoint[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initPoints();
        };

        const initPoints = () => {
            const nebulae = [
                { cx: 0.15, cy: 0.3, color: '#0ea5e9', count: 8 },
                { cx: 0.8, cy: 0.6, color: '#06b6d4', count: 6 },
                { cx: 0.5, cy: 0.8, color: '#0284c7', count: 5 },
                { cx: 0.3, cy: 0.7, color: '#0369a1', count: 4 },
            ];

            pointsRef.current = nebulae.flatMap(({ cx, cy, color, count }) =>
                Array.from({ length: count }, (_, i) => ({
                    x: (cx + (Math.random() - 0.5) * 0.2) * window.innerWidth,
                    y: (cy + (Math.random() - 0.5) * 0.2) * window.innerHeight,
                    radius: (80 + Math.random() * 160) * (window.innerWidth / 1440),
                    color,
                    alpha: 0.03 + Math.random() * 0.04,
                    drift: Math.random() * Math.PI * 2,
                    driftSpeed: 0.0002 + Math.random() * 0.0003,
                    phase: i / count,
                }))
            );
        };

        window.addEventListener('resize', resize);
        resize();

        let t = 0;
        const animate = () => {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            t += 0.001;

            pointsRef.current.forEach((p) => {
                const ox = Math.sin(t * p.driftSpeed * 1000 + p.drift) * 30;
                const oy = Math.cos(t * p.driftSpeed * 800 + p.drift + 1) * 20;

                const gradient = ctx.createRadialGradient(
                    p.x + ox, p.y + oy, 0,
                    p.x + ox, p.y + oy, p.radius
                );
                gradient.addColorStop(0, p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0'));
                gradient.addColorStop(0.5, p.color + '0a');
                gradient.addColorStop(1, 'transparent');

                ctx.beginPath();
                ctx.arc(p.x + ox, p.y + oy, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            });

            frameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(frameRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
}
