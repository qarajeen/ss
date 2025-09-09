
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Quote from './components/Quote';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-[#00001c] via-[#150050] to-[#3f0071] text-white overflow-x-hidden">
      <Header />
      <Hero />
      <main>
        <About />
        <Services />
        <Quote />
      </main>
      <Footer />
    </div>
  );
};

export default App;