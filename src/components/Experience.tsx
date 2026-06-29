import { motion } from 'framer-motion';

const EXPERIENCE = [
    {
        role: 'Junior Summer Research Intern',
        org: 'Wharton School, University of Pennsylvania',
        period: 'May 2026 – Present',
        color: '#22d3ee',
        bullets: [
            'Contributed to AI-driven research documentation across 15+ distinct industry sectors to support strategic analysis.',
            'Prepared weekly research review reports analyzing 500+ financial data points and various academic research papers.',
            'Supported faculty-led machine learning inquiry by evaluating more than 30 predictive algorithms for corporate adoption.',
        ],
    },
];

const PUBLICATIONS = [
    {
        title:
            'Efficient Personalized Recommendation Systems Using Graph Databases: Techniques and Sustainable Practices',
        venue: 'IEEE ReACS 2025 — International Conference on Recent Advances in Computing and Systems',
        doi: '10.1109/REACS67479.2025.11413463',
        type: 'International Research Presentation & Publication',
        color: '#38bdf8',
    },
];

const CERTIFICATIONS = [
    {
        name: 'Business Analyst Certification',
        issuer: 'Finlatics',
        credentialId: 'BA-10891517f6a93ed1',
        verifyUrl: 'https://finlatics.com/credentialscheck',
        date: '2025',
        color: '#22d3ee',
    },
    {
        name: 'Claude Course, AI Fluency: Framework & Foundations',
        issuer: 'Anthropic Education',
        credentialId: '',
        verifyUrl: '',
        date: 'Completed: May 27, 2026',
        color: '#38bdf8',
    },
];

export default function Experience() {
    return (
        <section id="experience" className="relative py-28 px-6" style={{ zIndex: 10 }}>
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3 mb-16"
                >
                    <div className="w-8 h-px" style={{ background: '#22d3ee' }} />
                    <span className="font-mono text-xs tracking-widest uppercase" style={{ color: '#22d3ee' }}>
                        04 / Experience
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-white mb-12"
                >
                    Research & Experience
                </motion.h2>

                {/* Experience timeline */}
                <div className="space-y-6 mb-20">
                    {EXPERIENCE.map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="group relative p-6 rounded-2xl transition-all duration-500"
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(34,211,238,0.1)',
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = 'rgba(34,211,238,0.05)';
                                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.25)';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.1)';
                            }}
                        >
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                                    <p className="text-sm font-mono mt-1" style={{ color: exp.color }}>
                                        {exp.org}
                                    </p>
                                </div>
                                <span
                                    className="text-xs font-mono px-3 py-1 rounded-full self-start"
                                    style={{ background: `${exp.color}10`, border: `1px solid ${exp.color}25`, color: exp.color }}
                                >
                                    {exp.period}
                                </span>
                            </div>
                            <ul className="space-y-2.5">
                                {exp.bullets.map((b, j) => (
                                    <li key={j} className="flex items-start gap-3 text-sm text-gray-400 leading-relaxed">
                                        <span className="font-mono mt-0.5" style={{ color: exp.color }}>▸</span>
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Publications */}
                <div className="mb-20">
                    <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-3">
                        <span className="font-mono text-xs" style={{ color: '#22d3ee' }}>PUBLICATIONS</span>
                        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(34,211,238,0.3), transparent)' }} />
                    </h3>
                    {PUBLICATIONS.map((pub, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-6 rounded-2xl transition-all duration-300"
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(34,211,238,0.1)',
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = 'rgba(34,211,238,0.05)';
                                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.25)';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.1)';
                            }}
                        >
                            <div className="flex items-start gap-3 mb-3">
                                <span className="font-mono text-xs px-2 py-1 rounded-md" style={{ background: `${pub.color}15`, border: `1px solid ${pub.color}30`, color: pub.color }}>
                                    IEEE
                                </span>
                                <span className="text-xs font-mono text-gray-500 mt-1">{pub.type}</span>
                            </div>
                            <h4 className="text-white font-semibold text-base leading-snug mb-2">{pub.title}</h4>
                            <p className="text-sm text-gray-400 mb-3">{pub.venue}</p>
                            <a
                                href={`https://doi.org/${pub.doi}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs font-mono transition-colors"
                                style={{ color: pub.color }}
                            >
                                <span>DOI: {pub.doi}</span>
                                <span className="opacity-60 group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* Certifications */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-3">
                        <span className="font-mono text-xs" style={{ color: '#22d3ee' }}>CERTIFICATIONS</span>
                        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(34,211,238,0.3), transparent)' }} />
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {CERTIFICATIONS.map((cert, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-5 rounded-2xl transition-all duration-300"
                                style={{
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(34,211,238,0.1)',
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(34,211,238,0.05)';
                                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.25)';
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.1)';
                                }}
                            >
                                <div className="flex items-start justify-between gap-3 mb-2">
                                    <h4 className="text-white font-semibold text-sm leading-snug">{cert.name}</h4>
                                    <span
                                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-mono text-xs"
                                        style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30`, color: cert.color }}
                                    >
                                        ✓
                                    </span>
                                </div>
                                <p className="text-sm font-mono mb-1" style={{ color: cert.color }}>{cert.issuer}</p>
                                <p className="text-xs text-gray-500 mb-3">{cert.date}</p>
                                {cert.credentialId && (
                                    <p className="text-xs font-mono text-gray-500 mb-1">ID: {cert.credentialId}</p>
                                )}
                                {cert.verifyUrl && (
                                    <a
                                        href={cert.verifyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-xs font-mono transition-colors"
                                        style={{ color: cert.color }}
                                    >
                                        Verify Credential
                                        <span className="opacity-60 group-hover:translate-x-1 transition-transform">→</span>
                                    </a>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
