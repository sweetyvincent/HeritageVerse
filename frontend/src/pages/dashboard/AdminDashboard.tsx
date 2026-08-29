import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart2, Users, MapPin, FileText, BookOpen, Settings, LogOut, 
  TrendingUp, AlertTriangle, Eye, Star, Globe, CheckCircle, Clock, X
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { heritageSites } from '../../data/heritageSites';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const visitorData = [
  { month: 'Jan', visitors: 42000 },
  { month: 'Feb', visitors: 38000 },
  { month: 'Mar', visitors: 55000 },
  { month: 'Apr', visitors: 48000 },
  { month: 'May', visitors: 62000 },
  { month: 'Jun', visitors: 71000 },
  { month: 'Jul', visitors: 65000 },
  { month: 'Aug', visitors: 80000 },
  { month: 'Sep', visitors: 74000 },
  { month: 'Oct', visitors: 92000 },
  { month: 'Nov', visitors: 88000 },
  { month: 'Dec', visitors: 95000 },
];

const topSites = [
  { name: 'Taj Mahal', visitors: 8000000 },
  { name: 'Mysore Palace', visitors: 6000000 },
  { name: 'Red Fort', visitors: 3500000 },
  { name: 'Brihadeeswarar', visitors: 2000000 },
  { name: 'Mahabalipuram', visitors: 1200000 },
];

const categoryData = [
  { name: 'Temples', value: 35, color: '#D4A017' },
  { name: 'Forts', value: 20, color: '#F59E0B' },
  { name: 'Caves', value: 15, color: '#92701F' },
  { name: 'Palaces', value: 15, color: '#C8B88A' },
  { name: 'Monuments', value: 15, color: '#E5C87A' },
];

