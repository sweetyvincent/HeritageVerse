import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Star, MapPin, Trophy, Clock, Shield, Settings, LogOut, Edit, Camera } from 'lucide-react';
import { heritageSites } from '../data/heritageSites';
import toast from 'react-hot-toast';

const ProfilePage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'visits' | 'achievements' | 'settings'>('overview');

  const handleLogout = () => {
    logout();
    toast.success('You have been signed out.');
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <User className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold mb-4">Sign In Required</h2>
          <p className="text-gray-400 mb-6">Please log in to view your profile.</p>
          <Link to="/auth/login" className="bg-gold text-heritage-dark font-bold px-6 py-3 rounded-xl">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const roleColors: Record<string, string> = {
    tourist: 'text-blue-400 bg-blue-400/10',
    student: 'text-green-400 bg-green-400/10',
    researcher: 'text-purple-400 bg-purple-400/10',
    contributor: 'text-orange-400 bg-orange-400/10',
    authority: 'text-red-400 bg-red-400/10',
    admin: 'text-gold bg-gold/10',
  };

  const visitedSites = heritageSites.slice(0, 3); // Mock: first 3 sites visited

  const stats = [
    { label: 'Heritage Points', value: user?.points || 0, icon: Star, color: 'text-gold' },
    { label: 'Sites Visited', value: visitedSites.length, icon: MapPin, color: 'text-blue-400' },
    { label: 'Badges Earned', value: user?.badges.length || 0, icon: Trophy, color: 'text-purple-400' },
    { label: 'Days Active', value: 47, icon: Clock, color: 'text-green-400' },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-4">
        {/* Profile Header */}
        <div className="heritage-card rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-heritage-dark text-3xl font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-heritage-card border border-heritage-border rounded-full flex items-center justify-center hover:border-gold/50 transition-colors">
                <Camera className="h-4 w-4 text-gray-400" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-serif font-bold">{user?.name}</h1>
              <p className="text-gray-400 mb-2">{user?.email}</p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${roleColors[user?.role || 'tourist']}`}>
                <Shield className="h-3 w-3 mr-1" />
                {user?.role?.replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </span>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              {(user?.role === 'admin' || user?.role === 'authority') && (
                <Link to="/dashboard" className="flex items-center space-x-2 bg-gold/10 hover:bg-gold/20 border border-gold/30 text-gold px-4 py-2 rounded-lg transition-all text-sm font-medium">
                  <Settings className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              )}
              <button onClick={handleLogout} className="flex items-center space-x-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg transition-all text-sm font-medium">
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white/5 rounded-xl p-4 text-center">
                <Icon className={`h-6 w-6 ${color} mx-auto mb-2`} />
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-xs text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-white/5 rounded-xl p-1">
          {(['overview', 'visits', 'achievements', 'settings'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-gold text-heritage-dark' : 'text-gray-400 hover:text-white'}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="heritage-card rounded-xl p-6">
              <h3 className="font-serif text-xl font-bold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: 'Visited Taj Mahal', time: '2 days ago', icon: '🏛️' },
                  { action: 'Earned "Heritage Explorer" badge', time: '3 days ago', icon: '🏆' },
                  { action: 'Submitted a preservation report', time: '1 week ago', icon: '📋' },
                  { action: 'Completed Virtual Tour: Red Fort', time: '1 week ago', icon: '🎬' },
                  { action: 'Joined HeritageVerse', time: '2 weeks ago', icon: '✨' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{item.action}</div>
                      <div className="text-xs text-gray-400">{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="heritage-card rounded-xl p-6">
              <h3 className="font-serif text-xl font-bold mb-4">Heritage Level</h3>
              <div className="text-center py-4">
                <div className="text-6xl mb-3">🏛️</div>
                <div className="text-2xl font-bold text-gold mb-1">Heritage Explorer</div>
                <div className="text-gray-400 text-sm mb-4">{user?.points || 0} / 500 points to next level</div>
                <div className="w-full bg-white/10 rounded-full h-3">
                  <div className="bg-gradient-to-r from-gold to-gold-light h-3 rounded-full" style={{ width: `${Math.min(((user?.points || 0) / 500) * 100, 100)}%` }} />
                </div>
                <div className="text-xs text-gray-500 mt-2">Next: Historian (500 points)</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'visits' && (
          <div className="heritage-card rounded-xl p-6">
            <h3 className="font-serif text-xl font-bold mb-6">Visited Heritage Sites</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {visitedSites.map(site => (
                <Link key={site.id} to={`/heritage/${site.slug}`}
                  className="bg-white/5 hover:bg-white/10 rounded-xl overflow-hidden transition-all border border-heritage-border hover:border-gold/30">
                  <img src={site.images[0]} alt={site.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <div className="font-bold mb-1">{site.name}</div>
                    <div className="text-sm text-gray-400 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" /> {site.location}
                    </div>
                    <div className="text-xs text-green-400 mt-2">✓ Visited</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="heritage-card rounded-xl p-6">
            <h3 className="font-serif text-xl font-bold mb-6">Badges & Achievements</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Heritage Explorer', icon: '🗺️', earned: true, desc: 'Visit your first heritage site' },
                { name: 'History Lover', icon: '📚', earned: true, desc: 'Read 5 historical timelines' },
                { name: 'Newcomer', icon: '⭐', earned: true, desc: 'Join HeritageVerse' },
                { name: 'Monument Hunter', icon: '🏯', earned: false, desc: 'Visit 5 different forts' },
                { name: 'Cultural Ambassador', icon: '🌍', earned: false, desc: 'Submit a community story' },
                { name: 'Preservation Guardian', icon: '🛡️', earned: false, desc: 'Submit a preservation report' },
                { name: 'UNESCO Champion', icon: '🏆', earned: false, desc: 'Visit 5 UNESCO sites' },
                { name: 'Ancient Wanderer', icon: '⚗️', earned: false, desc: 'Visit 10 heritage sites' },
              ].map((badge, i) => (
                <div key={i} className={`p-4 rounded-xl border text-center ${badge.earned ? 'border-gold/30 bg-gold/5' : 'border-heritage-border bg-white/5 opacity-50'}`}>
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <div className="text-sm font-bold mb-1">{badge.name}</div>
                  <div className="text-xs text-gray-400">{badge.desc}</div>
                  {badge.earned && <div className="text-xs text-gold mt-2">✓ Earned</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="heritage-card rounded-xl p-6">
            <h3 className="font-serif text-xl font-bold mb-6">Profile Settings</h3>
            <div className="space-y-4 max-w-lg">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Display Name</label>
                <input defaultValue={user?.name} className="w-full bg-white/5 border border-heritage-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold/50" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email</label>
                <input defaultValue={user?.email} type="email" className="w-full bg-white/5 border border-heritage-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold/50" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Preferred Language</label>
                <select className="w-full bg-white/5 border border-heritage-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold/50">
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="ta">Tamil</option>
                  <option value="te">Telugu</option>
                </select>
              </div>
              <button onClick={() => toast.success('Profile updated!')} className="bg-gold text-heritage-dark font-bold px-6 py-2 rounded-lg hover:bg-gold-light transition-all">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
