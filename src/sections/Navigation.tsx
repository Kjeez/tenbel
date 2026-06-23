import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'SOLUTIONS', href: '#competencies' },
  { label: 'PRODUCTS', href: '#products' },
  { label: 'SERVICES', href: '#services' },
  { label: 'PARTNERS', href: '#partners' },
  { label: 'ABOUT US', href: '#why' },
  { label: 'RESOURCES', href: '#remote-connectivity' },
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
          ? 'bg-white/95 backdrop-blur-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
          : 'bg-white/80 backdrop-blur-[10px]'
      }`}
      style={{ borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 no-underline shrink-0" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img src="/image.png" alt="Tenbel" className="h-10 md:h-12 w-auto" />
        </a>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-7 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollToSection(link.href)}
                className="text-[#475569] hover:text-[#E8307A] text-[0.8rem] font-medium tracking-[0.08em] transition-colors bg-transparent border-none cursor-pointer flex items-center gap-1"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:block">
          <button
            onClick={() => scrollToSection('#contact')}
            aria-label="Contact us"
            className="text-white bg-gradient-to-r from-[#E8307A] to-[#c026d3] hover:shadow-lg px-6 py-2.5 rounded-full text-[0.75rem] font-semibold tracking-[0.08em] transition-all cursor-pointer border-none"
          >
            CONTACT US
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden flex items-center justify-center cursor-pointer bg-transparent border-none p-1"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X size={24} className="text-[#1a1a2e]" /> : <Menu size={24} className="text-[#1a1a2e]" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white border-b border-[rgba(0,0,0,0.06)] shadow-lg transition-all duration-300 overflow-hidden ${
          isMobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-8 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-[#475569] hover:text-[#E8307A] text-sm text-left transition-colors bg-transparent border-none cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('#contact')}
            className="text-white bg-gradient-to-r from-[#E8307A] to-[#c026d3] px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all border-none cursor-pointer w-fit"
          >
            CONTACT US
          </button>
        </div>
      </div>
    </nav>
  );
}