const STATS = [
  { label: 'Heritage Sites', value: '10', change: '+2 this month', icon: MapPin, color: 'text-gold', bg: 'bg-gold/10' },
  { label: 'Total Visitors', value: '8.2M', change: '+12% vs last year', icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { label: 'Virtual Tour Views', value: '124K', change: '+28% this month', icon: Eye, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { label: 'AI Interactions', value: '45.6K', change: '+67% this month', icon: Star, color: 'text-green-400', bg: 'bg-green-400/10' },
  { label: 'Community Stories', value: '287', change: '+23 pending review', icon: BookOpen, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { label: 'Preservation Reports', value: '142', change: '18 critical', icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-400/10' },
  { label: 'Active Users', value: '3.4K', change: 'Today', icon: TrendingUp, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  { label: 'Languages Supported', value: '6', change: 'EN, HI, TA, TE, KN, ML', icon: Globe, color: 'text-pink-400', bg: 'bg-pink-400/10' },
];

const recentReports = [
  { site: 'Hampi', issue: 'Vandalism on eastern gateway wall', severity: 'High', status: 'Under Review', date: '2026-08-28' },
  { site: 'Ajanta Caves', issue: 'Water seepage in Cave 17', severity: 'Critical', status: 'Assigned', date: '2026-08-27' },
  { site: 'Konark Sun Temple', issue: 'Erosion on carved wheels', severity: 'Medium', status: 'Pending', date: '2026-08-25' },
  { site: 'Sanchi Stupa', issue: 'Vegetation overgrowth near torana', severity: 'Low', status: 'Resolved', date: '2026-08-20' },
];

const recentContributions = [
  { title: 'Legend of the Flying Chariot at Hampi', author: 'Kavya R.', category: 'Folk Tales', status: 'Pending', date: '2026-08-28' },
  { title: 'My Grandmother\'s Memories of Ajanta', author: 'Arjun S.', category: 'Oral History', status: 'Approved', date: '2026-08-27' },
  { title: 'Traditional Pottery of Karnataka', author: 'Priya K.', category: 'Crafts', status: 'Pending', date: '2026-08-26' },
];

const NavItem: React.FC<{ to: string; icon: React.ElementType; label: string; active?: boolean }> = ({ to, icon: Icon, label, active }) => (
  <Link to={to} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-gold/20 text-gold border border-gold/30' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
    <Icon className="h-5 w-5" />
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const severityColor = (s: string) => {
    switch (s) {
      case 'Critical': return 'text-red-400 bg-red-400/10';
      case 'High': return 'text-orange-400 bg-orange-400/10';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-green-400 bg-green-400/10';
    }
  };

  const statusColor = (s: string) => {
    switch (s) {
      case 'Resolved': return 'text-green-400';
      case 'Assigned': return 'text-blue-400';
      case 'Under Review': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden lg:flex flex-col w-64 bg-heritage-card border-r border-heritage-border flex-shrink-0">
        <div className="p-6 border-b border-heritage-border">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl">🏛️</span>
            <span className="font-serif font-bold">Heritage<span className="text-gold">Verse</span></span>
          </Link>
          <div className="mt-2 text-xs text-gray-400">Admin Dashboard</div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavItem to="/dashboard" icon={BarChart2} label="Overview" active={location.pathname === '/dashboard'} />
          <NavItem to="/dashboard/sites" icon={MapPin} label="Heritage Sites" active={location.pathname === '/dashboard/sites'} />
          <NavItem to="/dashboard/users" icon={Users} label="Users" active={location.pathname === '/dashboard/users'} />
          <NavItem to="/dashboard/reports" icon={AlertTriangle} label="Reports" active={location.pathname === '/dashboard/reports'} />
          <NavItem to="/community" icon={BookOpen} label="Community" />
          <NavItem to="/preservation" icon={FileText} label="Preservation" />
          <NavItem to="/" icon={Eye} label="View Site" />
        </nav>

        <div className="p-4 border-t border-heritage-border">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">
              {user?.name?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user?.name}</div>
              <div className="text-xs text-gray-400 capitalize">{user?.role}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center space-x-2 text-gray-400 hover:text-red-400 text-sm transition-colors px-2 py-1">
            <LogOut className="h-4 w-4" /> <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-serif font-bold">Dashboard Overview</h1>
              <p className="text-gray-400 text-sm mt-1">Welcome back, {user?.name}. Here's what's happening today.</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-400">Last updated: {new Date().toLocaleTimeString()}</span>
              <button onClick={() => toast.success('Data refreshed')} className="bg-gold/10 border border-gold/30 text-gold px-4 py-2 rounded-lg text-sm hover:bg-gold/20 transition-all">
                Refresh
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {STATS.map(({ label, value, change, icon: Icon, color, bg }) => (
              <div key={label} className="heritage-card rounded-xl p-5">
                <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div className="text-2xl font-bold mb-1">{value}</div>
                <div className="text-sm text-gray-500 mb-1">{label}</div>
                <div className="text-xs text-gray-400">{change}</div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Visitor Trend */}
            <div className="lg:col-span-2 heritage-card rounded-xl p-6">
              <h3 className="font-serif text-lg font-bold mb-4">Visitor Trends (2026)</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={visitorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2E" />
                  <XAxis dataKey="month" stroke="#666" tick={{ fill: '#666', fontSize: 12 }} />
                  <YAxis stroke="#666" tick={{ fill: '#666', fontSize: 12 }} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                  <Tooltip
                    contentStyle={{ background: '#12121A', border: '1px solid #1E1E2E', borderRadius: 8 }}
                    labelStyle={{ color: '#E8E8F0' }}
                    formatter={(v: number) => [`${(v/1000).toFixed(0)}K visitors`, 'Visitors']}
                  />
                  <Line type="monotone" dataKey="visitors" stroke="#D4A017" strokeWidth={2} dot={{ fill: '#D4A017', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Category Distribution */}
            <div className="heritage-card rounded-xl p-6">
              <h3 className="font-serif text-lg font-bold mb-4">Site Categories</h3>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#12121A', border: '1px solid #1E1E2E', borderRadius: 8 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 space-y-1">
                {categoryData.map(d => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                      <span className="text-gray-400">{d.name}</span>
                    </div>
                    <span className="text-gray-300">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Most Visited Sites */}
          <div className="heritage-card rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-bold">Most Visited Sites</h3>
              <Link to="/dashboard/sites" className="text-gold text-sm hover:text-gold-light">View all →</Link>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={topSites} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2E" horizontal={false} />
                <XAxis type="number" stroke="#666" tick={{ fill: '#666', fontSize: 11 }} tickFormatter={v => `${(v/1000000).toFixed(1)}M`} />
                <YAxis type="category" dataKey="name" stroke="#666" tick={{ fill: '#ccc', fontSize: 11 }} width={120} />
                <Tooltip contentStyle={{ background: '#12121A', border: '1px solid #1E1E2E', borderRadius: 8 }}
                  formatter={(v: number) => [`${v.toLocaleString()} visitors`]} />
                <Bar dataKey="visitors" fill="#D4A017" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Bottom Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Preservation Reports */}
            <div className="heritage-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg font-bold">Recent Reports</h3>
                <Link to="/dashboard/reports" className="text-gold text-sm hover:text-gold-light">View all →</Link>
              </div>
              <div className="space-y-3">
                {recentReports.map((r, i) => (
                  <div key={i} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{r.site}</div>
                      <div className="text-xs text-gray-400 truncate">{r.issue}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${severityColor(r.severity)}`}>{r.severity}</span>
                        <span className={`text-xs ${statusColor(r.status)}`}>{r.status}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 flex-shrink-0">{r.date}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Community Contributions */}
            <div className="heritage-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg font-bold">Community Stories</h3>
                <Link to="/community" className="text-gold text-sm hover:text-gold-light">View all →</Link>
              </div>
              <div className="space-y-3">
                {recentContributions.map((c, i) => (
                  <div key={i} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{c.title}</div>
                      <div className="text-xs text-gray-400">{c.author} • {c.category}</div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span className={`text-xs ${c.status === 'Approved' ? 'text-green-400' : 'text-yellow-400'}`}>{c.status}</span>
                      {c.status === 'Pending' && (
                        <div className="flex space-x-1">
                          <button onClick={() => toast.success('Story approved!')} className="text-xs bg-green-400/10 text-green-400 px-2 py-0.5 rounded">
                            Approve
                          </button>
                          <button onClick={() => toast.error('Story rejected')} className="text-xs bg-red-400/10 text-red-400 px-2 py-0.5 rounded">
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
