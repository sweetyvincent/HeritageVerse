import React from 'react';
import { Link } from 'react-router-dom';
import { Edit3, MapPin, Calendar, Heart, MessageCircle } from 'lucide-react';

const CommunityPage = () => {
  const categories = ['All', 'Folk Tales', 'Historical Photos', 'Festivals', 'Traditional Crafts'];
  
  const stories = [
    {
      id: 1,
      title: "The Legend of Hampi's Flying Chariot",
      contributor: "Lakshmi N.",
      category: "Folk Tales",
      date: "Oct 12, 2026",
      location: "Hampi, Karnataka",
      excerpt: "My grandmother used to tell me stories about the stone chariot in the Vittala temple complex. According to local legend, the chariot was not always made of stone...",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Stone_Chariot_at_Vittala_Temple_Complex%2C_Hampi.jpg/800px-Stone_Chariot_at_Vittala_Temple_Complex%2C_Hampi.jpg",
      likes: 124,
      comments: 18
    },
    {
      id: 2,
      title: "Restoring 19th Century Frescoes",
      contributor: "Rajiv M.",
      category: "Traditional Crafts",
      date: "Oct 08, 2026",
      location: "Jaipur, Rajasthan",
      excerpt: "For the past six months, our team has been working on restoring the faded frescoes in a lesser-known haveli in Jaipur. The natural pigments used are fascinating.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Amber_Fort_Frescoes.jpg/800px-Amber_Fort_Frescoes.jpg",
      likes: 89,
      comments: 5
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-heritage-dark px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-white mb-2">Community <span className="text-gold">Stories</span></h1>
            <p className="text-gray-400">Discover hidden legends, personal histories, and shared cultural heritage.</p>
          </div>
          <Link to="/community/submit" className="bg-gold hover:bg-gold-light text-heritage-dark px-6 py-3 rounded-lg font-bold flex items-center transition-colors shadow-[0_0_20px_rgba(212,160,23,0.3)]">
            <Edit3 className="w-5 h-5 mr-2" /> Share Your Story
          </Link>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {categories.map((cat, i) => (
            <button key={i} className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-gold text-heritage-dark' : 'bg-heritage-card border border-gray-800 text-gray-300 hover:border-gold/50'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Story */}
        <div className="glass rounded-2xl overflow-hidden border border-gray-800 mb-12 group cursor-pointer hover:border-gold/30 transition-colors">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 h-64 md:h-96 relative overflow-hidden">
              <img src={stories[0].image} alt="Featured" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-4 left-4 bg-gold text-heritage-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Featured</div>
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-heritage-card to-transparent opacity-50 z-0"></div>
              <div className="relative z-10">
                <div className="text-gold text-sm font-semibold mb-2">{stories[0].category}</div>
                <h2 className="text-3xl font-serif font-bold text-white mb-4">{stories[0].title}</h2>
                <p className="text-gray-300 mb-6 line-clamp-3 leading-relaxed">{stories[0].excerpt}</p>
                <div className="flex items-center text-xs text-gray-400 gap-4 mb-8">
                  <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {stories[0].location}</span>
                  <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {stories[0].date}</span>
                </div>
                <div className="flex justify-between items-center border-t border-gray-800 pt-6 mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                    <span className="text-sm font-medium text-white">{stories[0].contributor}</span>
                  </div>
                  <button className="text-gold text-sm font-bold flex items-center group-hover:translate-x-2 transition-transform">
                    Read Full Story →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map(story => (
            <div key={story.id} className="glass rounded-xl overflow-hidden border border-gray-800 group hover:border-gold/30 transition-colors flex flex-col">
              <div className="h-48 overflow-hidden">
                <img src={story.image} alt={story.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-gold text-xs font-semibold mb-2">{story.category}</div>
                <h3 className="text-xl font-serif font-bold text-white mb-3">{story.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{story.excerpt}</p>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                  <div className="flex gap-4">
                    <span className="flex items-center text-xs text-gray-400 hover:text-gold transition-colors"><Heart className="w-4 h-4 mr-1" /> {story.likes}</span>
                    <span className="flex items-center text-xs text-gray-400 hover:text-gold transition-colors"><MessageCircle className="w-4 h-4 mr-1" /> {story.comments}</span>
                  </div>
                  <span className="text-xs text-gray-500">{story.contributor}</span>
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
