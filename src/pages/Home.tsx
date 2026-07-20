import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import WhyExist from '../sections/WhyExist';
import Competencies from '../sections/Competencies';
import Products from '../sections/Products';
import Flagship from '../sections/Flagship';
import OffGrid from '../sections/OffGrid';
import Services from '../sections/Services';
import Partners from '../sections/Partners';

import Contact from '../sections/Contact';
import Footer from '../sections/Footer';
import RemoteConnectivity from '../sections/RemoteConnectivity';
import BusinessContinuity from '../sections/BusinessContinuity';

export default function Home() {
  return (
    <main className="relative bg-white">
      <Navigation />
      <Hero />
      <Flagship />
      <OffGrid />
      <Competencies />
      <Products />
      <Services />
      <RemoteConnectivity />
      <BusinessContinuity />
      <Partners />
      <WhyExist />
      <Contact />
      <Footer />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/918800559098"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        style={{
          position: 'fixed',
          bottom: '28px',
          left: '28px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.45)',
          textDecoration: 'none',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.12)';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 28px rgba(37, 211, 102, 0.65)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.45)';
        }}
      >
        {/* Pulse ring */}
        <span style={{
          position: 'absolute',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(37, 211, 102, 0.35)',
          animation: 'whatsapp-pulse 2s ease-out infinite',
        }} />
        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="30"
          height="30"
          fill="white"
          style={{ position: 'relative', zIndex: 1 }}
        >
          <path d="M16.003 3.2C9.375 3.2 3.998 8.577 3.998 15.205c0 2.132.566 4.178 1.638 5.972L3.2 28.8l7.84-2.388a11.953 11.953 0 0 0 4.963 1.072c6.627 0 12.003-5.377 12.003-12.003S22.63 3.2 16.003 3.2zm0 21.988a9.93 9.93 0 0 1-4.777-1.222l-.342-.202-4.653 1.416 1.34-4.541-.222-.352A9.94 9.94 0 0 1 5.99 15.205c0-5.524 4.49-10.015 10.013-10.015 5.523 0 10.013 4.491 10.013 10.015 0 5.524-4.49 10.015-10.013 10.015v-.032zm5.494-7.502c-.301-.151-1.78-.878-2.056-.978-.277-.1-.478-.15-.678.15-.2.3-.778.978-.953 1.178-.176.2-.351.225-.652.075-.3-.15-1.269-.468-2.417-1.491-.893-.797-1.495-1.78-1.67-2.08-.176-.3-.02-.462.132-.611.136-.134.3-.35.452-.526.15-.175.2-.3.3-.5.1-.2.05-.376-.025-.526-.075-.15-.678-1.631-.928-2.232-.244-.586-.493-.507-.678-.516l-.577-.01a1.106 1.106 0 0 0-.802.376c-.276.3-1.052 1.028-1.052 2.508s1.077 2.909 1.227 3.109c.15.2 2.12 3.236 5.137 4.538.718.31 1.279.496 1.716.635.721.23 1.378.197 1.896.12.578-.086 1.78-.728 2.031-1.43.252-.703.252-1.305.176-1.43-.074-.126-.276-.2-.577-.351z" />
        </svg>
        {/* Tooltip */}
        <span style={{
          position: 'absolute',
          left: '68px',
          bottom: '50%',
          transform: 'translateY(50%)',
          background: '#1a1a2e',
          color: '#fff',
          fontSize: '0.78rem',
          fontWeight: 600,
          padding: '5px 12px',
          borderRadius: '8px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.2s',
        }}
        className="wa-tooltip"
        >
          Chat on WhatsApp
        </span>
      </a>

      <style>{`
        @keyframes whatsapp-pulse {
          0% { transform: scale(1); opacity: 0.7; }
          70% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        a:hover .wa-tooltip { opacity: 1 !important; }
      `}</style>
    </main>
  );
}
