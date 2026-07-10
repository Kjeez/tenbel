import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Phone, Mail, MapPin, Mountain, Send, CheckCircle, AlertCircle } from 'lucide-react';

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
  'Wireless Networking',
  'Emergency Communications BoX',
  'RFID Systems',
  'Wireless Network Design',
  'IoT Consulting',
  'Off Grid Solutions',
  'Remote Connectivity',
  'Other',
];

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function Contact() {
  const sectionRef = useScrollAnimation('.contact-animate');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?[0-9\s\-().]{7,20}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message. Please try again later.');
      }

      setSubmitted(true);
      setFormData({ firstName: '', lastName: '', company: '', email: '', phone: '', interest: '', message: '' });
      setErrors({});
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error(error);
      setSubmitError('Failed to send message. Please try again later or contact us directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user types
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const inputErrorClass = 'border-red-400 focus:border-red-500';
  const inputBaseClass = 'w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-[10px] text-[#1a1a2e] text-sm px-4 py-3 outline-none focus:border-[#E8307A] focus:ring-2 focus:ring-[rgba(232,48,122,0.1)] transition-all placeholder:text-[#94a3b8]';

  return (
    <section id="contact" className="relative z-10 bg-white">
      <div ref={sectionRef} className="section-inner">
        <span className="section-tag contact-animate">Connect With Us</span>
        <h2 className="section-title contact-animate">Let's Talk</h2>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="contact-animate">
            <p className="text-[#64748b] mb-10 leading-[1.75]">
              We'd love to walk you and your team through our solutions. Suggest a time and we'll make ourselves available.
            </p>

            <div className="space-y-7">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-xl bg-[rgba(232,48,122,0.06)] border border-[rgba(232,48,122,0.12)] flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-[#E8307A]" />
                    </div>
                    <div>
                      <div className="text-[0.75rem] text-[#94a3b8] uppercase tracking-[0.08em] mb-1">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a href={item.href} className="text-[0.95rem] font-medium text-[#1a1a2e] hover:text-[#E8307A] transition-colors no-underline">
                          {item.val}
                        </a>
                      ) : (
                        <div className="text-[0.9rem] font-medium text-[#1a1a2e] whitespace-pre-line">
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
            <div className="bg-white border border-[#f1f5f9] rounded-[20px] p-8 md:p-10 shadow-soft">
              <div className="text-[1.3rem] font-semibold mb-6 text-[#1a1a2e]">Request a Meeting</div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-firstName" className="block text-[0.8rem] text-[#64748b] mb-2">First Name <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      id="contact-firstName"
                      name="firstName"
                      placeholder="Rajiv"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`${inputBaseClass} ${errors.firstName ? inputErrorClass : ''}`}
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} />{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-lastName" className="block text-[0.8rem] text-[#64748b] mb-2">Last Name <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      id="contact-lastName"
                      name="lastName"
                      placeholder="Mehta"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`${inputBaseClass} ${errors.lastName ? inputErrorClass : ''}`}
                    />
                    {errors.lastName && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} />{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-company" className="block text-[0.8rem] text-[#64748b] mb-2">Company</label>
                  <input
                    type="text"
                    id="contact-company"
                    name="company"
                    placeholder="Your organisation"
                    value={formData.company}
                    onChange={handleChange}
                    className={inputBaseClass}
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-[0.8rem] text-[#64748b] mb-2">Email <span className="text-red-400">*</span></label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    placeholder="you@company.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`${inputBaseClass} ${errors.email ? inputErrorClass : ''}`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} />{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-[0.8rem] text-[#64748b] mb-2">Phone Number <span className="text-red-400">*</span></label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    placeholder="+91 98765 43210"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className={`${inputBaseClass} ${errors.phone ? inputErrorClass : ''}`}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} />{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-interest" className="block text-[0.8rem] text-[#64748b] mb-2">I'm interested in</label>
                  <select
                    id="contact-interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-[10px] text-[#1a1a2e] text-sm px-4 py-3 outline-none focus:border-[#E8307A] focus:ring-2 focus:ring-[rgba(232,48,122,0.1)] transition-all appearance-none"
                  >
                    <option value="">Select a solution</option>
                    {interests.map((opt, i) => (
                      <option key={i} value={opt} className="bg-white">{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[0.8rem] text-[#64748b] mb-2">Message <span className="text-red-400">*</span></label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell us about your connectivity challenge or project..."
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputBaseClass} resize-y ${errors.message ? inputErrorClass : ''}`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} />{errors.message}</p>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || submitted}
                  aria-label="Send message"
                  className={`btn-primary w-full justify-center ${submitted ? '!bg-gradient-to-r !from-green-500 !to-green-600' : ''} ${(isSubmitting || submitted) ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : submitted ? (
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
                {submitError && (
                  <p className="text-red-400 text-sm text-center mt-3 flex justify-center items-center gap-1">
                    <AlertCircle size={14} /> {submitError}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
