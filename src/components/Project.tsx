import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ArrowUpRight, X, Cpu, Database, Shield } from 'lucide-react';

const PROJECTS = [
    {
        id: 'keymanager',
        name: 'Key Manager',
        subtitle: 'NMIMS Key Management System',
        category: 'Desktop Application',
        icon: Database,
        description:
            'A desktop-based key tracking application built with Java Swing and MySQL. Reduced manual errors by 70% through role-based access controls and live database connectivity for secure login and daily query handling.',
        tags: ['Java', 'JDBC', 'MySQL', 'Java Swing'],
        github: 'https://github.com/YashasveeWankhade',
        metrics: [
            { label: 'Error Reduction', value: '70%' },
            { label: 'Access Levels', value: '3' },
            { label: 'Security Gain', value: '60%' },
        ],
        details: [
            'Reduced manual errors by 70%',
            'Role-based access across 3 user levels',
            'Improved key tracking security by 60%',
            'Java Swing interface with live MySQL access',
        ],
        accent: '#22d3ee',
    },
    {
        id: 'campusfix',
        name: 'CampusFix',
        subtitle: 'Complaint Management Platform',
        category: 'Web Platform',
        icon: Cpu,
        description:
            'A scalable web platform supporting 500+ users, integrating Google Gemini AI for automatic complaint classification with 85% accuracy. Built a priority-based sorting algorithm across 10,000+ ticket records, reducing resolution time by 30%.',
        tags: ['JavaScript', 'Firebase', 'Gemini AI', 'Vercel'],
        github: 'https://github.com/YashasveeWankhade',
        metrics: [
            { label: 'Active Users', value: '500+' },
            { label: 'AI Accuracy', value: '85%' },
            { label: 'Faster Resolution', value: '30%' },
        ],
        details: [
            'Gemini AI classification with 85% accuracy',
            'Priority sorting across 10,000+ tickets',
            'Reduced resolution time by 30%',
            'Firebase Auth + Vercel, 500+ users',
        ],
        accent: '#38bdf8',
    },
    {
        id: 'phishing',
        name: 'Phishing Detector',
        subtitle: 'AI-Based E-Commerce URL Detection',
        category: 'Machine Learning',
        icon: Shield,
        description:
            'An ML-based phishing URL detection system using 200 decision trees, achieving 98% detection accuracy. Engineered features like URL entropy, domain analysis, and keyword extraction, reducing false positives by 15% and boosting F1 score to 0.95.',
        tags: ['Python', 'Flask', 'Scikit-learn', 'Pandas'],
        github: 'https://github.com/YashasveeWankhade',
        metrics: [
            { label: 'Detection Accuracy', value: '98%' },
            { label: 'F1 Score', value: '0.95' },
            { label: 'False Positives', value: '-15%' },
        ],
        details: [
            '200 decision trees, 98% detection accuracy',
            'URL entropy & domain analysis features',
            'Reduced false positives by 15%',
            'F1 score improved to 0.95',
        ],
        accent: '#0ea5e9',
    },
];

