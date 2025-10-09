import React, { useState, useEffect } from 'react';
import { Heart, Shield, Brain, Bell, Home, Clock, Lock, Check, Star, ArrowRight, Phone, Mail, Menu, X, AlertTriangle, Camera, Wifi } from 'lucide-react';

// Scroll reveal hook
const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
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

// Navigation
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 group">
              <img
                src="/Logo-BozoLabs_edit.svg"
                alt="SAM Logo"
                className="h-12 w-auto transform group-hover:scale-105 transition-transform"
              />
              <div>
                <div className={`text-2xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>SAM</div>
                <div className={`text-xs ${isScrolled ? 'text-gray-500' : 'text-white/80'}`}>Silver Age Monitoring</div>
              </div>
            </button>

            <div className="hidden lg:flex items-center gap-8">
              {['Problem', 'Solution', 'How It Works', 'Pricing'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
                  className={`font-medium transition-colors ${
                    isScrolled ? 'text-gray-600 hover:text-blue-600' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => window.location.href = 'tel:0303754386'}
                className={`px-4 py-2 rounded-lg font-medium ${
                  isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
              >
                030 375 4386
              </button>
              <button
                onClick={() => scrollTo('pricing')}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Get Started
              </button>
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2">
              {isMobileMenuOpen ? <X className={isScrolled ? 'text-gray-900' : 'text-white'} /> : <Menu className={isScrolled ? 'text-gray-900' : 'text-white'} />}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-20 left-0 right-0 bg-white p-6 shadow-xl space-y-4">
            {['Problem', 'Solution', 'How It Works', 'Pricing'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

// Hero
const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="relative z-10 min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-gray-900">
                Finally Sleep
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  Through the Night
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Know your elderly loved ones are safe—without cameras, without invading their privacy, without constant worry.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  'AI-powered detects unusual activity and daily routine changes in real time.',
                  'Zero cameras - complete privacy with motion sensors only',
                  'Smart alerts only when something truly matters'
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  Start Your Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all"
                >
                  Watch Demo
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {[
                  { icon: Clock, value: '5min', label: 'Setup Time' },
                  { icon: Camera, value: '0', label: 'Cameras' },
                  { icon: Shield, value: '24/7', label: 'Monitoring' }
                ].map((stat, i) => (
                  <div key={i} className="text-center bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-3xl p-6 border border-gray-200 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-gray-900 font-bold">Maria's Home</div>
                      <div className="text-green-600 text-sm flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        All Systems Normal
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm">Today, 14:32</div>
                </div>

                <div className="space-y-3">
                  {[
                    { time: '07:30', activity: 'Morning Movement', status: 'completed', color: 'green' },
                    { time: '09:00', activity: 'Kitchen Activity', status: 'completed', color: 'green' },
                    { time: '12:30', activity: 'Bathroom Visit', status: 'completed', color: 'green' },
                    { time: '14:00', activity: 'Extended Inactivity', status: 'active', color: 'blue' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="text-gray-500 font-mono text-sm w-16">{item.time}</div>
                      <div className="flex-1 text-gray-900 font-medium">{item.activity}</div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.color === 'green' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {item.status === 'completed' ? '✓' : '○'}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-gray-900 font-semibold mb-1">AI Learning</div>
                      <div className="text-gray-600 text-sm">
                        Maria’s activity rhythm is consistent with her daily routine. 🌟
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-8 -right-8 w-64 h-64 bg-blue-200/40 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-purple-200/40 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Problem Section
const ProblemSection = () => {
  const [setRef, isVisible] = useScrollReveal(0.2);

  const problems = [
    {
      emoji: '😰',
      title: 'Constant Anxiety',
      description: 'You call 3-4 times daily. Every missed call triggers panic. Work suffers. Sleep suffers.',
      stat: '4.2 calls/day',
      color: 'red'
    },
    {
      emoji: '🎥',
      title: 'Privacy Concerns',
      description: 'Cameras feel invasive. Wearables get forgotten. They want independence, not surveillance.',
      stat: '89% refuse cameras',
      color: 'orange'
    },
    {
      emoji: '⏰',
      title: 'False Alarms',
      description: 'Motion sensors alert at 3 AM because they used the bathroom. Again. And again.',
      stat: '12 false alerts/month',
      color: 'yellow'
    },
    {
      emoji: '💸',
      title: 'Expensive Options',
      description: 'Professional monitoring: €200+/month. Care facility: €3,000+/month. Not sustainable.',
      stat: '€36,000/year',
      color: 'blue'
    }
  ];

  return (
    <section id="problem" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6" ref={setRef}>
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            You're Not Alone in
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
              This Struggle
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Over 2.3 million Italian families face this daily dilemma: How do you keep loved ones safe without invading their independence?
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`group relative bg-white p-6 rounded-3xl border-2 border-gray-200 hover:border-${problem.color}-300 hover:shadow-xl transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl mb-4">{problem.emoji}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{problem.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{problem.description}</p>
              <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-sm font-semibold text-gray-700">{problem.stat}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            What if there was a better way?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            A way to monitor safety without sacrificing dignity. To get alerts that matter without false alarms. To sleep soundly without guilt.
          </p>
          <button
            onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            Discover SAM
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

// Solution Section
const SolutionSection = () => {
  const [setRef, isVisible] = useScrollReveal(0.2);

  const features = [
    {
      icon: Shield,
      title: 'No Cameras Ever',
      description: 'Only motion sensors in each room. Detects movement patterns without seeing anything. Complete privacy, total dignity.',
      benefit: '100% privacy guaranteed'
    },
    {
      icon: Brain,
      title: 'AI Learns Their Routine',
      description: 'Over 2 weeks, SAM learns when they wake up, eat, take medication, and sleep. Knows what "normal" looks like for THEM.',
      benefit: 'Personalized patterns'
    },
    {
      icon: Bell,
      title: 'Smart Alerts Only',
      description: 'No alerts for normal bathroom trips at 3 AM. Only notifies when patterns break: missed meals, extended inactivity, unusual behavior.',
      benefit: '95% fewer false alarms'
    },
    {
      icon: Lock,
      title: 'Local AI Processing',
      description: 'All intelligence runs on a device in their home. No cloud uploads. No strangers viewing data. Their home stays their sanctuary.',
      benefit: 'Data never leaves home'
    }
  ];

  return (
    <section id="solution" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6" ref={setRef}>
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold mb-6">
            <Check className="w-4 h-4" />
            The SAM Solution
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Intelligence Without
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Intrusion
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            SAM doesn't watch your loved ones—it understands them. There's a profound difference.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-bl-full" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                  <Check className="w-4 h-4" />
                  {feature.benefit}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 border-2 border-blue-100">
          <h3 className="text-3xl font-bold text-center mb-12">A Typical Day with SAM</h3>
          <div className="space-y-6 max-w-4xl mx-auto">
            {[
              { time: '7:00 AM', event: 'Morning Movement Detected', status: 'Normal wake time', color: 'green' },
              { time: '7:30 AM', event: 'Kitchen Activity', status: 'Coffee routine detected', color: 'green' },
              { time: '9:00 AM', event: 'Bathroom Visit', status: 'Expected pattern', color: 'green' },
              { time: '12:30 PM', event: 'No Kitchen Activity', status: 'Checking...', color: 'yellow' },
              { time: '12:45 PM', event: 'Kitchen Activity Resumed', status: 'Lunch prepared, all good', color: 'green' },
              { time: '3:00 PM', event: 'Extended Inactivity', status: 'Nap time - normal', color: 'green' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-6 bg-white rounded-2xl p-6 shadow-md">
                <div className="text-2xl font-bold text-gray-400 w-32 font-mono">{item.time}</div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900 mb-1">{item.event}</div>
                  <div className="text-gray-600">{item.status}</div>
                </div>
                <div className={`px-4 py-2 rounded-full font-semibold text-sm ${
                  item.color === 'green' 
                    ? 'bg-green-100 text-green-700' 
                    : item.color === 'yellow'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {item.color === 'green' ? '✓' : item.color === 'yellow' ? '⚠' : '✕'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// How It Works
const HowItWorksSection = () => {
  const [setRef, isVisible] = useScrollReveal(0.2);

  const steps = [
    {
      number: '1',
      title: 'Quick Installation',
      description: 'We install small motion sensors in key rooms (living room, bedroom, bathroom, kitchen). No cameras. No wiring. Done in under 2 hours.',
      icon: Home,
      time: '2 hours'
    },
    {
      number: '2',
      title: 'Learning Period',
      description: 'SAM quietly observes for 2 weeks, learning daily routines: wake times, meal patterns, bathroom visits, activity levels.',
      icon: Brain,
      time: '14 days'
    },
    {
      number: '3',
      title: 'Intelligent Monitoring',
      description: 'AI continuously analyzes patterns and only alerts when something unusual happens: missed meals, extended inactivity.',
      icon: Bell,
      time: 'Ongoing'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6" ref={setRef}>
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold mb-6">
            <Wifi className="w-4 h-4" />
            Simple Setup, Powerful Protection
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            How SAM Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From installation to peace of mind in just 3 simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg z-10">
                {step.number}
              </div>
              <div className="bg-white p-8 pt-12 rounded-3xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all h-full">
                <step.icon className="w-12 h-12 text-blue-600 mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{step.description}</p>
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                  <Clock className="w-4 h-4" />
                  {step.time}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 z-0" />
              )}
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-6">See SAM in Action</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Watch a 2-minute video demo showing exactly how SAM protects your loved ones
          </p>
          <button
            onClick={() => alert('Demo video would play here')}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            Watch Demo Video
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

// Pricing Section
const PricingSection = () => {
  const [setRef, isVisible] = useScrollReveal(0.2);

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6" ref={setRef}>
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold mb-6">
            <Star className="w-4 h-4" />
            Simple, Transparent Pricing
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No hidden fees. No long-term contracts. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: 'Starter',
              price: '€49',
              period: '/month',
              description: 'Perfect for trying SAM',
              features: [
                '3 motion sensors',
                'Basic AI monitoring',
                'Email alerts',
                'Mobile app access',
                '30-day free trial',
                'Installation included'
              ],
              cta: 'Start Free Trial',
              popular: false
            },
            {
              name: 'Complete',
              price: '€89',
              period: '/month',
              description: 'Most popular choice',
              features: [
                '6 motion sensors',
                'Advanced AI with learning',
                'SMS + Email + Voice alerts',
                'Family sharing (5 members)',
                'Priority support',
                'Installation + training',
                'Alexa integration'
              ],
              cta: 'Get Started',
              popular: true
            },
            {
              name: 'Premium',
              price: '€149',
              period: '/month',
              description: 'Ultimate protection',
              features: [
                'Unlimited sensors',
                'Full AI capabilities',
                'All alert types',
                'Unlimited family access',
                '24/7 concierge support',
                'White-glove installation',
                'Alexa + Google Home',
                'Fall detection hardware'
              ],
              cta: 'Contact Sales',
              popular: false
            }
          ].map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-3xl border-2 p-8 transition-all duration-1000 ${
                plan.popular 
                  ? 'border-blue-600 shadow-2xl transform scale-105' 
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-xl'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => window.location.href = 'mailto:segreteria@atsweb.info?subject=SAM ' + plan.name + ' Plan'}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">All plans include:</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              '✓ 30-day money-back guarantee',
              '✓ Free installation',
              '✓ No long-term contract',
              '✓ Cancel anytime',
              '✓ Made in Italy',
              '✓ GDPR compliant'
            ].map((item, i) => (
              <span key={i} className="text-gray-700 font-medium">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  const [setRef, isVisible] = useScrollReveal(0.2);

  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center text-white" ref={setRef}>
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            Sleep Soundly Tonight
          </h2>
          <p className="text-2xl md:text-3xl mb-12 text-blue-100">
            Join 1,000+ families who found peace of mind with SAM
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <button
              onClick={() => window.location.href = 'mailto:segreteria@atsweb.info?subject=SAM Demo Request'}
              className="group bg-white text-blue-600 rounded-3xl p-8 hover:shadow-2xl transition-all hover:scale-105"
            >
              <Mail className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Request Demo</h3>
              <p className="text-gray-600 mb-4">See SAM in your home, no obligation</p>
              <div className="font-bold text-blue-600 group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                Get Free Demo <ArrowRight className="w-5 h-5" />
              </div>
            </button>

            <button
              onClick={() => window.location.href = 'tel:0303754386'}
              className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-3xl p-8 hover:bg-white/20 transition-all"
            >
              <Phone className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Call Expert</h3>
              <p className="text-blue-100 mb-4">Mon-Fri 9AM-6PM CET</p>
              <div className="font-bold group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                030 375 4386 <ArrowRight className="w-5 h-5" />
              </div>
            </button>
          </div>

          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <Check className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm">30-Day Free Trial</p>
              </div>
              <div>
                <Check className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm">No Contract</p>
              </div>
              <div>
                <Check className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm">Cancel Anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img
                src="/Logo-BozoLabs_edit.svg"
                alt="SAM Logo"
                className="h-16 w-auto"
              />
              <div>
                <div className="text-2xl font-bold">SAM</div>
                <div className="text-gray-400 text-sm">Silver Age Monitoring</div>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              AI-powered elder care monitoring that respects privacy and dignity.
            </p>
            <div className="flex items-center gap-4">
              <img
                src="/logo-ats.svg"
                alt="ATS Logo"
                className="h-12 opacity-70"
              />
              <div className="text-xs text-gray-500">
                In partnership with ATS Srl<br />
                Advanced Technology Solutions
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['Problem', 'Solution', 'How It Works', 'Pricing'].map((item) => (
                <button
                  key={item}
                  onClick={() => document.getElementById(item.toLowerCase().replace(' ', '-'))?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-400">
              <p>📞 030 375 4386</p>
              <p>✉️ segreteria@atsweb.info</p>
              <p>🏢 Via Sant'Orsola 64<br />Brescia, Italy</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © 2025 SAM - Silver Age Monitoring. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <button className="hover:text-white">Privacy Policy</button>
            <button className="hover:text-white">Terms</button>
            <span>🇮🇹 Made in Italy</span>
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
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;