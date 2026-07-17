const productLinks = [
  { label: 'RF Antennas', href: '#products' },
  { label: 'Wireless Networking', href: '#products' },
  { label: 'Emergency Comms BoX', href: '#flagship' },
  { label: 'RFID Systems', href: '#products' },
];

const serviceLinks = [
  { label: 'Network Design', href: '#services' },
  { label: 'Antenna Design', href: '#services' },
  { label: 'IoT Consulting', href: '#services' },
  { label: 'RFID Deployment', href: '#services' },
];

const companyLinks = [
  { label: 'About Us', href: '#why' },
  { label: 'Partners', href: '#partners' },
  { label: 'Resources', href: '#remote-connectivity' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-[#0f172a]">
      <div className="max-w-[1200px] mx-auto px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-10 border-b border-[rgba(255,255,255,0.08)]">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#" className="flex items-center gap-2.5 no-underline mb-4" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <img src="/logo-new.png" alt="Tenbel" className="h-10 md:h-12 w-auto" />
            </a>
            <p className="text-[rgba(255,255,255,0.55)] text-sm leading-[1.7] max-w-[280px] mb-4">
              Empowering a sustainably connected future through mission-critical wireless, IoT and emergency communication solutions.
            </p>

            {/* Startup India Badge */}
            <div className="inline-flex items-center gap-2 bg-[rgba(255,153,0,0.08)] border border-[rgba(255,153,0,0.2)] rounded-xl px-3 py-2 mb-4">
              <span className="text-[1rem]">🇮🇳</span>
              <div>
                <div className="text-[0.62rem] font-bold uppercase tracking-[0.1em] text-[#FF9900]">Startup India</div>
                <div className="text-[0.6rem] text-[rgba(255,255,255,0.5)] leading-tight">Registered Company</div>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://www.linkedin.com/company/tenbel-consultants/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[rgba(255,255,255,0.55)] hover:text-[#0A66C2] transition-colors no-underline text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Follow on LinkedIn
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-[0.85rem] font-semibold mb-4 text-white">Products</h4>
            <ul className="list-none space-y-2.5">
              {productLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-[rgba(255,255,255,0.55)] hover:text-white text-sm transition-colors bg-transparent border-none cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[0.85rem] font-semibold mb-4 text-white">Services</h4>
            <ul className="list-none space-y-2.5">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-[rgba(255,255,255,0.55)] hover:text-white text-sm transition-colors bg-transparent border-none cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[0.85rem] font-semibold mb-4 text-white">Company</h4>
            <ul className="list-none space-y-2.5">
              {companyLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-[rgba(255,255,255,0.55)] hover:text-white text-sm transition-colors bg-transparent border-none cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-wrap justify-between items-center gap-4 pt-6 text-[0.8rem] text-[rgba(255,255,255,0.45)]">
          <div>© 2026 Tenbel Consultants Private Limited. All rights reserved.</div>
          <div>Delhi NCR · Dehradun · India</div>
        </div>
      </div>
    </footer>
  );
}
