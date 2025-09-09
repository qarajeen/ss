
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out animate-fade-in-down ${scrolled ? 'bg-[#00001c]/80 backdrop-blur-sm' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
                <a href="#hero" onClick={(e) => handleLinkClick(e, 'hero')} className="flex items-center gap-3 group">
                    <img src="assets/wrhlogo.png" alt="White Rabbit Hole Logo" className="h-10 transition-transform duration-300 group-hover:scale-110" />
                    <span className="font-bold text-lg hidden sm:block text-white transition-colors duration-300 group-hover:text-[#bf88e0]">WHITE RABBIT HOLE</span>
                </a>
                <nav className="hidden md:flex items-center gap-6">
                    <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="font-semibold text-white/80 hover:text-white transition-colors duration-300">About</a>
                    <a href="#services" onClick={(e) => handleLinkClick(e, 'services')} className="font-semibold text-white/80 hover:text-white transition-colors duration-300">Services</a>
                    <a href="#quote" onClick={(e) => handleLinkClick(e, 'quote')} className="font-semibold bg-gradient-to-r from-[#3f0071] to-[#610094] text-white py-2 px-5 rounded-full transition-all duration-300 ease-out hover:shadow-lg hover:shadow-[#610094]/30 hover:-translate-y-px">Get a Quote</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
