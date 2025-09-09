
import React from 'react';

const ContactItem: React.FC<{ icon: string; text: string; href: string; }> = ({ icon, text, href }) => (
    <a href={href} className="flex items-center gap-4 p-4 bg-[#150050]/30 border border-[#610094]/30 rounded-2xl transition-all duration-300 ease-out hover:bg-[#610094]/20 hover:border-[#610094]/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#610094]/20 group">
        <span className="text-2xl grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300">{icon}</span>
        <span className="text-white text-lg font-semibold group-hover:text-[#bf88e0] transition-colors duration-300">{text}</span>
    </a>
);


const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-[#00001c] via-[#150050] to-[#3f0071] py-16 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-[rgba(97,0,148,0.2)] to-transparent opacity-50 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 items-center">
                <div className="text-center md:text-left">
                    <div className="inline-block">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                            <img src="assets/wrhlogo.png" alt="White Rabbit Hole Logo" className="h-12" />
                            <span className="text-[clamp(1.8rem,3vw,2.5rem)] font-black bg-clip-text text-transparent bg-gradient-to-r from-[#8b34c2] to-white">
                                WHITE RABBIT HOLE
                            </span>
                        </div>
                        <p className="text-xl text-white/80 font-semibold text-right">Powered by ADHD</p>
                    </div>
                </div>
                <div className="flex flex-col gap-6 max-w-md mx-auto md:mx-0">
                    <ContactItem icon="📧" text="hi@wrh.ae" href="mailto:hi@wrh.ae" />
                    <ContactItem icon="📱" text="+971 58 658 3939" href="tel:+971586583939" />
                </div>
            </div>
            <div className="text-center pt-8 border-t border-[#610094]/30">
                 <p className="text-lg font-semibold text-white mb-2">Made with ❤️ in Dubai</p>
                <p className="text-sm text-white/70">&copy; {new Date().getFullYear() + 1} White Rabbit Hole. All rights reserved.</p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;