import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Eye, Sparkles, Compass, Map, Users, BookOpen, Shield, Star, ArrowRight, Play, ChevronDown } from 'lucide-react';
import { getFeaturedSites, heritageSites } from '../data/heritageSites';

// ─── Animated Counter ────────────────────────────────────────────────────────
const AnimatedCounter: React.FC<{ end: number; suffix?: string; duration?: number }> = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <>{count.toLocaleString()}{suffix}</>;
};

// ─── Star Field Background ───────────────────────────────────────────────────
const StarField: React.FC = () => {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-gold/30 animate-pulse"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

// ─── Feature Card ────────────────────────────────────────────────────────────
const FeatureCard: React.FC<{ icon: React.ElementType; title: string; desc: string; color: string; delay: number }> = ({ icon: Icon, title, desc, color, delay }) => (
  <div
    className="heritage-card rounded-2xl p-6 hover:border-gold/30 transition-all duration-300 group"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <h3 className="font-serif font-bold text-lg mb-2 group-hover:text-gold transition-colors">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

// ─── Heritage Site Card (Landing) ────────────────────────────────────────────
const SiteCard: React.FC<{ site: ReturnType<typeof getFeaturedSites>[0]; index: number }> = ({ site, index }) => (
  <Link
    to={`/heritage/${site.slug}`}
    className="relative group overflow-hidden rounded-2xl heritage-card h-72 block"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-heritage-dark via-heritage-dark/30 to-transparent z-10 transition-opacity group-hover:opacity-90" />
    <img
      src={site.images[0] || 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80'}
      alt={site.name}
      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80'; }}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-x-0 bottom-0 z-20 p-5">
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-xs bg-gold/90 text-heritage-dark font-bold px-2 py-0.5 rounded-full">{site.category}</span>
        <div className="flex items-center space-x-1">
          <Star className="h-3 w-3 text-gold fill-gold" />
          <span className="text-xs text-gray-200">{site.rating}</span>
        </div>
      </div>
      <h3 className="font-serif font-bold text-xl text-white mb-1">{site.name}</h3>
      <div className="flex items-center text-gray-300 text-xs">
        <MapPin className="h-3 w-3 mr-1" />
        {site.location}
      </div>
    </div>
    <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="bg-gold text-heritage-dark rounded-full p-2">
        <ArrowRight className="h-4 w-4" />
      </div>
    </div>
  </Link>
);

// ─── Main Landing Page ────────────────────────────────────────────────────────
const LandingPage: React.FC = () => {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const featured = getFeaturedSites();

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    { icon: Sparkles, title: 'AI Heritage Guide', desc: 'Intelligent chatbot with deep heritage knowledge. Ask about history, architecture, and cultural significance.', color: 'from-gold/60 to-amber-600', delay: 0 },
    { icon: Eye, title: '360° Virtual Tours', desc: 'Immersive panoramic tours of heritage sites. Experience history from anywhere in the world.', color: 'from-purple-500 to-purple-700', delay: 100 },
    { icon: Compass, title: '3D Digital Twins', desc: 'Interactive 3D models of monuments using Three.js. Explore architectural layers and historical reconstructions.', color: 'from-blue-500 to-blue-700', delay: 200 },
    { icon: Map, title: 'Smart Heritage Map', desc: 'Real-time interactive map with nearby discovery, routing, and GPS-powered heritage exploration.', color: 'from-green-500 to-green-700', delay: 300 },
    { icon: Users, title: 'Community Stories', desc: 'Submit local legends, folk tales, and historical photographs. Preserve living heritage together.', color: 'from-orange-500 to-orange-700', delay: 400 },
    { icon: Shield, title: 'Digital Preservation', desc: 'Report heritage damage, track conservation status, and contribute to protecting our shared legacy.', color: 'from-red-500 to-red-700', delay: 500 },
  ];

  const stats = [
    { value: 500, suffix: '+', label: 'Heritage Sites' },
    { value: 50, suffix: 'M+', label: 'Annual Visitors' },
    { value: 10000, suffix: '+', label: 'Community Stories' },
    { value: 42, suffix: '', label: 'UNESCO Sites' },
  ];

  const journeySteps = [
    { step: '01', title: 'Discover', desc: 'Search and filter 500+ heritage sites across India', icon: MapPin },
    { step: '02', title: 'Explore', desc: 'Dive deep into historical timelines and cultural significance', icon: BookOpen },
    { step: '03', title: 'Experience', desc: 'Virtual tours, 3D models, and AR historical reconstructions', icon: Eye },
    { step: '04', title: 'Preserve', desc: 'Report issues and contribute to conservation efforts', icon: Shield },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1920&q=80"
            alt="Heritage Background"
            className="w-full h-full object-cover"
            onLoad={() => setHeroLoaded(true)}
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=80'; setHeroLoaded(true); }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-heritage-dark/80 via-heritage-dark/60 to-heritage-dark" />
          <div className="absolute inset-0 bg-gradient-to-r from-heritage-dark/40 via-transparent to-heritage-dark/40" />
        </div>

        {/* Star field */}
        <StarField />

        {/* Hero Content */}
        <div className={`relative z-20 text-center px-4 max-w-5xl mx-auto transition-all duration-1000 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-sm font-medium">India's #1 Digital Heritage Platform</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            <span className="text-white">Preserve the </span>
            <span className="text-gold">Past.</span>
            <br />
            <span className="text-white">Experience the </span>
            <span className="text-gold">Present.</span>
            <br />
            <span className="text-white">Inspire the </span>
            <span className="text-gold">Future.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Explore the world's cultural heritage through AI-powered storytelling,
            immersive virtual tours, 3D digital twins, and intelligent tourism.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/explore"
              className="group flex items-center justify-center space-x-2 bg-gold hover:bg-amber-500 text-heritage-dark font-bold text-lg px-8 py-4 rounded-2xl transition-all transform hover:scale-105 shadow-2xl shadow-gold/30"
            >
              <MapPin className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Explore Heritage</span>
            </Link>
            <Link
              to="/virtual-tour/1"
              className="group flex items-center justify-center space-x-2 glass border border-gold/30 hover:border-gold/60 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all hover:bg-white/10"
            >
              <Play className="h-5 w-5" />
              <span>Start Virtual Tour</span>
            </Link>
            <Link
              to="/ai-guide"
              className="group flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-gold/30 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all"
            >
              <Sparkles className="h-5 w-5 text-gold" />
              <span>AI Heritage Guide</span>
            </Link>
          </div>

          {/* Scroll hint */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 text-gray-500">
            <span className="text-xs">Scroll to explore</span>
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="bg-heritage-card border-y border-heritage-border py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(({ value, suffix, label }) => (
              <div key={label} className="group">
                <div className="text-3xl md:text-4xl font-bold text-gold mb-1">
                  <AnimatedCounter end={value} suffix={suffix} />
                </div>
                <div className="text-gray-400 text-sm font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY HERITAGEVERSE ─── */}
      <section className="py-24 bg-heritage-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Platform Features</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Why <span className="text-gold">HeritageVerse?</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              The most comprehensive digital heritage platform — combining AI, 3D visualization, immersive tourism, and community preservation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED HERITAGE SITES ─── */}
      <section className="py-24 bg-gradient-to-b from-heritage-dark to-heritage-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Curated Collection</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">
                Featured <span className="text-gold">Heritage</span>
              </h2>
              <p className="text-gray-400 mt-3 max-w-xl">
                Discover the timeless architectural wonders that define India's rich cultural tapestry.
              </p>
            </div>
            <Link to="/explore" className="flex items-center space-x-2 text-gold hover:text-gold-light font-medium group">
              <span>View all {heritageSites.length} sites</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((site, i) => (
              <SiteCard key={site.id} site={site} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── HERITAGE JOURNEY ─── */}
      <section className="py-24 bg-heritage-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">The Experience</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Your Heritage <span className="text-gold">Journey</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From discovery to preservation — a complete heritage experience.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {journeySteps.map(({ step, title, desc, icon: Icon }, i) => (
              <div key={step} className="relative group">
                {i < journeySteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-gradient-to-r from-gold/50 to-gold/10 z-0" />
                )}
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center mx-auto mb-4 group-hover:border-gold/60 group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-7 w-7 text-gold" />
                  </div>
                  <div className="text-gold text-xs font-bold mb-1">{step}</div>
                  <h3 className="font-serif font-bold text-lg mb-2">{title}</h3>
                  <p className="text-gray-400 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI SHOWCASE ─── */}
      <section className="py-24 bg-heritage-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Intelligent Guide</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                AI Heritage <span className="text-gold">Guide</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Our AI is trained on India's cultural heritage — ask about architectural styles, historical events, builders, cultural significance, and get expert-level answers in multiple languages.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'Who built the Taj Mahal and why?',
                  'Create a 4-hour heritage route in Agra',
                  'Compare Mughal and Dravidian architecture',
                  'Tell me the story of Hampi\'s fall',
                ].map(q => (
                  <div key={q} className="flex items-center space-x-3 p-3 bg-white/5 border border-heritage-border rounded-xl">
                    <Sparkles className="h-4 w-4 text-gold flex-shrink-0" />
                    <span className="text-sm text-gray-300">"{q}"</span>
                  </div>
                ))}
              </div>
              <Link to="/ai-guide" className="inline-flex items-center space-x-2 bg-gold hover:bg-amber-500 text-heritage-dark font-bold px-6 py-3 rounded-xl transition-all">
                <Sparkles className="h-5 w-5" />
                <span>Try Heritage AI</span>
              </Link>
            </div>
            <div className="relative">
              <div className="bg-heritage-card border border-heritage-border rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-heritage-border">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">Heritage AI</div>
                    <div className="text-xs text-green-400">● Online</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-gold text-heritage-dark rounded-xl rounded-br-sm px-4 py-2 text-sm max-w-[80%]">
                      Who built the Taj Mahal?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white/5 border border-heritage-border rounded-xl rounded-bl-sm px-4 py-3 text-sm max-w-[90%] text-gray-200">
                      The <strong className="text-white">Taj Mahal</strong> was commissioned by <strong className="text-white">Emperor Shah Jahan</strong> in 1632 CE as an eternal tribute to his beloved wife <strong className="text-white">Mumtaz Mahal</strong>.
                      <br /><br />
                      Over <strong className="text-white">20,000 artisans</strong> worked for 22 years to create this ivory-white marble masterpiece. The chief architect was <strong className="text-white">Ustad Ahmad Lahori</strong>.
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-gold text-heritage-dark rounded-xl rounded-br-sm px-4 py-2 text-sm max-w-[80%]">
                      Create a 2-hour tour of Agra
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pl-1">
                    <div className="flex space-x-1">
                      {[0, 150, 300].map(d => <div key={d} className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
                    </div>
                    <span className="text-xs text-gray-500">Heritage AI is typing...</span>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-heritage-card border border-gold/30 rounded-xl px-3 py-2 text-xs text-gold shadow-lg">
                🌐 6 Languages
              </div>
              <div className="absolute -bottom-4 -left-4 bg-heritage-card border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-purple-400 shadow-lg">
                🧠 RAG Architecture
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── IMPACT STATS ─── */}
      <section className="py-20 bg-heritage-card border-y border-heritage-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-gold mb-2">🏛️</div>
              <div className="text-3xl font-bold mb-1">42</div>
              <div className="text-gray-400">UNESCO World Heritage Sites in India</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">🎯</div>
              <div className="text-3xl font-bold mb-1">5,000+ years</div>
              <div className="text-gray-400">Of Indian Cultural Heritage</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">🌍</div>
              <div className="text-3xl font-bold mb-1">50M+</div>
              <div className="text-gray-400">Heritage Visitors Annually</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="py-24 bg-heritage-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-heritage-card/30 to-heritage-dark pointer-events-none" />
        <StarField />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">Begin Your Journey</div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Start Your <span className="text-gold">Heritage</span> Journey Today
          </h2>
          <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of explorers, students, and heritage enthusiasts discovering India's extraordinary cultural legacy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/auth/register" className="bg-gold hover:bg-amber-500 text-heritage-dark font-bold px-8 py-4 rounded-2xl transition-all transform hover:scale-105 shadow-2xl shadow-gold/30 text-lg">
              Join HeritageVerse Free
            </Link>
            <Link to="/explore" className="glass border border-gold/30 hover:border-gold/60 text-white font-bold px-8 py-4 rounded-2xl transition-all text-lg">
              Explore Without Signing Up
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-6">No credit card required • Free forever for basic access</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
