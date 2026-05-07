import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Phone, Mail, MapPin, Mountain, Send, CheckCircle } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    label: 'Call / WhatsApp',
    val: '+91 88005 59098',
    href: 'tel:+918800559098',
  },
  {
    icon: Mail,
    label: 'Email',
    val: 'connect@tenbelconsultants.com',
    href: 'mailto:connect@tenbelconsultants.com',
  },
  {
    icon: MapPin,
    label: 'Delhi NCR Office',
    val: 'K-19, South Extension 2\nNew Delhi – 110049',
  },
  {
    icon: Mountain,
    label: 'Uttarakhand Office',
    val: '55, Pleasant Valley, Rajpur Road\nDehradun – 248009',
  },
];

const interests = [
  'RF Antennas & Accessories',
  'Routers & Gateways',
  'Emergency Communications BoX',
  'RFID Systems',
  'Wireless Network Design',
  'IoT Consulting',
  'EDX Wireless (RF Planning)',
  'Other',
];

export default function Contact() {
  const sectionRef = useScrollAnimation('.contact-animate');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    interest: '',
    message: '',
  });

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative z-10 bg-[#0f1020]">
      <div ref={sectionRef} className="section-inner">
        <span className="section-tag contact-animate">Connect With Us</span>
        <h2 className="section-title contact-animate">Let's Talk</h2>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="contact-animate">
            <p className="text-[rgba(240,240,248,0.55)] mb-10 leading-[1.75]">
              We'd love to walk you and your team through our solutions. Suggest a time and we'll make ourselves available.
            </p>

            <div className="space-y-7">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-xl bg-[rgba(232,48,122,0.1)] border border-[rgba(232,48,122,0.2)] flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-[#E8307A]" />
                    </div>
                    <div>
                      <div className="text-[0.75rem] text-[rgba(240,240,248,0.55)] uppercase tracking-[0.08em] mb-1">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a href={item.href} className="text-[0.95rem] font-medium text-[#f0f0f8] hover:text-[#f472b6] transition-colors no-underline">
                          {item.val}
                        </a>
                      ) : (
                        <div className="text-[0.9rem] font-medium text-[#f0f0f8] whitespace-pre-line">
                          {item.val}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <div className="contact-animate">
            <div className="bg-[#181a2e] border border-[rgba(255,255,255,0.08)] rounded-[20px] p-8 md:p-10">
              <div className="text-[1.3rem] font-semibold mb-6">Request a Meeting</div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[0.8rem] text-[rgba(240,240,248,0.55)] mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Rajiv"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-[10px] text-[#f0f0f8] text-sm px-4 py-3 outline-none focus:border-[rgba(232,48,122,0.5)] transition-colors placeholder:text-[rgba(240,240,248,0.3)]"
                    />
                  </div>
                  <div>
                    <label className="block text-[0.8rem] text-[rgba(240,240,248,0.55)] mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Mehta"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-[10px] text-[#f0f0f8] text-sm px-4 py-3 outline-none focus:border-[rgba(232,48,122,0.5)] transition-colors placeholder:text-[rgba(240,240,248,0.3)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[0.8rem] text-[rgba(240,240,248,0.55)] mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Your organisation"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-[10px] text-[#f0f0f8] text-sm px-4 py-3 outline-none focus:border-[rgba(232,48,122,0.5)] transition-colors placeholder:text-[rgba(240,240,248,0.3)]"
                  />
                </div>

                <div>
                  <label className="block text-[0.8rem] text-[rgba(240,240,248,0.55)] mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-[10px] text-[#f0f0f8] text-sm px-4 py-3 outline-none focus:border-[rgba(232,48,122,0.5)] transition-colors placeholder:text-[rgba(240,240,248,0.3)]"
                  />
                </div>

                <div>
                  <label className="block text-[0.8rem] text-[rgba(240,240,248,0.55)] mb-2">I'm interested in</label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-[10px] text-[#f0f0f8] text-sm px-4 py-3 outline-none focus:border-[rgba(232,48,122,0.5)] transition-colors appearance-none"
                  >
                    <option value="">Select a solution</option>
                    {interests.map((opt, i) => (
                      <option key={i} value={opt} className="bg-[#181a2e]">{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[0.8rem] text-[rgba(240,240,248,0.55)] mb-2">Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your connectivity challenge or project..."
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-[10px] text-[#f0f0f8] text-sm px-4 py-3 outline-none focus:border-[rgba(232,48,122,0.5)] transition-colors resize-y placeholder:text-[rgba(240,240,248,0.3)]"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={submitted}
                  className={`btn-primary w-full justify-center ${submitted ? 'bg-gradient-to-r from-green-500 to-green-700' : ''}`}
                >
                  {submitted ? (
                    <>
                      <CheckCircle size={16} />
                      Message Sent — We'll be in touch!
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
