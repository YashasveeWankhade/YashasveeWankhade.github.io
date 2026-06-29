import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaJava, FaPython, FaJs, FaReact, FaNodeJs, FaGithub, FaDocker, FaLinux, 
    FaDatabase, FaBrain, FaRobot, FaProjectDiagram, FaTerminal, FaServer, FaCode
} from 'react-icons/fa';
import { 
    SiCplusplus, SiR, SiAngular, SiGraphql, SiNeo4J, SiMongodb, SiFirebase, 
    SiPostman, SiOpenai, SiGoogle
} from 'react-icons/si';
import { BsStars } from 'react-icons/bs';

const SKILL_CATEGORIES = [
    {
        name: 'Languages',
        icon: '{ }',
        color: '#22d3ee',
        skills: [
            { name: 'Java', level: 92, icon: FaJava },
            { name: 'Python', level: 85, icon: FaPython },
            { name: 'C / C++', level: 75, icon: SiCplusplus },
            { name: 'JavaScript', level: 82, icon: FaJs },
            { name: 'PL/SQL', level: 80, icon: FaDatabase },
            { name: 'R', level: 72, icon: SiR },
            { name: 'MATLAB', level: 68, icon: FaTerminal },
        ],
    },
    {
        name: 'AI / LLM Tools',
        icon: '⬡',
        color: '#38bdf8',
        skills: [
            { name: 'GitHub Copilot', level: 88, icon: FaGithub },
            { name: 'Cursor', level: 85, icon: FaTerminal },
            { name: 'Anthropic API', level: 80, icon: FaBrain },
            { name: 'OpenAI API', level: 78, icon: SiOpenai },
            { name: 'Gemini API', level: 82, icon: SiGoogle },
            { name: 'Antigravity', level: 75, icon: BsStars },
        ],
    },
    {
        name: 'Web & DB',
        icon: '◱',
        color: '#0ea5e9',
        skills: [
            { name: 'React.js', level: 80, icon: FaReact },
            { name: 'Node.js', level: 78, icon: FaNodeJs },
            { name: 'AngularJS', level: 72, icon: SiAngular },
            { name: 'GraphQL', level: 70, icon: SiGraphql },
            { name: 'Neo4j', level: 75, icon: SiNeo4J },
            { name: 'MongoDB', level: 78, icon: SiMongodb },
            { name: 'Firebase', level: 85, icon: SiFirebase },
        ],
    },
    {
        name: 'Tools & DevOps',
        icon: '⚙',
        color: '#7dd3fc',
        skills: [
            { name: 'Git / GitHub', level: 90, icon: FaGithub },
            { name: 'Docker', level: 72, icon: FaDocker },
            { name: 'Postman', level: 85, icon: SiPostman },
            { name: 'Linux', level: 78, icon: FaLinux },
            { name: 'Oracle APEX', level: 70, icon: FaDatabase },
            { name: 'Visual Studio', level: 82, icon: FaCode },
        ],
    },
    {
        name: 'Concepts',
        icon: '◈',
        color: '#bae6fd',
        skills: [
            { name: 'Data Structures & Algorithms', level: 90, icon: FaProjectDiagram },
            { name: 'Object-Oriented Programming', level: 92, icon: FaDatabase },
            { name: 'Distributed Systems', level: 78, icon: FaServer },
            { name: 'Machine Learning', level: 82, icon: FaRobot },
        ],
    },
];

function ProficiencyRing({ level, color, icon: Icon, size = 76 }: { level: number; color: string; icon?: React.ElementType; size?: number }) {
    const stroke = 4;
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (level / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth={stroke}
                />
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset: offset }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    style={{ filter: `drop-shadow(0 0 4px ${color}66)` }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center -space-y-0.5">
                {Icon && <Icon className="w-6 h-6 mb-1" style={{ color }} />}
                <span className="text-[10px] font-bold" style={{ color }}>{level}%</span>
            </div>
        </div>
    );
}

export default function Skills() {
    const [activeCategory, setActiveCategory] = useState(0);
    const cat = SKILL_CATEGORIES[activeCategory];

    return (
        <section id="skills" className="relative py-28 px-6" style={{ zIndex: 10 }}>
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
                        02 / Skills
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-white mb-4"
                >
                    Technical Arsenal
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 mb-14 max-w-xl"
                >
                    My technical toolkit — tools and technologies I use to build reliable systems.
                </motion.p>

                {/* Category tabs */}
                <div className="flex flex-wrap gap-2 mb-10">
                    {SKILL_CATEGORIES.map((c, i) => (
                        <button
                            key={c.name}
                            onClick={() => setActiveCategory(i)}
                            className="px-4 py-2 rounded-xl text-sm font-mono font-medium transition-all duration-300"
                            style={{
                                background: activeCategory === i ? `${c.color}15` : 'rgba(255,255,255,0.02)',
                                border: `1px solid ${activeCategory === i ? c.color + '40' : 'rgba(255,255,255,0.06)'}`,
                                color: activeCategory === i ? c.color : '#6b7280',
                            }}
                        >
                            <span className="mr-1.5">{c.icon}</span>{c.name}
                        </button>
                    ))}
                </div>

                {/* Skill grid with proficiency rings */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35 }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    >
                        {cat.skills.map((skill, i) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.06, duration: 0.4 }}
                                className="group relative rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1"
                                style={{
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = `${cat.color}30`;
                                    (e.currentTarget as HTMLElement).style.boxShadow = `0 15px 40px -15px ${cat.color}30`;
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                                }}
                            >
                                <ProficiencyRing level={skill.level} color={cat.color} icon={skill.icon} />
                                <p className="text-sm text-gray-200 font-medium mt-3 group-hover:text-white transition-colors">
                                    {skill.name}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Full stack tags */}
                <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(34,211,238,0.08)' }}>
                    <p className="text-xs font-mono text-gray-500 mb-3 tracking-wider">FULL STACK</p>
                    <div className="flex flex-wrap gap-2">
                        {['Java', 'Python', 'C++', 'JavaScript', 'SQL', 'Node.js', 'Angular', 'Firebase', 'Git', 'MySQL', 'Swing', 'REST API'].map((tech) => (
                            <span
                                key={tech}
                                className="px-2.5 py-1 rounded-md text-xs font-mono"
                                style={{
                                    background: 'rgba(34,211,238,0.05)',
                                    border: '1px solid rgba(34,211,238,0.1)',
                                    color: '#94a3b8',
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
