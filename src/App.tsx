import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AlertCircle,
  CalendarCheck2,
  Check,
  CheckCircle2,
  Code2,
  Globe2,
  LifeBuoy,
  Menu,
  MonitorSmartphone,
  QrCode,
  ShieldCheck,
  Sparkles,
  X,
  type LucideIcon
} from 'lucide-react';
import { BrandIcon } from './BrandIcon';
import { CONTACT, EMAILJS_CONFIG, WHATSAPP_URL } from './config';

type Service = {
  number: string;
  category: string;
  title: string;
  description: string;
  link: string;
  value: string;
  Icon: LucideIcon;
  tone: string;
};

type FormStatus = { type: 'success' | 'error'; message: string } | null;

const services: Service[] = [
  {
    number: '01', category: 'WEB / DESIGN', title: 'Custom website design',
    description: 'Distinctive landing pages and multi-page business websites designed around your brand and customers.',
    link: 'Discuss a website', value: 'Custom Website Design', Icon: MonitorSmartphone, tone: 'mint'
  },
  {
    number: '02', category: 'WEB / REFRESH', title: 'Website customization',
    description: 'Refresh an existing website with redesigns, new sections, galleries, features and content updates.',
    link: 'Improve my website', value: 'Website Customization', Icon: Sparkles, tone: 'lavender'
  },
  {
    number: '03', category: 'INFRA / LAUNCH', title: 'Domain & web hosting',
    description: 'Your own .in or .com address, reliable hosting, SSL, backups and a smooth launch setup.',
    link: 'Get online', value: 'Domain Registration and Web Hosting', Icon: Globe2, tone: 'blue'
  },
  {
    number: '04', category: 'QR / MENU', title: 'QR menu & ordering',
    description: 'Let customers scan a code to browse your menu, explore items and send orders to your business.',
    link: 'Create my QR menu', value: 'QR Menu', Icon: QrCode, tone: 'peach'
  },
  {
    number: '05', category: 'QR / BOOKING', title: 'QR appointment booking',
    description: 'Help clients choose a date and time for salons, clinics, coaching centres and other services.',
    link: 'Set up bookings', value: 'QR Appointment Booking', Icon: CalendarCheck2, tone: 'rose'
  },
  {
    number: '06', category: 'CARE / SUPPORT', title: 'Maintenance & support',
    description: 'Updates, bug fixes, security improvements, renewals and technical help after launch.',
    link: 'Keep me supported', value: 'Maintenance and Support', Icon: LifeBuoy, tone: 'mint'
  }
];

const audiences = [
  { icon: '☕', title: 'Cafés & restaurants', description: 'Show your menu, receive enquiries and build customer loyalty.', tags: 'WEBSITE · QR MENU · ORDERING' },
  { icon: '🎓', title: 'Schools & coaching', description: 'Share courses, admissions information, notices and enquiry forms.', tags: 'WEBSITE · ENQUIRIES · BOOKING' },
  { icon: '✳', title: 'Salons & clinics', description: 'Make it easy for clients to explore services and request appointments.', tags: 'WEBSITE · QR BOOKING' },
  { icon: '🚀', title: 'Startups', description: 'Build a confident online presence with a clear brand and message.', tags: 'WEBSITE · DOMAIN · HOSTING' },
  { icon: '▤', title: 'Shops & businesses', description: 'Showcase products, offers, location, contact and payment links.', tags: 'WEBSITE · QR · PAYMENTS' }
];

const packages = [
  {
    tier: 'STARTER / 01', name: 'Starter', price: '999', description: 'A simple digital starting point for a new business.',
    features: ['Basic one-page landing section', 'Mobile-friendly layout', 'WhatsApp or call button', 'Starter content setup', 'Scope confirmed before work'],
    button: 'Choose Starter', highlighted: false, service: 'Custom Website Design'
  },
  {
    tier: 'BUSINESS / 02', name: 'Business', price: '9,999', description: 'A complete website for a growing business.',
    features: ['Up to 5 custom pages', 'Gallery, services & testimonials', 'Basic SEO & speed setup', 'Social media & QR links', 'Domain connection & SSL', 'Delivery in 5–7 days'],
    button: 'Choose Business', highlighted: true, service: 'Custom Website Design'
  },
  {
    tier: 'PREMIUM / 03', name: 'Premium', price: '19,999', description: 'Advanced features for ambitious teams.',
    features: ['Up to 10 pages, premium design', 'Online enquiry or booking system', 'Payment gateway integration', 'Analytics & admin panel, if scoped', '3 months free support'],
    button: 'Choose Premium', highlighted: false, service: 'Other / Need advice'
  }
];

