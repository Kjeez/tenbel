const productLinks = [
  { label: 'RF Antennas', href: '#products' },
  { label: 'Routers & Gateways', href: '#products' },
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
  { label: 'Media', href: '#media' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-[#0a0b14] border-t border-[rgba(255,255,255,0.08)]">
      <div className="max-w-[1200px] mx-auto px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-10 border-b border-[rgba(255,255,255,0.08)]">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#" className="flex items-center gap-2.5 no-underline mb-3" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <img src="/logo-new.png" alt="Tenbel" className="h-10 md:h-12 w-auto" />
            </a>
            <p className="text-[rgba(240,240,248,0.55)] text-sm leading-[1.7] max-w-[280px]">
              Empowering a sustainably connected future through mission-critical wireless, IoT and emergency communication solutions.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-[0.85rem] font-semibold mb-4">Products</h4>
            <ul className="list-none space-y-2">
              {productLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-[rgba(240,240,248,0.55)] hover:text-[#f0f0f8] text-sm transition-colors bg-transparent border-none cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[0.85rem] font-semibold mb-4">Services</h4>
            <ul className="list-none space-y-2">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-[rgba(240,240,248,0.55)] hover:text-[#f0f0f8] text-sm transition-colors bg-transparent border-none cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[0.85rem] font-semibold mb-4">Company</h4>
            <ul className="list-none space-y-2">
              {companyLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-[rgba(240,240,248,0.55)] hover:text-[#f0f0f8] text-sm transition-colors bg-transparent border-none cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-wrap justify-between items-center gap-4 pt-6 text-[0.8rem] text-[rgba(240,240,248,0.55)]">
          <div>© 2026 Tenbel Consultants Private Limited. All rights reserved.</div>
          <div>Delhi NCR · Dehradun · India</div>
        </div>
      </div>
    </footer>
  );
}
