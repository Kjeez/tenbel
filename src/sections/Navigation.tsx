import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'SOLUTIONS', href: '#competencies', hasDropdown: true },
  { label: 'PRODUCTS', href: '#products', hasDropdown: true },
  { label: 'SERVICES', href: '#services', hasDropdown: true },
  { label: 'PARTNERS', href: '#partners', hasDropdown: false },
  { label: 'ABOUT US', href: '#why', hasDropdown: false },
  { label: 'RESOURCES', href: '#media', hasDropdown: false },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[rgba(10,11,20,0.95)] backdrop-blur-[20px]'
          : 'bg-transparent'
      }`}
      style={{ borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 no-underline shrink-0" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img src="/logo-new.png" alt="Tenbel" className="h-14 md:h-16 w-auto" />
        </a>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-7 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollToSection(link.href)}
                className="text-[rgba(240,240,248,0.7)] hover:text-white text-[0.8rem] font-medium tracking-[0.08em] transition-colors bg-transparent border-none cursor-pointer flex items-center gap-1"
              >
                {link.label}
                {link.hasDropdown && <ChevronDown size={12} />}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:block">
          <button
            onClick={() => scrollToSection('#contact')}
            className="text-[#E8307A] border border-[#E8307A] hover:bg-[rgba(232,48,122,0.1)] px-6 py-2 rounded-full text-[0.75rem] font-semibold tracking-[0.08em] transition-all bg-transparent cursor-pointer"
          >
            CONTACT US
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden flex items-center justify-center cursor-pointer bg-transparent border-none p-1"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-[#0a0b14] border-b border-[rgba(255,255,255,0.08)] transition-all duration-300 overflow-hidden ${
          isMobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-8 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-[rgba(240,240,248,0.7)] hover:text-white text-sm text-left transition-colors bg-transparent border-none cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('#contact')}
            className="text-[#E8307A] border border-[#E8307A] px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all bg-transparent cursor-pointer w-fit"
          >
            CONTACT US
          </button>
        </div>
      </div>
    </nav>
  );
}
