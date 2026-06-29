import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
    { id: 'home', label: 'Home', icon: '◈' },
    { id: 'about', label: 'About', icon: '◉' },
    { id: 'skills', label: 'Skills', icon: '◎' },
    { id: 'projects', label: 'Projects', icon: '◆' },
    { id: 'experience', label: 'Experience', icon: '⬡' },
    { id: 'leadership', label: 'Leadership', icon: '◇' },
    { id: 'contact', label: 'Contact', icon: '◌' },
];

export default function Navigation() {
    const [active, setActive] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 60);

            const sections = NAV_ITEMS.map((item) => {
                const el = document.getElementById(item.id);
                if (!el) return { id: item.id, top: Infinity };
                return { id: item.id, top: Math.abs(el.getBoundingClientRect().top) };
            });
            const closest = sections.reduce((a, b) => (a.top < b.top ? a : b));
            setActive(closest.id);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navigate = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    return (
        <>
            {/* Desktop nav */}
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-6"
            >
                <div
                    className="hidden md:flex items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-500"
                    style={{
                        background: scrolled ? 'rgba(2,6,23,0.9)' : 'rgba(2,6,23,0.4)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(34,211,238,0.12)',
                        boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,211,238,0.08)' : 'none',
                    }}
                >
                    {/* Logo */}
                    <div className="flex items-center gap-2 px-3 py-1.5 mr-2">
                        <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono"
                            style={{
                                background: 'rgba(34,211,238,0.15)',
                                border: '1px solid rgba(34,211,238,0.4)',
                                color: '#22d3ee',
                            }}
                        >
                            Y
                        </div>
                        <span className="font-mono text-xs text-gray-400 tracking-wider">YW</span>
                    </div>

                    <div
                        className="w-px h-5 mx-1"
                        style={{ background: 'rgba(34,211,238,0.15)' }}
                    />

                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => navigate(item.id)}
                            className="relative px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-1.5 group"
                            style={{
                                color: active === item.id ? '#22d3ee' : '#9ca3af',
                            }}
                        >
                            {active === item.id && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 rounded-xl"
                                    style={{
                                        background: 'rgba(34,211,238,0.1)',
                                        border: '1px solid rgba(34,211,238,0.2)',
                                    }}
                                    transition={{ type: 'spring', bounce: 0.15, duration: 0.6 }}
                                />
                            )}
                            <span
                                className="relative font-mono text-xs opacity-50 group-hover:opacity-100 transition-opacity"
                                style={{ color: '#22d3ee' }}
                            >
                                {item.icon}
                            </span>
                            <span className="relative">{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* Mobile hamburger */}
                <div className="md:hidden flex items-center justify-between w-full max-w-sm mx-auto">
                    <span
                        className="font-mono text-sm font-bold"
                        style={{ color: '#22d3ee' }}
                    >
                        YW.dev
                    </span>
                    <button
                        onClick={() => setMenuOpen((o) => !o)}
                        className="p-2 rounded-lg"
                        style={{
                            background: 'rgba(34,211,238,0.08)',
                            border: '1px solid rgba(34,211,238,0.2)',
                        }}
                    >
                        <div className="flex flex-col gap-1.5 w-5">
                            <motion.div
                                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                                className="h-px bg-cyan-400 w-full"
                            />
                            <motion.div
                                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="h-px bg-cyan-400 w-3/4"
                            />
                            <motion.div
                                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                                className="h-px bg-cyan-400 w-full"
                            />
                        </div>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-16 left-4 right-4 z-50 rounded-2xl overflow-hidden md:hidden"
                        style={{
                            background: 'rgba(2,6,23,0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(34,211,238,0.15)',
                        }}
                    >
                        {NAV_ITEMS.map((item, i) => (
                            <motion.button
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => navigate(item.id)}
                                className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-left transition-colors duration-200"
                                style={{
                                    color: active === item.id ? '#22d3ee' : '#9ca3af',
                                    background: active === item.id ? 'rgba(34,211,238,0.05)' : 'transparent',
                                    borderBottom: i < NAV_ITEMS.length - 1 ? '1px solid rgba(34,211,238,0.05)' : 'none',
                                }}
                            >
                                <span className="font-mono" style={{ color: '#22d3ee' }}>{item.icon}</span>
                                {item.label}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
