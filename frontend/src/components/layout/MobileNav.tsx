import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Map, Shield, Users } from 'lucide-react';

const MobileNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/explore', icon: Compass, label: 'Explore' },
    { to: '/map', icon: Map, label: 'Map' },
    { to: '/passport', icon: Shield, label: 'Passport' },
    { to: '/community', icon: Users, label: 'Community' },
  ];

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-heritage-card/95 backdrop-blur-xl border-t border-heritage-border safe-area-inset-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-xl transition-all ${
              isActive(to)
                ? 'text-gold'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <Icon className={`h-5 w-5 ${isActive(to) ? 'scale-110' : ''} transition-transform`} />
            <span className="text-xs font-medium">{label}</span>
            {isActive(to) && (
              <div className="w-1 h-1 rounded-full bg-gold" />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
