import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setFormData({ name: '', email: '', message: '' });
            setSubmitted(false);
        }, 3000);
    };

    return (
        <section id="contact" className="relative py-28 px-6 min-h-screen flex items-center" style={{ zIndex: 10 }}>
            <div className="max-w-3xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3 mb-16"
                >
                    <div className="w-8 h-px" style={{ background: '#22d3ee' }} />
                    <span className="font-mono text-xs tracking-widest uppercase" style={{ color: '#22d3ee' }}>
                        06 / Contact
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-white mb-6"
                >
                    Communication Hub
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 mb-12 max-w-xl"
                >
                    Ready for opportunities? Get in touch through any channel below.
                </motion.p>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact methods */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="text-white font-semibold text-lg mb-6">Reach Out</h3>
                        <div className="space-y-4">
                            {[
                                {
                                    label: 'Email',
                                    value: 'yashasviwankhade2004@gmail.com',
                                    href: 'mailto:yashasviwankhade2004@gmail.com',
                                    icon: '✉',
                                },
                                {
                                    label: 'GitHub',
                                    value: 'YashasveeWankhade',
                                    href: 'https://github.com/YashasveeWankhade',
                                    icon: '◈',
                                },
                                {
                                    label: 'LinkedIn',
                                    value: 'yashasvee',
                                    href: 'https://linkedin.com/in/yashasvee',
                                    icon: '◉',
                                },
                            ].map((contact) => (
                                <a
                                    key={contact.label}
                                    href={contact.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-start gap-4 p-4 rounded-xl transition-all duration-300"
                                    style={{
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid rgba(34,211,238,0.1)',
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(34,211,238,0.08)';
                                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.1)';
                                    }}
                                >
                                    <span className="text-xl mt-0.5" style={{ color: '#22d3ee' }}>{contact.icon}</span>
                                    <div>
                                        <div className="text-xs font-mono text-gray-500 mb-1">{contact.label}</div>
                                        <div className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                                            {contact.value}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl text-white font-mono text-sm transition-all duration-300"
                                    style={{
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(34,211,238,0.15)',
                                    }}
                                    onFocus={(e) => {
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(34,211,238,0.05)';
                                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.4)';
                                    }}
                                    onBlur={(e) => {
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.15)';
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl text-white font-mono text-sm transition-all duration-300"
                                    style={{
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(34,211,238,0.15)',
                                    }}
                                    onFocus={(e) => {
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(34,211,238,0.05)';
                                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.4)';
                                    }}
                                    onBlur={(e) => {
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.15)';
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2.5 rounded-xl text-white font-mono text-sm transition-all duration-300 resize-none"
                                    style={{
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(34,211,238,0.15)',
                                    }}
                                    onFocus={(e) => {
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(34,211,238,0.05)';
                                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.4)';
                                    }}
                                    onBlur={(e) => {
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.15)';
                                    }}
                                />
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-2.5 rounded-xl font-semibold font-mono text-sm transition-all duration-300"
                                style={{
                                    background: submitted ? 'rgba(34,211,238,0.2)' : 'rgba(34,211,238,0.1)',
                                    border: '1px solid rgba(34,211,238,0.3)',
                                    color: '#22d3ee',
                                }}
                            >
                                {submitted ? '✓ Message Sent' : 'Send Message'}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-20 pt-10"
                    style={{ borderTop: '1px solid rgba(34,211,238,0.08)' }}
                >
                    <p className="text-gray-500 text-sm mb-2">Crafted with precision and shipped with pride</p>
                    <p className="text-gray-600 text-xs">© 2026 Yashasvee Wankhade · Built with React, Vite & Tailwind</p>
                </motion.div>
            </div>
        </section>
    );
}