const addOns = [
  ['QR Menu', '₹2,999', 'starting'],
  ['QR Ordering', '₹7,999', 'starting'],
  ['QR Appointment Booking', '₹5,999', 'starting'],
  ['Custom QR Code', '₹499', 'per QR'],
  ['Domain (.in / .com)', '₹999', 'per year, from'],
  ['Hosting + SSL', '₹1,499', 'per year, from'],
  ['Website customization', '₹499', 'per task, from'],
  ['Maintenance & support', '₹999', 'per month, from']
];

const steps = [
  { number: '01', title: 'Discuss', text: 'We understand your business, customers and goals.', timing: 'DAY 1' },
  { number: '02', title: 'Plan & quote', text: 'We share the package, pricing and timeline in writing.', timing: 'DAY 1–2' },
  { number: '03', title: 'Design', text: 'Review the design and tell us what you would like changed.', timing: 'DAY 2–5' },
  { number: '04', title: 'Build & launch', text: 'We set up, test and launch your website or QR solution.', timing: 'DAY 5–7' },
  { number: '05', title: 'Grow & support', text: 'We help with updates, maintenance and next steps.', timing: 'ONGOING' }
];

const serviceOptions = [
  'Custom Website Design',
  'Website Customization',
  'Domain Registration and Web Hosting',
  'QR Menu',
  'QR Ordering',
  'QR Appointment Booking',
  'Maintenance and Support',
  'Custom QR Codes',
  'Launch Combo',
  'Other / Need advice'
];

function Brand() {
  return (
    <a className="brand" href="#home" aria-label="Synegro Digital Solutions home">
      <span className="brand-mark" aria-hidden="true">S<span>.</span></span>
      <span className="brand-copy"><strong>SYNEGRO</strong><small>DIGITAL SOLUTIONS</small></span>
    </a>
  );
}

function IconLink({ brand, label, href, description }: { brand: 'whatsapp' | 'instagram' | 'gmail'; label: string; href: string; description: string }) {
  const isExternal = href.startsWith('https://');
  return (
    <a className={`contact-method contact-method-${brand}`} href={href} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      <span className="contact-brand-icon"><BrandIcon brand={brand} size={28} /></span>
      <span className="contact-method-copy"><small>{label}</small><strong>{description}</strong></span>
      <ArrowUpRight className="method-arrow" size={19} aria-hidden="true" />
    </a>
  );
}

