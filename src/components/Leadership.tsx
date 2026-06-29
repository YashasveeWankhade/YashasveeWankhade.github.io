import { motion } from 'framer-motion';

const LEADERSHIP_ITEMS = [
    {
        title: 'Lead – Google Developer Group on Campus',
        org: 'MPSTME, NMIMS Shirpur',
        duration: '2024 – Present',
        description: 'Directed a team of 50+ organizing committee members across technical and operations domains. Mentored 105+ students in Google Cloud programs, fostering technical growth and community engagement.',
        achievements: ['50+ member team', '105+ students mentored', 'Google Cloud programs'],
        color: '#22d3ee',
    },
    {
        title: 'Co-Lead – Coding Club',
        org: 'NMIMS',
        duration: '2024 – Present',
        description: 'Increased student participation by 30% through strategic collaborations and technical initiatives. Fostered a peer-driven learning culture across the campus developer community.',
        achievements: ['30% participation increase', 'Technical collaborations', 'Peer-driven learning'],
        color: '#38bdf8',
    },
    {
        title: 'Academic Excellence',
        org: "SVKM's NMIMS Deemed to be University",
        duration: '2023 – Present',
        description: 'Ranked among the top 1% of B.Tech. students at SVKM\'s NMIMS Deemed to be University, maintaining a CGPA of 3.98/4 throughout the program.',
        achievements: ['Top 1% of B.Tech. students', 'CGPA 3.98/4', 'Consistent academic record'],
        color: '#0ea5e9',
    },
];

export default function Leadership() {
    return (
        <section id="leadership" className="relative py-28 px-6" style={{ zIndex: 10 }}>
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3 mb-16"
                >
                    <div className="w-8 h-px" style={{ background: '#22d3ee' }} />
                    <span className="font-mono text-xs tracking-widest uppercase" style={{ color: '#22d3ee' }}>
                        05 / Leadership
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-white mb-4"
                >
                    Space Stations
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 mb-12 max-w-xl"
                >
                    Leading teams and building communities through technical excellence.
                </motion.p>

                <div className="space-y-6">
                    {LEADERSHIP_ITEMS.map((item, idx) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 }}
                            className="group relative p-6 rounded-2xl transition-all duration-300"
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: `1px solid ${item.color}20`,
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = `${item.color}08`;
                                (e.currentTarget as HTMLElement).style.borderColor = `${item.color}40`;
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                                (e.currentTarget as HTMLElement).style.borderColor = `${item.color}20`;
                            }}
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className="w-1 h-12 rounded-full flex-shrink-0 mt-1"
                                    style={{ background: `linear-gradient(180deg, ${item.color}, transparent)` }}
                                />
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                        <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                                        <span className="text-xs font-mono mt-1 sm:mt-0" style={{ color: item.color }}>
                                            {item.duration}
                                        </span>
                                    </div>
                                    <p className="text-sm" style={{ color: item.color }}>
                                        {item.org}
                                    </p>
                                    <p className="text-gray-400 text-sm leading-relaxed mt-2 mb-3">{item.description}</p>

                                    <div className="flex flex-wrap gap-2">
                                        {item.achievements.map((ach) => (
                                            <span
                                                key={ach}
                                                className="px-2.5 py-1 rounded-md text-xs font-mono"
                                                style={{
                                                    background: `${item.color}08`,
                                                    border: `1px solid ${item.color}20`,
                                                    color: '#cbd5e1',
                                                }}
                                            >
                                                {ach}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
