import React, { useState, useEffect } from 'react';

// Scroll reveal hook for animations
const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );
    observer.observe(ref);
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, threshold]);

  return [setRef, isVisible];
};

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: 'Features', id: 'features' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Benefits', id: 'benefits' },
    { name: 'Who It\'s For', id: 'who-its-for' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-100' : 'bg-white/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => scrollToSection('hero')} className="flex items-center group cursor-pointer gap-4">
            <img
              src="/Logo-BozoLabs_edit.svg"
              alt="SAM Logo"
              className="h-12 w-auto"
            />
            <div>
              <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Silver Age Monitoring
              </div>
              <div className="text-xs text-gray-500 font-medium">Powered by Corezo AI</div>
            </div>
          </button>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative group"
              >
                {item.name}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <div className="space-y-4">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 font-medium"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Sticky CTA Button
const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setIsVisible(window.scrollY > heroBottom);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-40 transition-all duration-500 transform ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
    }`}>
      <button
        onClick={() => window.location.href = 'mailto:segreteria@atsweb.info?subject=SAM Demo Request'}
        className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold shadow-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 flex items-center gap-3"
      >
        <span className="text-2xl">🚀</span>
        <span className="hidden sm:inline">Get Free Demo</span>
        <span className="sm:hidden">Demo</span>
        <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
      </button>
    </div>
  );
};

// Hero Section
const Hero = () => {
  const keyBenefits = [
    { icon: "🏠", title: "No Cameras or Wearables", description: "Respects dignity and privacy" },
    { icon: "🧠", title: "Learns Daily Routines", description: "Understands what's normal" },
    { icon: "📱", title: "Smart Alerts Only", description: "No false alarms" }
  ];

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg border border-gray-200">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span>Trusted by Families & Healthcare Providers Across Italy</span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
          Stop Worrying About
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            "Is Mom Okay?"
          </span>
        </h1>

        <div className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
          <span className="block">SAM + Corezo AI watch for you,</span>
          <span className="block text-gray-600">so you can sleep peacefully</span>
        </div>

        <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-12">
          Get alerts only when something's actually wrong - not false alarms. No cameras, no wearables, no monthly cloud fees.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            onClick={() => window.location.href = 'mailto:segreteria@atsweb.info?subject=SAM Demo Request'}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl transform hover:scale-105 min-w-[250px]"
          >
            Request Free Demo →
          </button>

          <button
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 border-2 border-gray-200 min-w-[200px]"
          >
            How It Works
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {keyBenefits.map((benefit, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Stats Section
const Stats = () => {
  const [setRef, isVisible] = useScrollReveal();
  const stats = [
    { number: "24/7", label: "Continuous Monitoring", icon: "🔄" },
    { number: "100%", label: "Local Processing", icon: "🔒" },
    { number: "<5min", label: "Alert Response", icon: "⚡" },
    { number: "0", label: "Cameras Required", icon: "👁️" }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-6" ref={setRef}>
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Features Section
const Features = () => {
  const features = [
    {
      title: "Learns Daily Routines",
      description: "Corezo AI watches morning coffee, evening walks, medication schedules. Detects when patterns change.",
      icon: "🧠",
      example: "Alerts when daily 3pm tea time is missed"
    },
    {
      title: "Works Locally",
      description: "All processing happens in your loved one's home. Monitors 24/7 even during internet outages.",
      icon: "🏠",
      example: "Continues monitoring during WiFi outages"
    },
    {
      title: "Alerts Before Crisis",
      description: "Detects unusual patterns early. Sends text alerts, phone calls, or Alexa announcements.",
      icon: "📱",
      example: "Alerts if no movement for 4+ hours"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How SAM Actually
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Keeps Families Safe
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                <p className="text-sm text-blue-800 font-medium">Example: {feature.example}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works
const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">How SAM Works</h2>
          <p className="text-lg text-gray-600">Simple setup, intelligent monitoring, instant peace of mind</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Three-Tier Alert System</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { level: "🚨 Emergency", action: "Instant call + text", example: "No movement for 4+ hours", color: "red" },
              { level: "⚠️ High Priority", action: "Text + email", example: "Missed 3 daily routines", color: "amber" },
              { level: "💡 Moderate", action: "Daily summary", example: "Sleep pattern changed", color: "blue" }
            ].map((alert, index) => (
              <div key={index} className={`bg-${alert.color}-50 border-2 border-${alert.color}-200 p-6 rounded-2xl text-center`}>
                <div className="text-3xl mb-3">{alert.level.split(' ')[0]}</div>
                <h4 className={`font-bold text-lg mb-2 text-${alert.color}-700`}>{alert.level.split(' ').slice(1).join(' ')}</h4>
                <p className="text-sm text-gray-600 mb-2">{alert.action}</p>
                <p className="text-xs text-gray-500">{alert.example}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Benefits
const Benefits = () => {
  const benefits = [
    { title: "Sleep Better", icon: "😴", description: "No more daily worry calls" },
    { title: "Privacy First", icon: "🏠", description: "No cameras or cloud servers" },
    { title: "Learns Routines", icon: "🧠", description: "Adapts to unique patterns" },
    { title: "Reduce Guilt", icon: "📞", description: "Confidence in their safety" },
    { title: "Works 24/7", icon: "✈️", description: "Even when you're away" }
  ];

  return (
    <section id="benefits" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Why Families Choose
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">SAM & Corezo</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white text-gray-900 p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials
const Testimonials = () => {
  const testimonials = [
    { name: "Maria R.", role: "Daughter", quote: "SAM gave me my life back. I sleep through the night now.", avatar: "👩", rating: 5 },
    { name: "San Giuseppe Care", role: "Care Facility", quote: "We monitor 45 residents with dignity. No cameras needed.", avatar: "🏥", rating: 5 },
    { name: "Dr. Bianchi", role: "Geriatrician", quote: "Shows patterns I'd never see in office visits.", avatar: "👨‍⚕️", rating: 5 }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Trusted by Families
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Across Italy</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-blue-50 p-8 rounded-3xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="text-5xl">{t.avatar}</div>
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, j) => <span key={j} className="text-yellow-400">⭐</span>)}
                </div>
              </div>
              <p className="text-gray-700 mb-6 italic">"{t.quote}"</p>
              <div className="border-t pt-4">
                <p className="font-bold text-blue-700">{t.name}</p>
                <p className="text-sm text-gray-600">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Who Its For
const WhoItsFor = () => {
  const audiences = [
    { icon: "👨‍👩‍👧‍👦", title: "Adult Children", subtitle: "Caring for aging parents from afar" },
    { icon: "🏥", title: "Care Facilities", subtitle: "Monitor residents with dignity" },
    { icon: "🩺", title: "Healthcare Providers", subtitle: "Extend care between visits" }
  ];

  return (
    <section id="who-its-for" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Who Benefits from
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">SAM & Corezo</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {audiences.map((aud, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border-2 border-blue-200 hover:shadow-xl transition-all">
              <div className="text-4xl mb-4 text-center">{aud.icon}</div>
              <h3 className="text-2xl font-bold text-center mb-2 text-blue-700">{aud.title}</h3>
              <p className="text-gray-600 text-center font-medium">{aud.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact with FAQ
const Contact = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: "How does SAM work without cameras?", a: "SAM uses advanced motion sensors and AI to learn daily routines without intrusive monitoring." },
    { q: "What if internet goes down?", a: "SAM continues monitoring 24/7. When internet returns, alerts are sent immediately." },
    { q: "How long to set up?", a: "Professional installation takes 2 hours. The system learns for 2 weeks before sending alerts." },
    { q: "Is data secure?", a: "Yes. All processing happens locally. Only alerts are transmitted using encryption." }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div id="faq" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/10 rounded-2xl overflow-hidden border border-white/20">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-white">{faq.q}</span>
                  <span className={`text-2xl transition-transform ${openIndex === i ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-5 text-gray-300">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">Ready to Get Started?</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <button
            onClick={() => window.location.href = 'mailto:segreteria@atsweb.info?subject=SAM Demo Request'}
            className="bg-white text-gray-900 p-8 rounded-3xl hover:shadow-2xl transition-all"
          >
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-2">Schedule a Demo</h3>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-bold mt-4">
              Request Free Demo
            </div>
          </button>

          <button
            onClick={() => window.location.href = 'tel:0303754386'}
            className="bg-white text-gray-900 p-8 rounded-3xl hover:shadow-2xl transition-all"
          >
            <div className="text-5xl mb-4">📞</div>
            <h3 className="text-2xl font-bold mb-2">Talk to an Expert</h3>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-bold mt-4">
              Call: 030 375 4386
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

            {/* Company Branding - Column 1 & 2 */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <img
                  src="/Logo-BozoLabs_edit.svg"
                  alt="SAM Logo"
                  className="h-24 w-auto mr-4"
                />
                <div>
                  <h3 className="text-2xl font-bold text-white">Silver Age Monitoring</h3>
                  <p className="text-sm text-blue-300 font-medium">Powered by Corezo AI</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                Advanced AI-powered monitoring that respects privacy and dignity.
                Helping families care for their loved ones with intelligent,
                non-intrusive technology.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold border border-blue-400/30">
                  🏆 Made in Italy
                </span>
                <span className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-semibold border border-green-400/30">
                  🔒 Privacy First
                </span>
                <span className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold border border-purple-400/30">
                  🧠 AI Powered
                </span>
              </div>

              {/* Partner Logo Section */}
              <div className="pt-6 border-t border-gray-700">
                <p className="text-gray-400 text-sm mb-4">In partnership with:</p>
                <div className="flex items-center gap-4">
                  <img
                    src="/logo-ats.svg"
                    alt="ATS Logo"
                    className="h-16 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                  <div>
                    <p className="text-blue-300 text-sm font-medium">ATS Srl</p>
                    <p className="text-gray-400 text-xs">Advanced Technology Solutions</p>
                    <p className="text-gray-500 text-xs">Smart Healthcare Innovation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links - Column 3 */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-400 mr-3 rounded"></span>
                Quick Links
              </h4>
              <ul className="space-y-4">
                {[
                  { name: 'How SAM Works', id: 'how-it-works', icon: '🔍' },
                  { name: 'Key Features', id: 'features', icon: '⭐' },
                  { name: 'Benefits', id: 'benefits', icon: '💡' },
                  { name: 'Who It\'s For', id: 'who-its-for', icon: '👥' },
                  { name: 'FAQ', id: 'faq', icon: '❓' },
                  { name: 'Get Started', id: 'contact', icon: '🚀' }
                ].map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                      className="flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 group"
                    >
                      <span className="mr-2 text-sm group-hover:scale-110 transition-transform duration-300">{link.icon}</span>
                      <span className="group-hover:underline">{link.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & CTA - Column 4 */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-400 mr-3 rounded"></span>
                Get in Touch
              </h4>

              {/* Contact Details */}
              <div className="space-y-4 mb-6">
                {/* Phone */}
                <div className="flex items-center group">
                  <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-500/30 transition-colors duration-300">
                    📞
                  </div>
                  <div>
                    <button
                      onClick={() => window.location.href = 'tel:0303754386'}
                      className="text-white hover:text-blue-300 transition-colors duration-300 font-medium"
                    >
                      030 375 4386
                    </button>
                    <p className="text-gray-400 text-xs">Mon-Fri 9AM-6PM CET</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center group">
                  <div className="w-10 h-10 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-500/30 transition-colors duration-300">
                    ✉️
                  </div>
                  <div>
                    <button
                      onClick={() => window.location.href = 'mailto:support@atsweb.info'}
                      className="text-white hover:text-purple-300 transition-colors duration-300 font-medium"
                    >
                      support@atsweb.info
                    </button>
                    <p className="text-gray-400 text-xs">24/7 Email Support</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start group">
                  <div className="w-10 h-10 bg-green-500/20 text-green-400 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-500/30 transition-colors duration-300 flex-shrink-0">
                    🏢
                  </div>
                  <div>
                    <div className="text-gray-300 font-medium">
                      <p>Via Sant'Orsola 64</p>
                      <p>Brescia, Lombardy</p>
                      <p>Italy</p>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">Visit by appointment</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => window.location.href = 'mailto:segreteria@atsweb.info?subject=SAM Demo Request'}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Request Free Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50 bg-black/30 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Copyright & Tech Info */}
            <div className="text-gray-400 text-sm text-center lg:text-left">
              <p className="mb-2">© {new Date().getFullYear()} Silver Age Monitoring. All rights reserved.</p>
              <p className="text-xs text-gray-500">
                Developed with ❤️ in Italy | Powered by Corezo Edge AI
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <span className="text-xs text-gray-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                GDPR Compliant
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                ISO 27001 Standard
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                CE Certified
              </span>
            </div>

            {/* Legal Links */}
            <div className="flex gap-4 text-xs text-gray-400">
              <button className="hover:text-white transition-colors duration-300">
                Privacy Policy
              </button>
              <span className="text-gray-600">|</span>
              <button className="hover:text-white transition-colors duration-300">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App
function App() {
  return (
    <div className="App">
      <Navigation />
      <StickyCTA />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <WhoItsFor />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;