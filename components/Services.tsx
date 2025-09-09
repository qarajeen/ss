
import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay = 0 }) => {
    const { ref, animationClasses } = useScrollAnimation<HTMLDivElement>();
    return (
        <div 
            ref={ref}
            className={`bg-[#150050]/30 p-10 rounded-2xl border border-[#610094]/20 transition-all duration-300 ease-out relative overflow-hidden group hover:-translate-y-2 hover:border-[#610094]/50 hover:shadow-2xl hover:shadow-[#610094]/20 transition-all duration-700 ${animationClasses}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-[#610094]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
                <div className="text-5xl mb-6 grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300">
                    {icon}
                </div>
                <h3 className="text-[clamp(1.3rem,2.5vw,1.8rem)] font-bold mb-4 text-[#bf88e0]">
                    {title}
                </h3>
                <p className="text-[clamp(0.9rem,1.5vw,1.1rem)] leading-relaxed opacity-90">
                    {description}
                </p>
            </div>
        </div>
    );
};

const SectionTitle: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
    const { ref, animationClasses } = useScrollAnimation<HTMLHeadingElement>();
    return (
        <h2 ref={ref} className={`text-[clamp(2.5rem,5vw,4rem)] font-black mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#8b34c2] to-white transition-all duration-700 ${animationClasses} ${className}`}>
            {children}
        </h2>
    );
};

const services = [
    { icon: '📸', title: 'Photography', description: 'Capturing moments with precision and artistry. From corporate headshots to creative portraits, we deliver stunning imagery that tells your story.' },
    { icon: '🎬', title: 'Video Production', description: 'Bringing your vision to life through dynamic storytelling. We create compelling videos from concept to completion, delivering cinematic quality.' },
    { icon: '🌐', title: '360 Tours', description: 'Immersive experiences that transport viewers into your space. Our cutting-edge 360° technology creates interactive virtual tours.' },
    { icon: '✨', title: 'Post Production', description: 'Polishing your content to perfection. Our expert editing, color grading, and visual effects transform raw footage into professional-grade content.' },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 px-8 bg-[#3f0071]/10">
      <div className="max-w-7xl mx-auto text-center">
        <SectionTitle>Our Services</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} delay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