function QRVisual() {
  const cells = [
    '1111100011111', '1000101010001', '1010100010101', '1000101110001', '1111101011111',
    '0000000010000', '1011011011011', '0010110100110', '1101001110101', '0000010010000',
    '1111101011011', '1000100110010', '1010101101111', '1000100010001', '1111101011111'
  ];
  return (
    <div className="qr-visual" aria-hidden="true">
      <div className="qr-cells">
        {cells.join('').split('').map((cell, index) => <i key={index} className={cell === '1' ? 'is-dark' : ''} />)}
      </div>
      <span className="qr-corner qr-corner-one" />
      <span className="qr-corner qr-corner-two" />
      <span className="qr-corner qr-corner-three" />
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sampleViewed, setSampleViewed] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>(null);
  const [year] = useState(() => new Date().getFullYear());
  const lastSubmitAt = useRef(0);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealItems.forEach(item => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 760) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  function jumpToContact(service: string) {
    setSelectedService(service);
    setMenuOpen(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSending) return;

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const honeypot = String(data.get('company_website') || '').trim();
    if (honeypot) {
      form.reset();
      setSelectedService('');
      setFormStatus({ type: 'success', message: 'Thanks! Your enquiry has been received.' });
      return;
    }

    const configured = Boolean(
      EMAILJS_CONFIG.publicKey.trim() &&
      EMAILJS_CONFIG.serviceId.trim() &&
      EMAILJS_CONFIG.templateId.trim() &&
      !/^(YOUR_|PASTE_|REPLACE_)/i.test(EMAILJS_CONFIG.publicKey.trim())
    );

    if (!configured) {
      setFormStatus({
        type: 'error',
        message: 'Email setup is incomplete. Add your EmailJS Public Key in src/config.ts, save the file, and refresh the site.'
      });
      return;
    }

    if (Date.now() - lastSubmitAt.current < 10000) {
      setFormStatus({ type: 'error', message: 'Please wait a few seconds before sending another enquiry.' });
      return;
    }

    const templateParams = {
      name: String(data.get('name') || '').trim().slice(0, 80),
      age: String(data.get('age') || '').trim().slice(0, 3),
      phone: String(data.get('phone') || '').trim().slice(0, 25),
      email: String(data.get('email') || '').trim().slice(0, 254),
      service: String(data.get('service') || 'Not specified').trim().slice(0, 100),
      message: String(data.get('message') || '').trim().slice(0, 1000)
    };

    // Apply the cooldown to failed attempts too, not only successful sends.
    lastSubmitAt.current = Date.now();
    setIsSending(true);
    setFormStatus(null);

    try {
      await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams, {
        publicKey: EMAILJS_CONFIG.publicKey
      });
      lastSubmitAt.current = Date.now();
      form.reset();
      setSelectedService('');
      setFormStatus({ type: 'success', message: 'Thanks! Your enquiry has been sent. We will get back to you soon.' });
    } catch (error) {
      // Keep provider details out of the public page. See browser DevTools and EmailJS History for diagnostics.
      console.error('EmailJS enquiry could not be sent.', error instanceof Error ? error.message : 'Request failed');
      setFormStatus({
        type: 'error',
        message: 'We could not send your enquiry. Check your EmailJS Public Key, Service ID, Template ID and template variables, or contact us directly using WhatsApp or email.'
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="container nav-wrap">
          <Brand />
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primaryNav" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMenuOpen(value => !value)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav className={`nav-links${menuOpen ? ' open' : ''}`} id="primaryNav" aria-label="Main navigation">
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#solutions" onClick={() => setMenuOpen(false)}>QR solutions</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
            <a href="#process" onClick={() => setMenuOpen(false)}>How it works</a>
            <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <ArrowUpRight size={17} /></a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero-section" id="home">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <div className="eyebrow"><span className="live-dot" /> Digital experiences for growing businesses</div>
              <h1>Your next chapter<br />starts <span className="gradient-text">online.</span></h1>
              <p className="hero-lead">We build custom websites and smart QR systems that help your business get found, get orders and get appointments.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">Build my website <ArrowUpRight size={18} /></a>
                <a className="button button-ghost" href="#services"><ArrowDown size={17} /> Explore services</a>
              </div>
              <div className="hero-proof">
                <div className="proof-icons" aria-hidden="true"><span><Code2 size={15} /></span><span><QrCode size={15} /></span><span><ShieldCheck size={15} /></span></div>
                <p><strong>One partner. All things digital.</strong><small>Design · Development · QR · Support</small></p>
              </div>
            </div>

            <div className="hero-visual reveal" aria-label="Illustration of a modern business website and smart QR menu">
              <div className="visual-ring visual-ring-one" />
              <div className="visual-ring visual-ring-two" />
              <div className="dashboard-card">
                <div className="browser-bar"><div className="browser-dots"><i /><i /><i /></div><span className="browser-address"><ShieldCheck size={11} /> synegro.site/preview</span><span className="browser-menu">•••</span></div>
                <div className="dashboard-inner">
                  <div className="dashboard-nav"><span className="mini-brand"><b>S.</b> synegro</span><span className="mini-nav-pill">LET’S BUILD <ArrowUpRight size={12} /></span></div>
                  <div className="dashboard-kicker">YOUR BUSINESS, REIMAGINED</div>
                  <h2>Made to move<br /><em>your business.</em></h2>
                  <p>Good ideas deserve a great digital home.</p>
                  <div className="dashboard-bottom"><span className="mini-button">Explore more <ArrowUpRight size={12} /></span><div className="mini-chart" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div></div>
                </div>
              </div>
              <div className="float-card qr-float"><QRVisual /><span><strong>One scan away</strong><small>Menu · Order · Book</small></span></div>
              <div className="float-card status-float"><span className="status-check"><Check size={19} /></span><span><strong>You’re online</strong><small>Ready for business</small></span><span className="online-pulse" /></div>
              <div className="hero-orbit-label"><Sparkles size={14} /> A smarter digital presence</div>
            </div>
          </div>
          <div className="container hero-bottom"><span className="hero-bottom-label">BUILT FOR AMBITION</span><div className="hero-tags"><span>Startups</span><span>Cafés & restaurants</span><span>Schools</span><span>Local businesses</span></div></div>
        </section>

        <section className="stats-strip" aria-label="Our approach">
          <div className="container stats-grid">
            <div><strong>01</strong><span>Partner for your digital journey</span></div>
            <div><strong>3–7 <small>days</small></strong><span>Typical website delivery</span></div>
            <div><strong>100<span>%</span></strong><span>Responsive, custom design</span></div>
            <div><strong>24/7</strong><span>Your business stays discoverable</span></div>
          </div>
        </section>

        <section className="section section-light" id="services">
          <div className="container">
            <div className="section-heading reveal">
              <div><div className="eyebrow dark-eyebrow">WHAT WE DO <span>/ 01</span></div><h2>Digital services.<br /><span className="muted-heading">Real-world impact.</span></h2></div>
              <p>Everything you need to launch, look professional and keep growing online — without the technical headache.</p>
            </div>
            <div className="services-grid">
              {services.map(service => {
                const Icon = service.Icon;
                return (
                  <article className="service-card reveal" key={service.number}>
                    <div className="service-top"><span className={`service-icon ${service.tone}`}><Icon size={22} strokeWidth={1.8} /></span><span className="service-number">{service.number} / {service.category}</span></div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <a href="#contact" className="text-link" onClick={() => jumpToContact(service.value)}>{service.link}<ArrowUpRight size={17} /></a>
                  </article>
                );
              })}
            </div>
            <div className="service-note reveal"><span className="note-icon"><Sparkles size={20} /></span><p><strong>Need something specific?</strong> We can also help with custom QR codes for reviews, UPI payments, social pages, Wi-Fi and contact details.</p><a href="#contact" onClick={() => jumpToContact('Custom QR Codes')}>Tell us what you need <ArrowRight size={15} /></a></div>
          </div>
        </section>

        <section className="section qr-section" id="solutions">
          <div className="container qr-layout">
            <div className="qr-copy reveal">
              <div className="eyebrow"><span className="eyebrow-mark"><QrCode size={15} /></span> SMART QR <span>/ 02</span></div>
              <h2>One scan.<br /><span className="gradient-text">More possibilities.</span></h2>
              <p>Turn a printed code into a useful digital touchpoint. Make it easier for customers to browse, order, book or connect with you.</p>
              <a className="button button-primary" href="#contact" onClick={() => jumpToContact('Custom QR Codes')}>Explore QR solutions <ArrowUpRight size={17} /></a>
              <div className="qr-feature-list">
                <div><span>01</span><p><strong>QR Menu</strong><small>Digital menus with categories, photos and prices.</small></p></div>
                <div><span>02</span><p><strong>QR Ordering</strong><small>Customers choose items and contact your business to order.</small></p></div>
                <div><span>03</span><p><strong>QR Booking</strong><small>Appointments for salons, clinics, classes and services.</small></p></div>
                <div><span>04</span><p><strong>Custom QR Codes</strong><small>Reviews, UPI, social, Wi-Fi and contact links.</small></p></div>
              </div>
            </div>
            <div className="qr-demo-wrap reveal">
              <div className="qr-demo-card">
                <div className="qr-demo-head"><span>CAFÉ / SAMPLE MENU</span><span className="demo-live"><i /> DEMO UI</span></div>
                <div className="cafe-title"><span className="coffee-art">☕</span><div><h3>Good Day Café</h3><p>Freshly made. Happily served.</p></div><span className="cafe-open"><i /> OPEN</span></div>
                <div className="menu-item"><span className="food-thumb food-coffee">☕</span><span className="food-copy"><strong>Cold Coffee</strong><small>Chilled & creamy</small></span><b>₹120</b></div>
                <div className="menu-item"><span className="food-thumb food-sandwich">🥪</span><span className="food-copy"><strong>Paneer Sandwich</strong><small>Grilled with mint</small></span><b>₹150</b></div>
                <div className="menu-item"><span className="food-thumb food-fries">🍟</span><span className="food-copy"><strong>Masala Fries</strong><small>Crispy & spicy</small></span><b>₹110</b></div>
                <div className="menu-item"><span className="food-thumb food-brownie">🍰</span><span className="food-copy"><strong>Chocolate Brownie</strong><small>A little sweet moment</small></span><b>₹140</b></div>
                <button className="demo-order" type="button" onClick={() => setSampleViewed(true)}>{sampleViewed ? <>Sample viewed <Check size={16} /></> : <>Place a sample order <ArrowUpRight size={16} /></>}</button>
                <p className="demo-caption">Illustrative demo · Items and prices are examples</p>
              </div>
              <div className="qr-sticker"><QRVisual /><span>SCAN TO<br />CONNECT</span></div>
              <div className="qr-demo-badge"><QrCode size={17} /><span>Digital, one scan away</span></div>
            </div>
          </div>
        </section>

        <section className="section section-light audience-section" id="audience">
          <div className="container">
            <div className="section-heading reveal"><div><div className="eyebrow dark-eyebrow">MADE FOR YOU <span>/ 03</span></div><h2>Built around your<br /><span className="muted-heading">kind of business.</span></h2></div><p>Practical digital solutions for ambitious people and businesses at every stage.</p></div>
            <div className="audience-grid">
              {audiences.map((audience, index) => <article className="audience-card reveal" key={audience.title}><span className={`audience-emoji audience-emoji-${index + 1}`} aria-hidden="true">{audience.icon}</span><h3>{audience.title}</h3><p>{audience.description}</p><small>{audience.tags}</small></article>)}
            </div>
          </div>
        </section>

        <section className="section pricing-section" id="pricing">
          <div className="container">
            <div className="section-heading reveal"><div><div className="eyebrow">CLEAR STARTING PRICES <span>/ 04</span></div><h2>Pick your starting point.</h2></div><p>Transparent starting prices. Final pricing depends on your pages, features and requirements.</p></div>
            <div className="pricing-grid">
              {packages.map(item => <article className={`price-card reveal${item.highlighted ? ' featured' : ''}`} key={item.name}>
                {item.highlighted && <div className="popular-label"><Sparkles size={13} /> MOST POPULAR</div>}
                <div className="price-tier">{item.tier}</div><h3>{item.name}</h3><p className="price"><span>₹</span>{item.price}<small> onwards</small></p><p className="price-desc">{item.description}</p>
                <ul>{item.features.map(feature => <li key={feature}><CheckCircle2 size={16} />{feature}</li>)}</ul>
                <a href="#contact" className={`button ${item.highlighted ? 'button-primary' : 'button-outline'}`} onClick={() => jumpToContact(item.service)}>{item.button}<ArrowUpRight size={17} /></a>
              </article>)}
            </div>
            <p className="pricing-footnote">All prices are one-time starting prices in INR. GST extra as applicable. Domain and hosting are charged separately unless included in a written quote.</p>
            <div className="addons">
              <div className="addons-heading"><div className="eyebrow"><span className="eyebrow-mark"><Sparkles size={15} /></span> QR SOLUTIONS & ADD-ONS</div><h3>Scale up when<br />you’re ready.</h3><p>Start with what you need today and add more when you’re ready to grow.</p></div>
              <div className="addon-list">{addOns.map(([name, price, note]) => <div key={name}><span>{name}</span><b>{price}<small>{note}</small></b></div>)}</div>
            </div>
            <div className="combo-banner reveal"><span className="combo-icon"><Sparkles size={24} /></span><div className="combo-copy"><strong>Launch Combo</strong><p>Website + Domain + Hosting + QR Menu</p></div><b className="combo-price">₹12,999 <small>starting · GST extra</small></b><a href="#contact" aria-label="Ask about Launch Combo" onClick={() => jumpToContact('Launch Combo')}><ArrowUpRight size={20} /></a></div>
          </div>
        </section>

        <section className="section process-section" id="process">
          <div className="container">
            <div className="section-heading reveal"><div><div className="eyebrow dark-eyebrow">SIMPLE PROCESS <span>/ 05</span></div><h2>From idea to live<br /><span className="muted-heading">in five steps.</span></h2></div><p>Clear steps, clear timelines and no surprises. You stay in the loop from first conversation to launch.</p></div>
            <div className="process-grid">{steps.map(step => <article className="process-step reveal" key={step.number}><span className="step-number">{step.number}</span><div className="step-line" /><h3>{step.title}</h3><p>{step.text}</p><small>{step.timing}</small></article>)}</div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="contact-background-shape contact-background-shape-one" /><div className="contact-background-shape contact-background-shape-two" />
          <div className="container contact-layout">
            <div className="contact-copy reveal">
              <div className="eyebrow"><span className="live-dot" /> LET’S BUILD SOMETHING <span>/ 06</span></div>
              <h2>Let’s put your<br />business <span className="gradient-text">online.</span></h2>
              <p>Tell us what you need built, customised or launched. We’ll get back to you with a clear plan and price.</p>
              <div className="contact-methods">
                <IconLink brand="whatsapp" label="CHAT ON WHATSAPP" href={WHATSAPP_URL} description={CONTACT.phoneDisplay} />
                <IconLink brand="gmail" label="EMAIL US" href={`mailto:${CONTACT.email}`} description={CONTACT.email} />
                <IconLink brand="instagram" label="FOLLOW OUR WORK" href={CONTACT.instagram} description="@synegro.digital" />
              </div>
              <div className="contact-assurance"><ShieldCheck size={18} /><span><strong>Your enquiry stays focused.</strong><small>Your details are used only to respond to your enquiry.</small></span></div>
            </div>

            <div className="form-card reveal">
              <div className="form-heading"><div><span className="form-step">PROJECT ENQUIRY</span><h3>Tell us about yourself.</h3></div><span className="form-spark"><Sparkles size={23} /></span></div>
              <p className="form-intro">Share a few details and we’ll take it from there.</p>
              <form id="leadForm" onSubmit={handleSubmit}>
                <div className="form-row"><label>Full name <input name="name" autoComplete="name" minLength={2} maxLength={80} required placeholder="Your name" /></label><label>Age <input name="age" type="number" min={13} max={100} inputMode="numeric" required placeholder="Your age" /></label></div>
                <div className="form-row"><label>Contact number <input name="phone" type="tel" autoComplete="tel" minLength={7} maxLength={25} required placeholder="+91 00000 00000" /></label><label>Email address <input name="email" type="email" autoComplete="email" maxLength={254} required placeholder="you@example.com" /></label></div>
                <label>What are you interested in? <select name="service" value={selectedService} onChange={(event: ChangeEvent<HTMLSelectElement>) => setSelectedService(event.target.value)}><option value="">Choose a service (optional)</option>{serviceOptions.map(option => <option key={option} value={option}>{option}</option>)}</select></label>
                <label>Anything else we should know? <textarea name="message" rows={3} maxLength={1000} placeholder="Tell us a little about your business or idea (optional)" /></label>
                <label className="consent"><input name="consent" type="checkbox" required /><span>I agree that Synegro Digital Solutions may contact me about this enquiry.</span></label>
                <label className="honeypot" aria-hidden="true">Leave this empty<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
                <button className="button button-primary form-submit" type="submit" disabled={isSending}><span>{isSending ? 'Sending enquiry…' : 'Send my enquiry'}</span>{isSending ? <span className="loading-dot" /> : <ArrowUpRight size={18} />}</button>
                {formStatus && <p className={`form-status ${formStatus.type}`} role="status" aria-live="polite">{formStatus.type === 'success' ? <CheckCircle2 size={17} /> : <AlertCircle size={17} />}{formStatus.message}</p>}
                <p className="privacy-note">Please don’t submit passwords or sensitive information. If email delivery is unavailable, use one of the direct contact options.</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main"><Brand /><p>Websites. QR. Growth.</p><div className="footer-links"><a href="#services">Services</a><a href="#pricing">Pricing</a><a href="#contact">Contact</a><a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={14} /></a></div></div>
        <div className="container footer-bottom"><span>© {year} Synegro Digital Solutions. All rights reserved.</span><span>Designed for the next stage of your business.</span></div>
      </footer>

      <a className="floating-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat with Synegro Digital Solutions on WhatsApp"><BrandIcon brand="whatsapp" size={27} /><span>Let’s talk</span><ArrowUpRight size={16} /></a>
      <button className="back-to-top" type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}><ArrowUpRight size={19} /></button>
    </>
  );
}
