import { useState, useEffect } from 'react';
import StarField from './components/StarField';
import NebulaBackground from './components/NebulaBackground';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Project';
import Experience from './components/Experience';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import SplashCursor from './components/SplashCursor';

export default function App() {
    const [loaded, setLoaded] = useState(false);
    void loaded;

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <div className="relative w-full min-h-screen bg-black overflow-x-hidden">
            <SplashCursor COLOR="#22d3ee" RAINBOW_MODE={false} />
            {/* Background layers */}
            <StarField count={1000} speed={0.4} />
            <NebulaBackground />

            {/* Main content */}
            <div className="relative" style={{ zIndex: 5 }}>
                <Navigation />
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Leadership />
                <Contact />
            </div>

            {/* Ambient glow effects */}
            <div
                className="fixed top-0 left-1/4 w-96 h-96 rounded-full mix-blend-screen pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    zIndex: 2,
                }}
            />
            <div
                className="fixed bottom-0 right-1/4 w-96 h-96 rounded-full mix-blend-screen pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(14,165,233,0.04) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    zIndex: 2,
                }}
            />

            {/* Noise overlay */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    background:
                        'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
                    zIndex: 9999,
                    opacity: 0.025,
                }}
            />
        </div>
    );
}