function ProjectModal({ project, onClose }: { project: typeof PROJECTS[0]; onClose: () => void }) {
    const Icon = project.icon;
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-6"
                style={{ background: 'rgba(0,1,10,0.85)', backdropFilter: 'blur(8px)' }}
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: 'spring', bounce: 0.25 }}
                    className="w-full max-w-lg rounded-2xl overflow-hidden"
                    style={{
                        background: 'rgba(2,6,23,0.96)',
                        border: `1px solid ${project.accent}30`,
                        boxShadow: `0 0 60px ${project.accent}15, 0 40px 80px rgba(0,0,0,0.6)`,
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div
                        className="relative p-6 pb-5"
                        style={{
                            background: `linear-gradient(135deg, ${project.accent}12, transparent)`,
                            borderBottom: `1px solid ${project.accent}15`,
                        }}
                    >
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2.5">
                                <div
                                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                                    style={{ background: `${project.accent}15`, border: `1px solid ${project.accent}30` }}
                                >
                                    <Icon className="w-4 h-4" style={{ color: project.accent }} />
                                </div>
                                <span className="font-mono text-xs tracking-wider text-gray-500">{project.category}</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white transition-colors"
                                style={{ background: 'rgba(255,255,255,0.05)' }}
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-1">{project.name}</h3>
                        <p style={{ color: project.accent }} className="text-sm font-medium">{project.subtitle}</p>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">{project.description}</p>

                        {/* Metrics */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            {project.metrics.map((m) => (
                                <div
                                    key={m.label}
                                    className="rounded-xl p-3 text-center"
                                    style={{ background: `${project.accent}08`, border: `1px solid ${project.accent}15` }}
                                >
                                    <div className="text-lg font-bold" style={{ color: project.accent }}>{m.value}</div>
                                    <div className="text-[10px] font-mono text-gray-500 mt-0.5 uppercase tracking-wider">{m.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Key features */}
                        <div className="mb-6">
                            <p className="text-xs font-mono text-gray-500 mb-3 tracking-wider">KEY HIGHLIGHTS</p>
                            <div className="space-y-2">
                                {project.details.map((d, i) => (
                                    <motion.div
                                        key={d}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.07 }}
                                        className="flex items-start gap-2.5 text-sm text-gray-300"
                                    >
                                        <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.accent }} />
                                        {d}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2.5 py-1 rounded-md text-xs font-mono"
                                    style={{
                                        background: `${project.accent}10`,
                                        border: `1px solid ${project.accent}25`,
                                        color: project.accent,
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Action */}
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                            style={{
                                background: `${project.accent}15`,
                                border: `1px solid ${project.accent}30`,
                                color: project.accent,
                            }}
                        >
                            <Github className="w-4 h-4" />
                            View on GitHub
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

    return (
        <section id="projects" className="relative py-28 px-6" style={{ zIndex: 10 }}>
            <div className="max-w-6xl mx-auto">
                {/* Label */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3 mb-16"
                >
                    <div className="w-8 h-px" style={{ background: '#22d3ee' }} />
                    <span className="font-mono text-xs tracking-widest uppercase" style={{ color: '#22d3ee' }}>
                        03 / Projects
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-white mb-4"
                >
                    Featured Work
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 mb-14 max-w-xl"
                >
                    A selection of systems I've designed and shipped — click any card to dive into the details.
                </motion.p>

                {/* Project cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PROJECTS.map((proj, i) => {
                        const Icon = proj.icon;
                        return (
                            <motion.div
                                key={proj.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12 }}
                                className="group relative rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1"
                                style={{
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                }}
                                onClick={() => setSelectedProject(proj)}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = `${proj.accent}30`;
                                    (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px -20px ${proj.accent}30`;
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                                }}
                            >
                                {/* Accent line */}
                                <div
                                    className="absolute top-0 left-6 right-6 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                                    style={{ background: proj.accent }}
                                />

                                {/* Icon + category */}
                                <div className="flex items-center justify-between mb-5">
                                    <div
                                        className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                        style={{ background: `${proj.accent}12`, border: `1px solid ${proj.accent}25` }}
                                    >
                                        <Icon className="w-5 h-5" style={{ color: proj.accent }} />
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                                </div>

                                {/* Title */}
                                <h3 className="text-white font-semibold text-lg mb-1">{proj.name}</h3>
                                <p className="text-xs font-mono mb-4" style={{ color: proj.accent }}>{proj.subtitle}</p>

                                {/* Description */}
                                <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">{proj.description}</p>

                                {/* Mini metrics */}
                                <div className="flex gap-4 mb-5">
                                    {proj.metrics.map((m) => (
                                        <div key={m.label}>
                                            <div className="text-sm font-bold" style={{ color: proj.accent }}>{m.value}</div>
                                            <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider">{m.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1.5">
                                    {proj.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-0.5 rounded-md text-xs font-mono"
                                            style={{
                                                background: `${proj.accent}08`,
                                                border: `1px solid ${proj.accent}15`,
                                                color: '#94a3b8',
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Modal */}
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </section>
    );
}
