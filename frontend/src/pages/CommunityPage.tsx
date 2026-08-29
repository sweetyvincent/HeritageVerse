import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit3, MapPin, Calendar, Heart, MessageCircle, Share2, Sparkles, Filter } from 'lucide-react';
import { FALLBACK_HERITAGE_IMAGE } from '../data/heritageSites';
import toast from 'react-hot-toast';

interface Story {
  id: number;
  title: string;
  contributor: string;
  category: string;
  date: string;
  location: string;
  excerpt: string;
  image: string;
  likes: number;
  comments: number;
  liked?: boolean;
}

const INITIAL_STORIES: Story[] = [
  {
    id: 1,
    title: "The Legend of Hampi's Musical Pillars",
    contributor: "Lakshmi N.",
    category: "Folk Tales",
    date: "Aug 24, 2026",
    location: "Hampi, Karnataka",
    excerpt: "According to local oral traditions, the 56 monolithic musical pillars of the Vittala Temple were tuned to ancient Carnatic ragas. British officers once cut open two pillars to discover they were completely solid granite.",
    image: "https://images.unsplash.com/photo-1600100397608-f010f443b238?auto=format&fit=crop&w=1200&q=80",
    likes: 142,
    comments: 24
  },
  {
    id: 2,
    title: "Preserving Natural Mineral Pigments of Ajanta",
    contributor: "Dr. Rajiv M.",
    category: "Traditional Crafts",
    date: "Aug 20, 2026",
    location: "Aurangabad, Maharashtra",
    excerpt: "The 1,500-year-old Buddhist cave murals used vibrant lapis lazuli, red cinnabar, and terra verte pigments. Our conservation team is documenting how ancient master craftsmen ground these minerals on stone mortars.",
    image: "https://images.unsplash.com/photo-1628107082236-4d0f6bbd6883?auto=format&fit=crop&w=1200&q=80",
    likes: 98,
    comments: 11
  },
  {
    id: 3,
    title: "Rediscovering the Underwater Ruins of Mahabalipuram",
    contributor: "Kavya Sundaram",
    category: "Historical Photos",
    date: "Aug 15, 2026",
    location: "Mahabalipuram, Tamil Nadu",
    excerpt: "Local fishermen have long maintained that the Shore Temple was only one of Seven Pagodas, six of which were claimed by the sea. Recent underwater sonar expeditions confirm extensive submerged granite blocks.",
    image: "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=1200&q=80",
    likes: 215,
    comments: 38
  },
  {
    id: 4,
    title: "The Royal Mysore Dasara Jumbo Savari Tradition",
    contributor: "Suresh Wadiyar",
    category: "Festivals",
    date: "Aug 10, 2026",
    location: "Mysore, Karnataka",
    excerpt: "The 750-kg golden howdah carried by the lead elephant during Mysore Dasara has a lineage dating back to 1610 CE. The lighting of 97,000 bulbs around Amba Vilas Palace is a sight that unites generations.",
    image: "https://images.unsplash.com/photo-1588096344356-9b48a313d969?auto=format&fit=crop&w=1200&q=80",
    likes: 176,
    comments: 19
  }
];

