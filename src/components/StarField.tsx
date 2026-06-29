import { useEffect, useRef } from 'react';

interface Star {
    x: number;
    y: number;
    z: number;
    px: number;
    py: number;
    size: number;
    speed: number;
    color: string;
}

interface Props {
    count?: number;
    speed?: number;
}

const COLORS = ['#ffffff', '#22d3ee', '#7dd3fc', '#bae6fd', '#e0f2fe'];

export default function StarField({ count = 800, speed = 0.3 }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const frameRef = useRef<number>(0);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        const initStars = () => {
            starsRef.current = Array.from({ length: count }, () => createStar(canvas));
        };

        const createStar = (canvas: HTMLCanvasElement): Star => ({
            x: Math.random() * canvas.width - canvas.width / 2,
            y: Math.random() * canvas.height - canvas.height / 2,
            z: Math.random() * canvas.width,
            px: 0,
            py: 0,
            size: Math.random() * 1.5 + 0.3,
            speed: Math.random() * speed + 0.1,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });

        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current = {
                x: (e.clientX - window.innerWidth / 2) * 0.0002,
                y: (e.clientY - window.innerHeight / 2) * 0.0002,
            };
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouseMove);
        resize();

        const animate = () => {
            if (!canvas || !ctx) return;
            ctx.fillStyle = 'rgba(0, 1, 10, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            starsRef.current.forEach((star) => {
                star.z -= star.speed;
                if (star.z <= 0) {
                    star.x = Math.random() * canvas.width - cx;
                    star.y = Math.random() * canvas.height - cy;
                    star.z = canvas.width;
                    star.px = 0;
                    star.py = 0;
                }

                const sx = (star.x / star.z) * canvas.width + cx;
                const sy = (star.y / star.z) * canvas.height + cy;

                if (sx < 0 || sx > canvas.width || sy < 0 || sy > canvas.height) {
                    star.x = Math.random() * canvas.width - cx;
                    star.y = Math.random() * canvas.height - cy;
                    star.z = canvas.width;
                    star.px = 0;
                    star.py = 0;
                    return;
                }

                const size = Math.max(0.1, star.size * (1 - star.z / canvas.width) * 2);
                const alpha = Math.min(1, (1 - star.z / canvas.width) * 1.5);

                if (star.px !== 0) {
                    ctx.beginPath();
                    ctx.strokeStyle = star.color;
                    ctx.globalAlpha = alpha * 0.6;
                    ctx.lineWidth = size * 0.5;
                    ctx.moveTo(star.px, star.py);
                    ctx.lineTo(sx, sy);
                    ctx.stroke();
                }

                ctx.beginPath();
                ctx.arc(sx, sy, size, 0, Math.PI * 2);
                ctx.fillStyle = star.color;
                ctx.globalAlpha = alpha;
                ctx.fill();

                star.px = sx;
                star.py = sy;
            });

            ctx.globalAlpha = 1;
            frameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(frameRef.current);
        };
    }, [count, speed]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
}
