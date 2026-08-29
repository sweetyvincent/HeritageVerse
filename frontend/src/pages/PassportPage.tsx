import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Trophy, Star, MapPin, Shield, Target, Users, ChevronRight, Plus, X, Check } from 'lucide-react';
import { heritageSites } from '../data/heritageSites';
import toast from 'react-hot-toast';

const BADGES = [
  { id: 'newcomer', name: 'Newcomer', icon: '⭐', desc: 'Joined HeritageVerse', earned: true, points: 50 },
  { id: 'explorer', name: 'Heritage Explorer', icon: '🗺️', desc: 'Visited your first site', earned: true, points: 100 },
  { id: 'history_lover', name: 'History Lover', icon: '📚', desc: 'Read 5 historical timelines', earned: true, points: 150 },
  { id: 'monument_hunter', name: 'Monument Hunter', icon: '🏯', desc: 'Visit 5 forts', earned: false, points: 300 },
  { id: 'cultural_ambassador', name: 'Cultural Ambassador', icon: '🌍', desc: 'Submit a community story', earned: false, points: 250 },
  { id: 'guardian', name: 'Preservation Guardian', icon: '🛡️', desc: 'Submit a preservation report', earned: false, points: 300 },
  { id: 'UNESCO_champ', name: 'UNESCO Champion', icon: '🏆', desc: 'Visit 5 UNESCO sites', earned: false, points: 500 },
  { id: 'ancient_wanderer', name: 'Ancient Wanderer', icon: '⚗️', desc: 'Visit 10 heritage sites', earned: false, points: 750 },
  { id: 'mughal_admirer', name: 'Mughal Admirer', icon: '🕌', desc: 'Visit Taj Mahal & Red Fort', earned: false, points: 400 },
  { id: 'south_specialist', name: 'South India Specialist', icon: '🛕', desc: 'Visit 3 South Indian sites', earned: false, points: 400 },
];

const CHALLENGES = [
  { id: 'c1', name: 'Visit 5 Heritage Sites', progress: 2, total: 5, reward: 500, category: 'Exploration' },
  { id: 'c2', name: 'Complete the Mughal Heritage Trail', progress: 1, total: 3, reward: 300, category: 'Trail' },
  { id: 'c3', name: 'Learn 10 Architectural Terms', progress: 4, total: 10, reward: 200, category: 'Learning' },
];

const LEADERBOARD = [
  { rank: 1, name: 'Dr. Priya Nair', points: 12450, role: 'Heritage Authority' },
  { rank: 2, name: 'Aryan Kapoor', points: 9820, role: 'Researcher' },
  { rank: 3, name: 'Meera Reddy', points: 7650, role: 'Student' },
  { rank: 4, name: 'Ravi Kumar', points: 5430, role: 'Tourist' },
  { rank: 5, name: 'Sanya Patel', points: 4100, role: 'Contributor' },
];

const visitedIds = ['1', '2', '3']; // mock: first 3 sites visited

