import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Globe, Github, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const sections = [
    {
      title: 'Explore',
      links: [
        { to: '/explore', label: 'Heritage Sites' },
        { to: '/map', label: 'Interactive Map' },
        { to: '/virtual-tour/1', label: 'Virtual Tours' },
        { to: '/3d-viewer/1', label: '3D Digital Twins' },
        { to: '/ar-experience/1', label: 'AR Experience' },
      ],
    },
    {
      title: 'Discover',
      links: [
        { to: '/ai-guide', label: 'AI Heritage Guide' },
        { to: '/plan', label: 'Trip Planner' },
        { to: '/passport', label: 'Heritage Passport' },
        { to: '/community', label: 'Community Stories' },
        { to: '/preservation', label: 'Preservation Reports' },
      ],
    },
    {
      title: 'Account',
      links: [
        { to: '/auth/register', label: 'Join Free' },
        { to: '/auth/login', label: 'Sign In' },
        { to: '/profile', label: 'My Profile' },
        { to: '/dashboard', label: 'Admin Dashboard' },
      ],
    },
  ];

  return (
    <footer className="bg-heritage-card border-t border-heritage-border pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🏛️</span>
              <span className="text-xl font-serif font-bold">
                Heritage<span className="text-gold">Verse</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-xs">
              Preserving India's extraordinary cultural legacy through AI-powered storytelling, 
              immersive virtual tours, and intelligent heritage tourism.
            </p>
            <div className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
              <MapPin className="h-4 w-4 text-gold" />
              <span>Pan-India Heritage Platform</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <Mail className="h-4 w-4 text-gold" />
              <span>heritage@heritageverse.in</span>
            </div>
            {/* Social */}
            <div className="flex items-center space-x-3 mt-5">
              {[Twitter, Facebook, Instagram, Github].map((Icon, i) => (
                <button key={i} className="w-9 h-9 rounded-xl bg-white/5 hover:bg-gold/20 border border-heritage-border hover:border-gold/30 flex items-center justify-center transition-all group">
                  <Icon className="h-4 w-4 text-gray-400 group-hover:text-gold transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Link Sections */}
          {sections.map(section => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{section.title}</h3>
              <ul className="space-y-2.5">
                {section.links.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="text-sm text-gray-400 hover:text-gold transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-heritage-border pt-6 flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
          <div className="text-xs text-gray-500">
            © 2026 HeritageVerse. Built for cultural preservation and intelligent tourism.
          </div>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span className="flex items-center space-x-1">
              <Globe className="h-3 w-3 text-gold" />
              <span>EN | HI | TA | TE | KN | ML</span>
            </span>
            <span>•</span>
            <span>42 UNESCO Sites</span>
            <span>•</span>
            <span className="text-yellow-500">⚠️ Demo Mode</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-xl">
          <p className="text-xs text-gray-500 text-center">
            <strong className="text-yellow-500">Heritage Disclaimer:</strong> Historical information on this platform is provided for educational and tourism purposes. 
            Always verify against authoritative sources such as the Archaeological Survey of India (ASI), UNESCO, and academic publications.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
