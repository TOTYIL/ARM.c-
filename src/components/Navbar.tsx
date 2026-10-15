import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openAuth, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#030303]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <span className="font-display font-bold text-2xl tracking-tighter text-white">ARM.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          <a href="#projects" className="hover:text-white transition-colors">Systems</a>
          <a href="#events" className="hover:text-white transition-colors">Operations</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <button 
            onClick={user ? logout : openAuth}
            className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white transition-colors text-sm font-mono tracking-wide"
          >
            {user ? `[ ${user.username} ] Logout` : 'Portal Login'}
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white/60 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#030303] border-b border-white/10 py-6 px-6 flex flex-col gap-6">
          <a href="#projects" className="text-white/80 hover:text-white font-medium" onClick={() => setMobileMenuOpen(false)}>Systems</a>
          <a href="#events" className="text-white/80 hover:text-white font-medium" onClick={() => setMobileMenuOpen(false)}>Operations</a>
          <a href="#about" className="text-white/80 hover:text-white font-medium" onClick={() => setMobileMenuOpen(false)}>About</a>
          <button 
            onClick={() => {
              user ? logout() : openAuth();
              setMobileMenuOpen(false);
            }}
            className="w-full py-3 bg-white text-black font-medium mt-2 font-mono"
          >
            {user ? `[ ${user.username} ] Logout` : 'Portal Login'}
          </button>
        </div>
      )}
    </header>
  );
}
