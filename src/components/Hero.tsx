import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const TITLES = [
    'CS Undergraduate · NMIMS',
    'Quant Finance Enthusiast',
    'AI & ML Researcher',
    'Full-Stack Developer',
];

function useTypingEffect(texts: string[], speed = 80, pauseMs = 1800) {
    const [displayed, setDisplayed] = useState('');
    const [textIdx, setTextIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [erasing, setErasing] = useState(false);

    useEffect(() => {
        const current = texts[textIdx];
        let timeout: ReturnType<typeof setTimeout>;

        if (!erasing && charIdx < current.length) {
            timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
        } else if (!erasing && charIdx === current.length) {
            timeout = setTimeout(() => setErasing(true), pauseMs);
        } else if (erasing && charIdx > 0) {
            timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
        } else if (erasing && charIdx === 0) {
            setErasing(false);
            setTextIdx((i) => (i + 1) % texts.length);
        }

        setDisplayed(current.slice(0, charIdx));
        return () => clearTimeout(timeout);
    }, [charIdx, erasing, textIdx, texts, speed, pauseMs]);

    return displayed;
}


export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const frameRef = useRef<number>(0);
    const title = useTypingEffect(TITLES);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 300);
        return () => clearTimeout(timer);
    }, []);

    // Particle ring effect in hero canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        type Particle = { angle: number; radius: number; speed: number; size: number; alpha: number; ring: number };

        const particles: Particle[] = Array.from({ length: 120 }, (_, i) => ({
            angle: (i / 120) * Math.PI * 2 + Math.random() * 0.3,
            radius: 90 + Math.random() * 80,
            speed: 0.002 + Math.random() * 0.003,
            size: Math.random() * 2 + 0.5,
            alpha: 0.3 + Math.random() * 0.7,
            ring: Math.floor(Math.random() * 3),
        }));

        const radii = [100, 140, 180];
        const t0 = performance.now();

        const animate = (now: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            const elapsed = (now - t0) / 1000;

            // Draw faint rings
            radii.forEach((r, i) => {
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(34, 211, 238, ${0.05 + i * 0.02})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            });

            particles.forEach((p) => {
                p.angle += p.speed;
                const r = radii[p.ring];
                const x = cx + Math.cos(p.angle) * r;
                const y = cy + Math.sin(p.angle) * r * 0.3; // perspective flatten

                const flicker = 0.7 + 0.3 * Math.sin(elapsed * 3 + p.angle * 5);
                ctx.beginPath();
                ctx.arc(x, y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(34, 211, 238, ${p.alpha * flicker})`;
                ctx.fill();
            });

            frameRef.current = requestAnimationFrame(animate);
        };

        animate(performance.now());
        return () => cancelAnimationFrame(frameRef.current);
    }, []);

    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{ zIndex: 10 }}
        >
            {/* Central orbital ring canvas */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none">
                <canvas ref={canvasRef} className="w-full h-full opacity-60" />
            </div>

            {/* Glowing core */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, rgba(14,165,233,0.05) 50%, transparent 70%)',
                    boxShadow: '0 0 80px rgba(34,211,238,0.2), 0 0 160px rgba(14,165,233,0.08)',
                }}
            />

            {/* Main content */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                {/* Status indicator */}
                <AnimatePresence>
                    {loaded && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center justify-center gap-2 mb-8"
                        >
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase">
                                System Online · Available for Opportunities
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Name */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h1 className="font-sans font-bold leading-none tracking-tight mb-2"
                        style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}
                    >
                        <span className="text-white">Yashasvee </span>
                        <span
                            className="glow-text"
                            style={{ color: '#22d3ee' }}
                        >
                            Wankhade
                        </span>
                    </h1>
                </motion.div>

                {/* Divider line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="h-px w-64 mx-auto my-5"
                    style={{ background: 'linear-gradient(90deg, transparent, #22d3ee, transparent)' }}
                />

                {/* Typing title */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="h-8 flex items-center justify-center gap-1 mb-6"
                >
                    <span className="font-mono text-lg text-cyan-300">{title}</span>
                    <span className="font-mono text-lg text-cyan-400 cursor-blink">|</span>
                </motion.div>

                {/* Bio */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 }}
                    className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed mb-10"
                >
                    Final-year CS undergrad at NMIMS · CGPA 3.98/4 ·
                    Passionate about Quantitative Finance, AI, and innovative
                    computing solutions for real-world challenges.
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8 }}
                    className="flex flex-wrap items-center justify-center gap-4 mb-14"
                >
                    <a
                        href="https://github.com/YashasveeWankhade"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300"
                        style={{
                            background: 'rgba(34,211,238,0.1)',
                            border: '1px solid rgba(34,211,238,0.3)',
                            color: '#22d3ee',
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(34,211,238,0.2)';
                            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(34,211,238,0.3)';
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(34,211,238,0.1)';
                            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                        }}
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                    </a>

                    <a
                        href="https://linkedin.com/in/yashasvee"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300"
                        style={{
                            background: 'rgba(14,165,233,0.1)',
                            border: '1px solid rgba(14,165,233,0.3)',
                            color: '#38bdf8',
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(14,165,233,0.2)';
                            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(14,165,233,0.3)';
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(14,165,233,0.1)';
                            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                        }}
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        LinkedIn
                    </a>

                    <button
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300"
                        style={{
                            background: 'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(14,165,233,0.15))',
                            border: '1px solid rgba(34,211,238,0.4)',
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                            (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 25px rgba(34,211,238,0.25)';
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                        }}
                    >
                        Explore Projects
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </motion.div>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.0 }}
                    className="flex items-center justify-center gap-8 flex-wrap"
                >
                    {[
                        { label: 'CGPA', value: '3.98/4' },
                        { label: 'Projects', value: '3+' },
                        { label: 'Publication', value: 'IEEE' },
                        { label: 'Status', value: 'Open to Work' },
                    ].map(({ label, value }) => (
                        <div key={label} className="text-center">
                            <div className="font-mono text-lg font-bold" style={{ color: '#22d3ee' }}>{value}</div>
                            <div className="text-xs text-gray-500 tracking-widest uppercase mt-0.5">{label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4 }}
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors duration-300 group"
            >
                <span className="text-xs font-mono tracking-widest uppercase">Scroll to Explore</span>
                <ChevronDown className="w-5 h-5 animate-bounce group-hover:text-cyan-400" />
            </motion.button>

            {/* HUD corners */}
            <div className="absolute top-8 left-8 opacity-30 pointer-events-none">
                <div className="w-6 h-6 border-t-2 border-l-2 border-cyan-400" />
            </div>
            <div className="absolute top-8 right-8 opacity-30 pointer-events-none">
                <div className="w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
            </div>
            <div className="absolute bottom-8 left-8 opacity-30 pointer-events-none">
                <div className="w-6 h-6 border-b-2 border-l-2 border-cyan-400" />
            </div>
            <div className="absolute bottom-8 right-8 opacity-30 pointer-events-none">
                <div className="w-6 h-6 border-b-2 border-r-2 border-cyan-400" />
            </div>
        </section>
    );
}
