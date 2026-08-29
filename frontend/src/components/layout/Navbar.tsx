import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Map, Eye, MessageCircle, Users, Briefcase, Globe, Menu, X, User, LogOut, LayoutDashboard, Shield, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { language, setLanguage, languages, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/explore', label: t('nav.explore'), icon: Compass },
    { to: '/map', label: t('nav.map'), icon: Map },
    { to: '/virtual-tour/1', label: t('nav.virtualTour'), icon: Eye },
    { to: '/ai-guide', label: t('nav.aiGuide'), icon: MessageCircle },
    { to: '/community', label: t('nav.community'), icon: Users },
    { to: '/plan', label: t('nav.plan'), icon: Briefcase },
  ];

  const isActive = (to: string) => location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

  const currentLang = languages.find(l => l.code === language);

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || mobileOpen ? 'bg-heritage-card/95 backdrop-blur-xl border-b border-heritage-border shadow-lg shadow-black/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🏛️</span>
              <span className="text-xl font-serif font-bold">
                Heritage<span className="text-gold">Verse</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map(({ to, label }) => (
                <Link key={to} to={to}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive(to) ? 'text-gold bg-gold/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}>
                  {label}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-3">
              {/* Language Selector */}
              <div className="relative hidden md:block">
                <button onClick={() => setLangOpen(!langOpen)} className="flex items-center space-x-1 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                  <Globe className="h-4 w-4" />
                  <span className="text-xs font-medium">{currentLang?.code.toUpperCase()}</span>
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-2 w-44 bg-heritage-card border border-heritage-border rounded-xl shadow-xl overflow-hidden z-50">
                    {languages.map(lang => (
                      <button key={lang.code} onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-white/5 transition-colors ${language === lang.code ? 'text-gold' : 'text-gray-300'}`}>
                        <span>{lang.name}</span>
                        <span className="text-xs text-gray-500">{lang.nativeName}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* User Menu / Auth */}
              {isAuthenticated && user ? (
                <div className="relative">
                  <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-gold/20">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center text-heritage-dark text-sm font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden md:block text-left">
                      <div className="text-xs font-medium text-white truncate max-w-[100px]">{user.name}</div>
                      <div className="text-xs text-gold capitalize">{user.role}</div>
                    </div>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-heritage-card border border-heritage-border rounded-xl shadow-xl overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-heritage-border">
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-xs text-gray-400">{user.email}</div>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="h-3 w-3 text-gold" />
                          <span className="text-xs text-gold">{user.points} points</span>
                        </div>
                      </div>
                      <Link to="/profile" className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                        <User className="h-4 w-4" /> <span>My Profile</span>
                      </Link>
                      <Link to="/passport" className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                        <Shield className="h-4 w-4" /> <span>Heritage Passport</span>
                      </Link>
                      {(user.role === 'admin' || user.role === 'authority') && (
                        <Link to="/dashboard" className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gold hover:bg-gold/5 transition-colors">
                          <LayoutDashboard className="h-4 w-4" /> <span>Dashboard</span>
                        </Link>
                      )}
                      <div className="border-t border-heritage-border mt-1">
                        <button onClick={() => { logout(); setUserMenuOpen(false); }}
                          className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-400/5 transition-colors">
                          <LogOut className="h-4 w-4" /> <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Link to="/auth/login" className="text-sm text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-all">
                    Sign In
                  </Link>
                  <Link to="/auth/register" className="text-sm bg-gold hover:bg-amber-500 text-heritage-dark font-bold px-4 py-2 rounded-lg transition-all">
                    Join Free
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-heritage-card border-t border-heritage-border">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link key={to} to={to}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive(to) ? 'text-gold bg-gold/10' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}>
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              ))}
              <div className="pt-3 border-t border-heritage-border flex flex-col space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-300">
                      <User className="h-4 w-4" /> <span>Profile ({user?.name})</span>
                    </Link>
                    <button onClick={logout} className="flex items-center space-x-3 px-4 py-2 text-sm text-red-400">
                      <LogOut className="h-4 w-4" /> <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/auth/login" className="text-center py-2 text-gray-300 border border-heritage-border rounded-xl text-sm">Sign In</Link>
                    <Link to="/auth/register" className="text-center py-2 bg-gold text-heritage-dark font-bold rounded-xl text-sm">Join Free</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Overlay for menus */}
      {(userMenuOpen || langOpen) && (
        <div className="fixed inset-0 z-40" onClick={() => { setUserMenuOpen(false); setLangOpen(false); }} />
      )}
    </>
  );
};

export default Navbar;
