import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getSiteBySlug, heritageSites } from '../data/heritageSites';
import {
  MapPin, Clock, Star, Eye, Compass, ArrowRight, ChevronLeft,
  Globe, Camera, Info, Plus, Share2, BookOpen, AlertTriangle,
  ChevronDown, ChevronUp, Zap, Users, Calendar, Landmark, Volume2, VolumeX, Play, Pause, Square, Sparkles
} from 'lucide-react';
import { voiceService } from '../services/voiceService';
import toast from 'react-hot-toast';

const HeritageDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const site = getSiteBySlug(slug || '');
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'architecture' | 'story' | 'nearby'>('overview');
  const [expandedTimeline, setExpandedTimeline] = useState<number | null>(null);
  const [storyMode, setStoryMode] = useState<'short' | 'detailed' | 'student' | 'tourist'>('tourist');
  const [isAddedToTrip, setIsAddedToTrip] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(0.95);

  const toggleVoiceGuide = (customText?: string) => {
    if (isSpeaking) {
      voiceService.stop();
      setIsSpeaking(false);
      toast('Voice guide paused', { icon: '🔇' });
    } else {
      const textToRead = customText || `${site?.name}. ${site?.shortDescription}. ${site?.fullDescription}`;
      voiceService.speak({
        text: textToRead,
        rate: playbackSpeed,
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false)
      });
      toast.success('Playing AI Voice Audio Guide 🎧');
    }
  };

  if (!site) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="text-6xl mb-4">🏛️</div>
          <h2 className="text-2xl font-serif font-bold mb-4">Site not found</h2>
          <p className="text-gray-400 mb-6">The heritage site you're looking for doesn't exist or has been moved.</p>
          <Link to="/explore" className="bg-gold text-heritage-dark font-bold px-6 py-3 rounded-xl">
            Explore All Sites
          </Link>
        </div>
      </div>
    );
  }

  const nearbySites = heritageSites
    .filter(s => s.id !== site.id && s.state === site.state)
    .slice(0, 3);

  const statusColor = {
    Excellent: 'text-green-400 bg-green-400/10 border-green-400/30',
    Good: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    Fair: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    Poor: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
    Critical: 'text-red-400 bg-red-400/10 border-red-400/30',
  }[site.preservationStatus] || 'text-gray-400 bg-gray-400/10 border-gray-400/30';

  const stories: Record<string, Record<string, string>> = {
    tourist: {
      text: `Welcome to ${site.name}! 

${site.name} is one of India's most spectacular heritage sites, nestled in ${site.location}. Dating back to the ${site.historicalPeriod}, this magnificent ${site.category.toLowerCase()} represents the pinnacle of ${site.architectureStyle.split('—')[0].trim()}.

${site.shortDescription}

What makes this place truly special is its ${site.culturalSignificance.split('.')[0]}. Every stone here tells a story of craftsmanship, devotion, and cultural identity that has endured centuries.

🎯 Pro Tip: ${site.bestTimeToVisit ? `Visit during ${site.bestTimeToVisit} for the best experience.` : 'Visit early morning to avoid crowds and catch the best light for photography.'}`,
    },
    short: {
      text: `${site.name} (${site.historicalPeriod}) — ${site.shortDescription} ${site.culturalSignificance.split('.')[0]}.`,
    },
    detailed: {
      text: `# ${site.name} — Complete Heritage Guide

## Overview
${site.fullDescription}

## Cultural Significance  
${site.culturalSignificance}

## Architectural Style
${site.architectureStyle}

## Preservation Status
Current Status: ${site.preservationStatus}
${site.preservationStatus === 'Fair' || site.preservationStatus === 'Poor' ? '⚠️ This site requires immediate conservation attention.' : '✅ This site is well-maintained and accessible.'}

## Visitor Information
${site.openingHours ? `Opening Hours: ${site.openingHours}` : ''}
${site.entryFee ? `Entry Fee: ${site.entryFee}` : ''}
${site.bestTimeToVisit ? `Best Time to Visit: ${site.bestTimeToVisit}` : ''}`,
    },
    student: {
      text: `📚 Learning About ${site.name}

Hey students! Let's explore ${site.name} together.

${site.name} was built during the ${site.historicalPeriod}. It's located in ${site.location}, ${site.country}.

WHY IS IT IMPORTANT?
${site.culturalSignificance.split('.')[0]}.

WHAT KIND OF BUILDING IS IT?
It's a ${site.category.toLowerCase()} built in the ${site.architectureStyle.split('—')[0].trim()} style.

FUN FACTS:
${site.facts.map((f, i) => `${i + 1}. ${f}`).join('\n')}

Think about it: How would you feel visiting a place that's over ${new Date().getFullYear() - parseInt(site.historicalPeriod.match(/\d{3,4}/)?.[0] || '1000')} years old?`,
    },
  };

  const handleAddToTrip = () => {
    setIsAddedToTrip(true);
    toast.success(`${site.name} added to your trip!`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    toast.success('Link copied to clipboard!');
  };

  const TABS = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'architecture', label: 'Architecture', icon: Landmark },
    { id: 'story', label: 'AI Story', icon: BookOpen },
    { id: 'nearby', label: 'Nearby', icon: MapPin },
  ] as const;

  return (
    <div className="min-h-screen bg-heritage-dark pb-24 md:pb-8">
      {/* Hero Image */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-heritage-dark/40 via-transparent to-heritage-dark z-10" />
        <img
          src={site.images[0] || 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1920&q=80'}
          alt={site.name}
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1920&q=80'; }}
          className="w-full h-full object-cover"
        />
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="absolute top-20 left-4 md:left-8 z-20 flex items-center space-x-2 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 transition-all text-sm">
          <ChevronLeft className="h-4 w-4" /> <span>Back</span>
        </button>
        {/* Share */}
        <button onClick={handleShare} className="absolute top-20 right-4 md:right-8 z-20 p-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 rounded-xl transition-all">
          <Share2 className="h-4 w-4" />
        </button>
        {/* Hero Text */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-gold/90 text-heritage-dark text-xs font-bold px-3 py-1 rounded-full">{site.category}</span>
              {site.tags.slice(0, 3).map(tag => (
                <span key={tag} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-3 leading-tight">{site.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
              <div className="flex items-center space-x-1.5">
                <MapPin className="h-4 w-4 text-gold" />
                <span>{site.location}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Clock className="h-4 w-4 text-gold" />
                <span>{site.historicalPeriod}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-gold fill-gold" />
                <span className="font-bold text-white">{site.rating}</span>
                <span className="text-gray-400">/ 5.0</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Users className="h-4 w-4 text-gold" />
                <span>{(site.visitorCount / 1000000).toFixed(1)}M visitors/year</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="sticky top-16 z-30 bg-heritage-dark/95 backdrop-blur-xl border-b border-heritage-border">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {site.model3D.available && (
              <Link to={`/3d-viewer/${site.id}`} className="flex-shrink-0 flex items-center space-x-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 text-sm font-medium px-4 py-2 rounded-xl transition-all">
                <Compass className="h-4 w-4" /> <span>Explore in 3D</span>
              </Link>
            )}
            {site.virtualTour.available && (
              <Link to={`/virtual-tour/${site.id}`} className="flex-shrink-0 flex items-center space-x-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-400 text-sm font-medium px-4 py-2 rounded-xl transition-all">
                <Eye className="h-4 w-4" /> <span>Virtual Tour</span>
              </Link>
            )}
            <Link to={`/ar-experience/${site.id}`} className="flex-shrink-0 flex items-center space-x-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 text-green-400 text-sm font-medium px-4 py-2 rounded-xl transition-all">
              <Camera className="h-4 w-4" /> <span>AR Experience</span>
            </Link>
            <button
              onClick={() => toggleVoiceGuide()}
              className={`flex-shrink-0 flex items-center space-x-2 text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-md ${
                isSpeaking
                  ? 'bg-red-500/20 border border-red-500/50 text-red-400 animate-pulse'
                  : 'bg-gold hover:bg-amber-500 text-heritage-dark shadow-gold/20'
              }`}
            >
              {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              <span>{isSpeaking ? 'Stop Audio Guide' : 'Listen Audio Guide'}</span>
            </button>
            <Link to="/ai-guide" className="flex-shrink-0 flex items-center space-x-2 bg-gold/10 hover:bg-gold/20 border border-gold/30 text-gold text-sm font-medium px-4 py-2 rounded-xl transition-all">
              <Zap className="h-4 w-4" /> <span>Ask AI</span>
            </Link>
            <a href={`https://maps.google.com/?q=${site.coordinates.lat},${site.coordinates.lng}`} target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-heritage-border text-gray-300 text-sm font-medium px-4 py-2 rounded-xl transition-all">
              <Globe className="h-4 w-4" /> <span>Directions</span>
            </a>
            <button onClick={handleAddToTrip}
              className={`flex-shrink-0 flex items-center space-x-2 text-sm font-medium px-4 py-2 rounded-xl transition-all ${isAddedToTrip ? 'bg-green-600/20 border border-green-500/30 text-green-400' : 'bg-white/5 hover:bg-white/10 border border-heritage-border text-gray-300'}`}>
              <Plus className="h-4 w-4" /> <span>{isAddedToTrip ? 'Added!' : 'Add to Trip'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        {/* Preservation Status Banner */}
        <div className={`flex items-center space-x-3 p-4 rounded-xl border mb-8 ${statusColor}`}>
          <AlertTriangle className="h-5 w-5 flex-shrink-0" />
          <div>
            <span className="font-medium">Preservation Status: {site.preservationStatus}</span>
            {site.preservationStatus === 'Fair' && <span className="text-xs ml-2 opacity-75">— Some conservation work needed</span>}
            {site.preservationStatus === 'Poor' && <span className="text-xs ml-2 opacity-75">— Urgent conservation required</span>}
          </div>
          <Link to="/preservation" className="ml-auto text-xs underline flex-shrink-0">Report Issue</Link>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-heritage-card border border-heritage-border rounded-xl p-1 mb-8 overflow-x-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === id ? 'bg-gold text-heritage-dark' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Historical Period', value: site.historicalPeriod, icon: '📜' },
                { label: 'Opening Hours', value: site.openingHours || 'Check locally', icon: '🕐' },
                { label: 'Entry Fee', value: site.entryFee || 'Free', icon: '🎟️' },
                { label: 'Best Time', value: site.bestTimeToVisit || 'Year-round', icon: '🌤️' },
              ].map(({ label, value, icon }) => (
                <div key={label} className="bg-heritage-card border border-heritage-border rounded-xl p-4">
                  <div className="text-2xl mb-2">{icon}</div>
                  <div className="text-xs text-gray-400 mb-1">{label}</div>
                  <div className="text-sm font-medium text-white">{value}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="heritage-card rounded-xl p-6">
              <h2 className="text-xl font-serif font-bold mb-4">About This Site</h2>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">{site.fullDescription}</div>
            </div>

            {/* Cultural Significance */}
            <div className="heritage-card rounded-xl p-6">
              <h2 className="text-xl font-serif font-bold mb-4 text-gold">Cultural Significance</h2>
              <p className="text-gray-300 leading-relaxed">{site.culturalSignificance}</p>
            </div>

            {/* Interesting Facts */}
            <div className="heritage-card rounded-xl p-6">
              <h2 className="text-xl font-serif font-bold mb-4">Fascinating Facts</h2>
              <div className="space-y-3">
                {site.facts.map((fact, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{fact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="heritage-card rounded-xl p-6">
            <h2 className="text-2xl font-serif font-bold mb-8">Historical Timeline</h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold via-gold/50 to-transparent" />
              <div className="space-y-6">
                {site.timeline.map((event, i) => (
                  <div key={i} className="relative pl-12">
                    <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-gold border-2 border-heritage-dark shadow-lg shadow-gold/30" />
                    <div
                      className="bg-white/5 hover:bg-white/10 border border-heritage-border hover:border-gold/30 rounded-xl p-4 cursor-pointer transition-all"
                      onClick={() => setExpandedTimeline(expandedTimeline === i ? null : i)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-gold text-sm font-bold">{event.year} CE</span>
                          <h3 className="font-serif font-bold text-lg mt-0.5">{event.title}</h3>
                        </div>
                        {expandedTimeline === i ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                      </div>
                      {expandedTimeline === i && (
                        <p className="text-gray-400 text-sm mt-3 leading-relaxed border-t border-heritage-border pt-3">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <div className="heritage-card rounded-xl p-6">
              <h2 className="text-2xl font-serif font-bold mb-6">Architecture & Design</h2>
              <div className="mb-6 p-4 bg-gold/5 border border-gold/20 rounded-xl">
                <div className="text-xs text-gold uppercase tracking-wide mb-1">Style</div>
                <div className="text-white font-medium">{site.architectureStyle}</div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                The architectural style of {site.name} represents one of the finest examples of {site.architectureStyle.split('—')[0].trim()}.
                Built during the {site.historicalPeriod}, it showcases the mastery of its builders and the cultural values of the era.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['Structural Engineering', 'Decorative Elements', 'Material & Construction', 'Spatial Planning', 'Symbolic Design', 'Conservation'].map(aspect => (
                  <div key={aspect} className="p-3 bg-white/5 border border-heritage-border rounded-lg">
                    <div className="text-xs font-medium text-gold mb-1">{aspect}</div>
                    <div className="text-xs text-gray-400">
                      {aspect === 'Material & Construction' ? `Primary: ${site.category === 'Monument' ? 'White Marble' : site.category === 'Fort' ? 'Red Sandstone' : 'Granite & Stone'}` :
                       aspect === 'Structural Engineering' ? 'Advanced medieval engineering techniques' :
                       'Representing the cultural ethos of the period'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {site.model3D.available && (
              <Link to={`/3d-viewer/${site.id}`} className="block heritage-card rounded-xl p-6 border-gold/20 hover:border-gold/40 transition-all group">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold mb-1">3D Digital Twin</h3>
                    <p className="text-gray-400 text-sm">Explore the architectural details interactively in our 3D viewer</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center group-hover:bg-blue-600/30 transition-all">
                    <Compass className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
              </Link>
            )}
          </div>
        )}

        {activeTab === 'story' && (
          <div className="heritage-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-bold">AI Cultural Story</h2>
              <div className="flex space-x-1 bg-white/5 rounded-xl p-1">
                {(['tourist', 'short', 'detailed', 'student'] as const).map(mode => (
                  <button key={mode} onClick={() => setStoryMode(mode)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${storyMode === mode ? 'bg-gold text-heritage-dark' : 'text-gray-400 hover:text-white'}`}>
                    {mode}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white/5 border border-heritage-border rounded-xl p-6 mb-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-4 w-4 text-gold" />
                </div>
                <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line font-serif">
                  {stories[storyMode]?.text || stories.tourist.text}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
              <p>AI-generated content for educational purposes. Historical information should be verified against authoritative sources such as ASI, UNESCO, and academic publications.</p>
            </div>
          </div>
        )}

        {activeTab === 'nearby' && (
          <div>
            <h2 className="text-2xl font-serif font-bold mb-6">
              Nearby in {site.state}
            </h2>
            {nearbySites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {nearbySites.map(nearby => (
                  <Link key={nearby.id} to={`/heritage/${nearby.slug}`}
                    className="heritage-card rounded-xl overflow-hidden hover:border-gold/30 transition-all group">
                    <div className="h-40 overflow-hidden">
                      <img
                        src={nearby.images[0] || 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80'}
                        alt={nearby.name}
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80'; }}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-gold font-semibold mb-1">{nearby.category}</div>
                      <h3 className="font-serif font-bold mb-1">{nearby.name}</h3>
                      <div className="flex items-center text-xs text-gray-400">
                        <MapPin className="h-3 w-3 mr-1" /> {nearby.location}
                      </div>
                      <div className="flex items-center mt-2 text-xs text-gray-400">
                        <Star className="h-3 w-3 mr-1 text-gold fill-gold" /> {nearby.rating}
                        <span className="ml-2">• {nearby.category}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <MapPin className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>No other sites found in {site.state}</p>
                <Link to="/explore" className="text-gold text-sm mt-2 inline-block hover:text-gold-light">
                  Browse all heritage sites →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Reviews Placeholder */}
        <div className="mt-10 heritage-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif font-bold">Visitor Reviews</h2>
            <button onClick={() => toast.success('Review form opened!')} className="text-sm text-gold hover:text-gold-light">
              + Write Review
            </button>
          </div>
          <div className="space-y-4">
            {[
              { author: 'Arjun S.', rating: 5, text: 'Absolutely breathtaking! The architectural details are incredible. Must visit.', date: '2026-08-15', role: 'Heritage Enthusiast' },
              { author: 'Priya K.', rating: 5, text: 'The AI guide feature made the visit so much more educational. Learned so much about the history!', date: '2026-08-10', role: 'Student' },
              { author: 'Ravi M.', rating: 4, text: 'Wonderful experience. Would recommend visiting at sunrise for the best light.', date: '2026-08-05', role: 'Tourist' },
            ].map((review, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{review.author}</div>
                      <div className="text-xs text-gray-400">{review.role} • {review.date}</div>
                    </div>
                  </div>
                  <div className="flex">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 text-gold fill-gold" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-300">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeritageDetailPage;
