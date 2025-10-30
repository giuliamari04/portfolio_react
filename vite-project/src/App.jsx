import { useEffect, useState } from 'react';
import  Navigation  from './components/Navigation';
import  Hero  from './components/Hero';
import  About  from './components/About';
import  Projects  from './components/Projects';
import  Skills  from './components/Skills';
import  Contacts  from './components/Contacts';

export default function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation scrollY={scrollY} />
      <Hero scrollY={scrollY} />
      <About scrollY={scrollY} />
      <Projects scrollY={scrollY} />
      <Skills scrollY={scrollY} />
      <Contacts scrollY={scrollY} />
    </div>
  );
}
