import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function useInView(ref: React.RefObject<Element>, threshold = 0.2) {
    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            },
            { threshold }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref, threshold]);
}

function PlanetCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = 280;
        canvas.height = 280;

        let angle = 0;
        let frameId: number;

        const drawPlanet = () => {
            ctx.clearRect(0, 0, 280, 280);
            const cx = 140, cy = 140, r = 90;

            // Planet glow
            const glow = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 1.6);
            glow.addColorStop(0, 'rgba(34,211,238,0.08)');
            glow.addColorStop(1, 'transparent');
            ctx.beginPath();
            ctx.arc(cx, cy, r * 1.6, 0, Math.PI * 2);
            ctx.fillStyle = glow;
            ctx.fill();

            // Planet body
            const bodyGrad = ctx.createRadialGradient(cx - 25, cy - 25, 5, cx, cy, r);
            bodyGrad.addColorStop(0, '#1e3a5f');
            bodyGrad.addColorStop(0.4, '#0c2340');
            bodyGrad.addColorStop(0.7, '#071829');
            bodyGrad.addColorStop(1, '#020d1a');
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.fillStyle = bodyGrad;
            ctx.fill();

            // Surface details (continents)
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.clip();

            const landPatches = [
                { x: 0.3, y: 0.35, rx: 0.2, ry: 0.12 },
                { x: -0.2, y: -0.1, rx: 0.15, ry: 0.1 },
                { x: 0.1, y: -0.25, rx: 0.18, ry: 0.08 },
                { x: -0.3, y: 0.2, rx: 0.12, ry: 0.09 },
            ];

            landPatches.forEach((p) => {
                const ox = Math.sin(angle * 0.3 + p.x * 10) * 5;
                ctx.beginPath();
                ctx.ellipse(
                    cx + p.x * r + ox,
                    cy + p.y * r,
                    p.rx * r,
                    p.ry * r,
                    angle * 0.1,
                    0, Math.PI * 2
                );
                ctx.fillStyle = 'rgba(34,211,238,0.08)';
                ctx.fill();
            });

            // Grid lines
            ctx.strokeStyle = 'rgba(34,211,238,0.06)';
            ctx.lineWidth = 0.5;
            for (let i = -r; i < r; i += 25) {
                ctx.beginPath();
                ctx.moveTo(cx - r, cy + i);
                ctx.lineTo(cx + r, cy + i);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(cx + i, cy - r);
                ctx.lineTo(cx + i, cy + r);
                ctx.stroke();
            }

            ctx.restore();

            // Atmosphere rim
            const atmo = ctx.createRadialGradient(cx, cy, r - 4, cx, cy, r + 12);
            atmo.addColorStop(0, 'transparent');
            atmo.addColorStop(0.4, 'rgba(34,211,238,0.06)');
            atmo.addColorStop(0.7, 'rgba(14,165,233,0.08)');
            atmo.addColorStop(1, 'transparent');
            ctx.beginPath();
            ctx.arc(cx, cy, r + 12, 0, Math.PI * 2);
            ctx.fillStyle = atmo;
            ctx.fill();

            // Orbital ring
            ctx.save();
            ctx.translate(cx, cy);
            ctx.scale(1, 0.28);
            ctx.beginPath();
            ctx.arc(0, 0, r * 1.45, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(34,211,238,0.2)';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(0, 0, r * 1.6, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(34,211,238,0.08)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.restore();

            // Orbiting moon
            const moonX = cx + Math.cos(angle) * r * 1.52;
            const moonY = cy + Math.sin(angle) * r * 0.43;
            ctx.beginPath();
            ctx.arc(moonX, moonY, 5, 0, Math.PI * 2);
            const moonGrad = ctx.createRadialGradient(moonX - 1, moonY - 1, 1, moonX, moonY, 5);
            moonGrad.addColorStop(0, '#7dd3fc');
            moonGrad.addColorStop(1, '#0369a1');
            ctx.fillStyle = moonGrad;
            ctx.fill();

            // Moon glow
            const mg = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, 12);
            mg.addColorStop(0, 'rgba(125,211,252,0.3)');
            mg.addColorStop(1, 'transparent');
            ctx.beginPath();
            ctx.arc(moonX, moonY, 12, 0, Math.PI * 2);
            ctx.fillStyle = mg;
            ctx.fill();

            angle += 0.012;
            frameId = requestAnimationFrame(drawPlanet);
        };

        drawPlanet();
        return () => cancelAnimationFrame(frameId);
    }, []);

    return <canvas ref={canvasRef} className="w-64 h-64 md:w-72 md:h-72" />;
}

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    useInView(sectionRef as React.RefObject<Element>);

    return (
        <section id="about" ref={sectionRef} className="section-reveal relative py-28 px-6" style={{ zIndex: 10 }}>
            <div className="max-w-6xl mx-auto">
                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3 mb-16"
                >
                    <div className="w-8 h-px" style={{ background: '#22d3ee' }} />
                    <span className="font-mono text-xs tracking-widest uppercase" style={{ color: '#22d3ee' }}>
                        01 / About
                    </span>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Planet visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="flex justify-center"
                    >
                        <div className="relative">
                            <PlanetCanvas />

                            {/* Floating data capsules */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute -right-4 top-8 px-3 py-1.5 rounded-lg"
                                style={{
                                    background: 'rgba(2,6,23,0.9)',
                                    border: '1px solid rgba(34,211,238,0.25)',
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                <div className="text-xs font-mono" style={{ color: '#22d3ee' }}>CGPA</div>
                                <div className="text-sm font-bold text-white">3.98 / 4.0</div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                                className="absolute -left-6 bottom-12 px-3 py-1.5 rounded-lg"
                                style={{
                                    background: 'rgba(2,6,23,0.9)',
                                    border: '1px solid rgba(14,165,233,0.25)',
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                <div className="text-xs font-mono text-sky-400">Location</div>
                                <div className="text-sm font-bold text-white">Mumbai, IN</div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                        >
                            Who I Am
                        </motion.h2>

                        <motion.p variants={itemVariants} className="text-gray-400 leading-relaxed mb-5 text-base">
                            I'm a final-year Computer Science undergraduate at{' '}
                            <span className="text-white font-medium">MPSTME, NMIMS Deemed to be University</span>, graduating with a CGPA of{' '}
                            <span style={{ color: '#22d3ee' }} className="font-semibold">3.98/4</span>. My work lives at the intersection of quantitative finance, artificial intelligence, and innovative computing solutions.
                        </motion.p>

                        <motion.p variants={itemVariants} className="text-gray-400 leading-relaxed mb-8 text-base">
                            I bring a blend of analytical thinking, technical proficiency, and leadership — demonstrated through academic research, collaborative projects, and student-led initiatives. Eager to contribute to technology-driven environments while expanding knowledge across interdisciplinary domains.
                        </motion.p>

                        {/* Info grid */}
                        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mb-8">
                            {[
                                { label: 'University', value: 'MPSTME, NMIMS' },
                                { label: 'Focus', value: 'Quant Finance · AI · Dev' },
                                { label: 'Primary Lang', value: 'Java, Python, JS' },
                                { label: 'Available', value: 'Internship / FTE' },
                            ].map(({ label, value }) => (
                                <div
                                    key={label}
                                    className="p-3 rounded-lg"
                                    style={{
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid rgba(34,211,238,0.08)',
                                    }}
                                >
                                    <div className="text-xs font-mono text-gray-500 mb-0.5">{label}</div>
                                    <div className="text-sm font-medium text-white">{value}</div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Values */}
                        <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
                            {['Quant Finance', 'AI & ML', 'Systems Thinking', 'Research', 'Leadership'].map((v) => (
                                <span
                                    key={v}
                                    className="px-3 py-1 rounded-full text-xs font-medium font-mono"
                                    style={{
                                        background: 'rgba(34,211,238,0.08)',
                                        border: '1px solid rgba(34,211,238,0.15)',
                                        color: '#7dd3fc',
                                    }}
                                >
                                    {v}
                                </span>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Education timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-20"
                >
                    <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-3">
                        <span className="font-mono text-xs" style={{ color: '#22d3ee' }}>EDUCATION</span>
                        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(34,211,238,0.3), transparent)' }} />
                    </h3>

                    <div className="space-y-4">
                        {[
                            {
                                inst: 'MPSTME, NMIMS Deemed to be University',
                                degree: 'B.Tech Computer Science',
                                score: 'CGPA: 3.98/4',
                                period: '2023 – Present',
                                color: '#22d3ee',
                            },
                            {
                                inst: 'Christu Jyoti Convent Senior Secondary School',
                                degree: 'CBSE Class XII',
                                score: 'Percentage: 97.4',
                                period: '2021 – 2022',
                                color: '#38bdf8',
                            },
                            {
                                inst: 'Christu Jyoti Convent Senior Secondary School',
                                degree: 'CBSE Class X',
                                score: 'Percentage: 96',
                                period: '2019 – 2020',
                                color: '#0ea5e9',
                            },
                        ].map((edu, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group flex items-start gap-4 p-4 rounded-xl transition-all duration-300"
                                style={{
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(34,211,238,0.08)',
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(34,211,238,0.05)';
                                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.08)';
                                }}
                            >
                                <div
                                    className="w-1 h-14 rounded-full flex-shrink-0"
                                    style={{ background: `linear-gradient(180deg, ${edu.color}, transparent)` }}
                                />
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                        <h4 className="text-white font-semibold text-sm">{edu.inst}</h4>
                                        <span className="text-xs font-mono" style={{ color: edu.color }}>{edu.period}</span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3 mt-1">
                                        <span className="text-gray-400 text-sm">{edu.degree}</span>
                                        <span className="text-xs font-mono px-2 py-0.5 rounded-md" style={{ background: `${edu.color}10`, border: `1px solid ${edu.color}25`, color: edu.color }}>
                                            {edu.score}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