const PassportPage: React.FC = () => {
  const { user, isAuthenticated, updateUser } = useAuth();
  const [logVisitOpen, setLogVisitOpen] = useState(false);
  const [selectedSiteId, setSelectedSiteId] = useState('');

  const points = user?.points || 450;
  const level = points < 500 ? 'Heritage Explorer' : points < 2000 ? 'Historian' : points < 5000 ? 'Heritage Master' : 'Heritage Legend';
  const nextLevelPoints = points < 500 ? 500 : points < 2000 ? 2000 : 5000;
  const progress = Math.min((points / nextLevelPoints) * 100, 100);

  const levelIcon = points < 500 ? '🗺️' : points < 2000 ? '📜' : points < 5000 ? '🏛️' : '👑';

  const logVisit = () => {
    if (!selectedSiteId) { toast.error('Please select a site'); return; }
    const site = heritageSites.find(s => s.id === selectedSiteId);
    if (site) {
      updateUser({ points: (user?.points || 0) + 50 });
      toast.success(`✅ Visit to ${site.name} logged! +50 points`);
      setLogVisitOpen(false);
      setSelectedSiteId('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="text-6xl mb-4">🏛️</div>
          <h2 className="text-2xl font-serif font-bold mb-4">Sign In Required</h2>
          <p className="text-gray-400 mb-6">Your Heritage Passport requires an account.</p>
          <Link to="/auth/login" className="bg-gold text-heritage-dark font-bold px-6 py-3 rounded-xl">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-heritage-dark pt-20 pb-24 md:pb-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Passport Header */}
        <div className="relative bg-gradient-to-br from-heritage-card via-[#1a1505] to-heritage-card border border-gold/30 rounded-3xl p-8 mb-8 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-amber-300 to-gold" />
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #D4A017 0, #D4A017 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px'
          }} />

          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gold to-amber-700 flex items-center justify-center text-4xl border-2 border-gold/50 shadow-2xl shadow-gold/30">
                {levelIcon}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gold text-heritage-dark flex items-center justify-center text-xs font-bold border-2 border-heritage-card">
                {BADGES.filter(b => b.earned).length}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="text-xs text-gold/60 uppercase tracking-widest mb-1">Heritage Passport</div>
              <h1 className="text-3xl font-serif font-bold mb-1">{user?.name}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm text-gold font-medium">{level}</span>
                <span className="text-gray-600">•</span>
                <span className="text-sm text-gray-400 capitalize">{user?.role}</span>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Level Progress</span>
                  <span className="text-gold font-medium">{points} / {nextLevelPoints} pts</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-gold to-amber-400 rounded-full transition-all duration-1000"
                    style={{ width: `${progress}%` }} />
                </div>
                <div className="text-xs text-gray-500 mt-1">Next: {points < 500 ? 'Historian' : points < 2000 ? 'Heritage Master' : 'Heritage Legend'}</div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Points', value: points.toLocaleString(), icon: Star },
                { label: 'Sites Visited', value: visitedIds.length, icon: MapPin },
                { label: 'Badges', value: BADGES.filter(b => b.earned).length, icon: Trophy },
                { label: 'Challenges', value: CHALLENGES.length, icon: Target },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-black/30 rounded-xl p-3 text-center border border-white/5">
                  <Icon className="h-4 w-4 text-gold mx-auto mb-1" />
                  <div className="text-xl font-bold">{value}</div>
                  <div className="text-xs text-gray-400">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Badges */}
            <div className="heritage-card rounded-2xl p-6">
              <h2 className="text-xl font-serif font-bold mb-5 flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-gold" /> <span>Badges & Achievements</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {BADGES.map(badge => (
                  <div key={badge.id}
                    className={`p-4 rounded-xl border text-center transition-all ${badge.earned ? 'border-gold/30 bg-gold/5 hover:border-gold/50' : 'border-heritage-border bg-white/5 opacity-50'}`}>
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <div className="text-sm font-bold mb-1">{badge.name}</div>
                    <div className="text-xs text-gray-400 mb-2">{badge.desc}</div>
                    <div className={`text-xs font-medium ${badge.earned ? 'text-gold' : 'text-gray-500'}`}>
                      {badge.earned ? '✓ Earned' : `+${badge.points} pts`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Challenges */}
            <div className="heritage-card rounded-2xl p-6">
              <h2 className="text-xl font-serif font-bold mb-5 flex items-center space-x-2">
                <Target className="h-5 w-5 text-gold" /> <span>Active Challenges</span>
              </h2>
              <div className="space-y-4">
                {CHALLENGES.map(c => (
                  <div key={c.id} className="p-4 bg-white/5 border border-heritage-border rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-sm font-medium">{c.name}</div>
                        <div className="text-xs text-gray-400">{c.category} Challenge</div>
                      </div>
                      <div className="text-right">
                        <div className="text-gold text-sm font-bold">+{c.reward} pts</div>
                        <div className="text-xs text-gray-400">{c.progress}/{c.total}</div>
                      </div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gold to-amber-400 rounded-full transition-all"
                        style={{ width: `${(c.progress / c.total) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visited Sites */}
            <div className="heritage-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-serif font-bold flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-gold" /> <span>Sites Visited</span>
                </h2>
                <button onClick={() => setLogVisitOpen(true)}
                  className="flex items-center space-x-1.5 text-xs bg-gold/10 text-gold border border-gold/30 px-3 py-1.5 rounded-lg hover:bg-gold/20 transition-all">
                  <Plus className="h-3 w-3" /> <span>Log Visit</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {heritageSites.filter(s => visitedIds.includes(s.id)).map(site => (
                  <Link key={site.id} to={`/heritage/${site.slug}`}
                    className="relative rounded-xl overflow-hidden h-32 group block border border-gold/20">
                    <img src={site.images[0]} alt={site.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="text-xs font-bold text-white truncate">{site.name}</div>
                      <div className="text-xs text-gold flex items-center"><Check className="h-3 w-3 mr-1" />Visited</div>
                    </div>
                    {/* Stamp */}
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full border-2 border-gold/60 flex items-center justify-center bg-black/50">
                      <span className="text-xs">✓</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Leaderboard */}
          <div className="space-y-6">
            <div className="heritage-card rounded-2xl p-6">
              <h2 className="text-xl font-serif font-bold mb-5 flex items-center space-x-2">
                <Users className="h-5 w-5 text-gold" /> <span>Leaderboard</span>
              </h2>
              <div className="space-y-3">
                {LEADERBOARD.map(({ rank, name, points: pts, role }) => (
                  <div key={rank} className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${rank === 1 ? 'bg-gold/10 border border-gold/30' : 'bg-white/5'}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${rank === 1 ? 'bg-gold text-heritage-dark' : rank === 2 ? 'bg-gray-400/20 text-gray-300' : rank === 3 ? 'bg-amber-700/20 text-amber-600' : 'bg-white/5 text-gray-400'}`}>
                      {rank === 1 ? '👑' : rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{name}</div>
                      <div className="text-xs text-gray-400 capitalize">{role}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold text-gold">{pts.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">pts</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <div className="text-xs text-blue-400 text-center">Your Rank: #47 • {points} pts</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="heritage-card rounded-2xl p-5">
              <h3 className="font-serif font-bold mb-4">Earn More Points</h3>
              <div className="space-y-2">
                {[
                  { action: 'Visit a Heritage Site', pts: '+50', link: '/explore' },
                  { action: 'Complete Virtual Tour', pts: '+30', link: '/virtual-tour/1' },
                  { action: 'Submit Community Story', pts: '+100', link: '/community/submit' },
                  { action: 'Report Preservation Issue', pts: '+75', link: '/preservation' },
                  { action: 'Ask Heritage AI', pts: '+10', link: '/ai-guide' },
                ].map(({ action, pts, link }) => (
                  <Link key={action} to={link}
                    className="flex items-center justify-between p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-heritage-border hover:border-gold/20 transition-all group">
                    <span className="text-sm text-gray-300 group-hover:text-white">{action}</span>
                    <span className="text-xs text-gold font-bold">{pts}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Log Visit Modal */}
      {logVisitOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-heritage-card border border-heritage-border rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif font-bold text-lg">Log a Heritage Visit</h3>
              <button onClick={() => setLogVisitOpen(false)} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-5">
              <label className="block text-sm text-gray-400 mb-2">Select Heritage Site</label>
              <select value={selectedSiteId} onChange={e => setSelectedSiteId(e.target.value)}
                className="w-full bg-white/5 border border-heritage-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50">
                <option value="">Choose a site...</option>
                {heritageSites.map(s => (
                  <option key={s.id} value={s.id}>{s.name} — {s.location}</option>
                ))}
              </select>
            </div>
            <div className="flex space-x-3">
              <button onClick={() => setLogVisitOpen(false)} className="flex-1 border border-heritage-border text-gray-300 py-2.5 rounded-xl hover:border-white/20 transition-all">Cancel</button>
              <button onClick={logVisit} className="flex-1 bg-gold text-heritage-dark font-bold py-2.5 rounded-xl hover:bg-amber-500 transition-all">Log +50 pts</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassportPage;