const CommunityPage: React.FC = () => {
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Folk Tales', 'Historical Photos', 'Festivals', 'Traditional Crafts'];

  const filtered = activeCategory === 'All'
    ? stories
    : stories.filter(s => s.category === activeCategory);

  const toggleLike = (id: number) => {
    setStories(prev => prev.map(s => {
      if (s.id === id) {
        const liked = !s.liked;
        toast(liked ? 'Story liked! ❤️' : 'Like removed', { icon: '✨' });
        return { ...s, liked, likes: liked ? s.likes + 1 : s.likes - 1 };
      }
      return s;
    }));
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-heritage-dark px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <div className="text-xs text-gold font-bold uppercase tracking-widest mb-1.5 flex items-center space-x-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Living Cultural Heritage</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">
              Community <span className="text-gold">Stories</span>
            </h1>
            <p className="text-gray-400 max-w-xl">
              Discover crowd-curated oral histories, folklore, craft traditions, and eyewitness memories.
            </p>
          </div>
          <Link
            to="/community/submit"
            className="bg-gold hover:bg-amber-500 text-heritage-dark px-6 py-3.5 rounded-2xl font-bold flex items-center transition-all shadow-xl shadow-gold/20 hover:scale-105"
          >
            <Edit3 className="w-4 h-4 mr-2" /> Share Your Story
          </Link>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-gold text-heritage-dark shadow-md shadow-gold/20'
                  : 'bg-heritage-card border border-heritage-border text-gray-300 hover:border-gold/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Story */}
        {stories.length > 0 && activeCategory === 'All' && (
          <div className="heritage-card rounded-3xl overflow-hidden mb-12 border border-gold/30 group hover:border-gold/60 transition-all shadow-2xl">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 h-72 lg:h-[420px] relative overflow-hidden flex-shrink-0">
                <img
                  src={stories[0].image}
                  alt={stories[0].title}
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_HERITAGE_IMAGE; }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-gold text-heritage-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  ⭐ Featured Story
                </div>
              </div>
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-heritage-card">
                <div className="text-gold text-xs font-bold uppercase tracking-wider mb-2">{stories[0].category}</div>
                <h2 className="text-2xl lg:text-3xl font-serif font-bold text-white mb-4 leading-snug">
                  {stories[0].title}
                </h2>
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                  {stories[0].excerpt}
                </p>
                <div className="flex items-center text-xs text-gray-400 gap-4 mb-6">
                  <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-gold" /> {stories[0].location}</span>
                  <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1 text-gray-500" /> {stories[0].date}</span>
                </div>
                <div className="flex justify-between items-center border-t border-heritage-border pt-6 mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center font-bold text-xs text-gold">
                      {stories[0].contributor.charAt(0)}
                    </div>
                    <span className="text-xs font-medium text-white">{stories[0].contributor}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleLike(stories[0].id)}
                      className={`flex items-center space-x-1 text-xs px-3 py-1.5 rounded-xl border transition-all ${
                        stories[0].liked ? 'border-red-500/40 bg-red-500/10 text-red-400' : 'border-heritage-border text-gray-400 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${stories[0].liked ? 'fill-red-400' : ''}`} />
                      <span>{stories[0].likes}</span>
                    </button>
                    <span className="flex items-center space-x-1 text-xs text-gray-400">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{stories[0].comments}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(story => (
            <div key={story.id} className="heritage-card rounded-2xl overflow-hidden border border-heritage-border hover:border-gold/40 transition-all flex flex-col group">
              <div className="h-52 overflow-hidden relative flex-shrink-0">
                <img
                  src={story.image}
                  alt={story.title}
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_HERITAGE_IMAGE; }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-gold text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/10">
                  {story.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-[11px] text-gray-400 mb-2 gap-3">
                  <span className="flex items-center"><MapPin className="w-3 h-3 mr-1 text-gold" /> {story.location}</span>
                  <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {story.date}</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-white mb-2 leading-snug group-hover:text-gold transition-colors">
                  {story.title}
                </h3>
                <p className="text-gray-400 text-xs mb-5 line-clamp-3 leading-relaxed flex-grow">
                  {story.excerpt}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-heritage-border/60 mt-auto">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gold/10 text-gold flex items-center justify-center text-[10px] font-bold">
                      {story.contributor.charAt(0)}
                    </div>
                    <span className="text-xs text-gray-400">{story.contributor}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleLike(story.id)}
                      className={`flex items-center space-x-1 text-xs transition-colors ${story.liked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'}`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${story.liked ? 'fill-red-400' : ''}`} />
                      <span>{story.likes}</span>
                    </button>
                    <span className="flex items-center space-x-1 text-xs text-gray-400">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{story.comments}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
