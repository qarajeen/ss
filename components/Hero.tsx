import React, { useState, useEffect, useRef } from 'react';

const TITLE_TEXT = 'WHITE RABBIT HOLE';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  originalX: number;
  originalY: number;
  animationDuration: number;
  animationDelay: number;
}

const createParticle = (id: number): Particle => {
    const size = Math.random() * 4 + 2;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    return {
        id,
        x,
        y,
        size,
        originalX: x,
        originalY: y,
        animationDuration: Math.random() * 4 + 4,
        animationDelay: Math.random() * 2,
    };
};

const Hero: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const numParticles = Math.floor((window.innerWidth * window.innerHeight) / 50000);
    setParticles(Array.from({ length: numParticles }, (_, i) => createParticle(i)));

    const handleMouseMove = (e: MouseEvent) => {
        if (heroRef.current) {
            heroRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
            heroRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
            const intensity = Math.min(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
            heroRef.current.style.setProperty('--grid-opacity', `${0.1 + intensity * 0.2}`);
            heroRef.current.style.setProperty('--grid-size', `${50 - intensity * 20}px`);
        }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleScrollToQuote = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
        id="hero" 
        ref={heroRef}
        className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden"
    >
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-[var(--grid-opacity,0.1)] transition-all duration-300 ease-out"
        style={{
            backgroundImage: `
                linear-gradient(rgba(97, 0, 148, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(97, 0, 148, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: `var(--grid-size, 50px) var(--grid-size, 50px)`,
        }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient from-[rgba(97,0,148,0.3)] to-transparent animate-pulse [animation-duration:4s] [animation-iteration-count:infinite]" />

      <div className="absolute w-[200px] h-[200px] rounded-full bg-radial-gradient from-[rgba(97,0,148,0.2)] to-transparent pointer-events-none z-10 
        transform -translate-x-1/2 -translate-y-1/2 left-[var(--mouse-x,50%)] top-[var(--mouse-y,50%)] transition-all duration-100 ease-out"
      />

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {particles.map(p => (
          <div
            key={p.id}
            className="particle absolute rounded-full bg-[rgba(97,0,148,0.6)] animate-bounce"
            style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: `${p.x}px`,
                top: `${p.y}px`,
                animationDuration: `${p.animationDuration}s`,
                animationDelay: `${p.animationDelay}s`,
            }}
          />
        ))}
      </div>
      
      <div className="z-10 max-w-4xl px-8 animate-fade-in-up">
        <h1 className="text-[clamp(3rem,8vw,6rem)] font-black mb-4">
            {TITLE_TEXT.split('').map((letter, index) => (
                <span
                    key={index}
                    className="inline-block animate-fade-in-down"
                    style={{ animationDelay: `${index * 0.1}s`}}
                >
                    {letter === ' ' ? '\u00A0' : letter}
                </span>
            ))}
        </h1>
        <p className="text-[clamp(1.2rem,3vw,2rem)] text-[#bf88e0] mb-8 [animation-delay:1s] animate-fade-in-up">
            Powered by ADHD
        </p>
        <a 
            href="#quote" 
            onClick={handleScrollToQuote}
            className="inline-block py-4 px-8 bg-gradient-to-r from-[#3f0071] to-[#610094] text-white no-underline rounded-full font-bold transition-all duration-300 ease-out 
                       hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#610094]/50 relative overflow-hidden [animation-delay:1.5s] animate-fade-in-up group"
        >
            Generate your Quote
            <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500 ease-out group-hover:left-full" />
        </a>
      </div>
    </section>
  );
};

export default Hero;