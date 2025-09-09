
import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const SectionTitle: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
    const { ref, animationClasses } = useScrollAnimation<HTMLHeadingElement>();
    return (
        <h2 ref={ref} className={`text-[clamp(2.5rem,5vw,4rem)] font-black mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#8b34c2] to-white transition-all duration-700 ${animationClasses} ${className}`}>
            {children}
        </h2>
    );
};

const About: React.FC = () => {
    const { ref, animationClasses } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="about" className="py-32 px-8 bg-black/20">
      <div className="max-w-4xl mx-auto text-center">
        <SectionTitle>About Us</SectionTitle>
        <div ref={ref} className={`text-[clamp(1.1rem,2vw,1.3rem)] leading-loose opacity-90 max-w-3xl mx-auto transition-all duration-700 ${animationClasses}`}>
          <p>We are passionate visual creators who see the world differently. Our team harnesses ADHD as a creative superpower, allowing us to hyper-focus on projects and generate a torrent of innovative ideas.</p>
          <br />
          <p>This unique way of working makes us incredibly efficient, enabling us to produce stunning, high-quality visuals faster. We pass this advantage on to you, offering exceptional creative work at a more accessible price. Let our focused energy bring your vision to life.</p>
        </div>
      </div>
    </section>
  );
};

export default About;
