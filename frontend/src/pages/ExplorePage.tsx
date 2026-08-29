import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { heritageSites, categories, HeritageSite } from '../data/heritageSites';
import { Search, Filter, MapPin, Star, Eye, Compass, X, SlidersHorizontal, Map, Clock } from 'lucide-react';

const HeritageCard: React.FC<{ site: HeritageSite }> = ({ site }) => (
  <div className="heritage-card rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-gold/10 flex flex-col">
    {/* Image */}
    <div className="relative h-52 overflow-hidden flex-shrink-0">
      <div className="absolute inset-0 bg-gradient-to-t from-heritage-card via-transparent to-transparent z-10" />
      <img
        src={site.images[0]}
        alt={site.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-1">
        <span className="bg-gold/90 backdrop-blur-sm text-heritage-dark text-xs font-bold px-2 py-0.5 rounded-full">
          {site.category}
        </span>
        {site.featured && (
          <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-2 py-0.5 rounded-full">
            ⭐ Featured
          </span>
        )}
      </div>
      {/* Rating */}
      <div className="absolute top-3 right-3 z-20 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
        <Star className="h-3 w-3 text-gold fill-gold" />
        <span className="text-xs font-bold text-white">{site.rating}</span>
      </div>
      {/* Virtual Tour Badge */}
      {site.virtualTour.available && (
        <div className="absolute bottom-3 right-3 z-20 flex items-center space-x-1 bg-purple-600/80 backdrop-blur-sm rounded-full px-2 py-1">
          <Eye className="h-3 w-3 text-white" />
          <span className="text-xs text-white">360° Tour</span>
        </div>
      )}
    </div>

    {/* Content */}
    <div className="p-5 flex flex-col flex-1">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-serif font-bold leading-tight pr-2 group-hover:text-gold transition-colors">
          {site.name}
        </h3>
      </div>

      <div className="flex items-center text-gray-400 mb-2 text-xs">
        <MapPin className="h-3 w-3 mr-1 text-gold flex-shrink-0" />
        <span className="truncate">{site.location}</span>
      </div>

      <div className="flex items-center text-gray-500 mb-3 text-xs">
        <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
        <span className="truncate">{site.historicalPeriod}</span>
      </div>

      <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">{site.shortDescription}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {site.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-xs bg-white/5 border border-heritage-border text-gray-400 px-2 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {/* Preservation Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs text-gray-500">
          Preservation:{' '}
          <span className={`font-medium ${
            site.preservationStatus === 'Excellent' ? 'text-green-400' :
            site.preservationStatus === 'Good' ? 'text-blue-400' :
            site.preservationStatus === 'Fair' ? 'text-yellow-400' : 'text-red-400'
          }`}>{site.preservationStatus}</span>
        </div>
        <div className="text-xs text-gray-500">
          {(site.visitorCount / 1000000).toFixed(1)}M visitors/yr
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2 mt-auto">
        <Link
          to={`/heritage/${site.slug}`}
          className="flex-1 bg-gold hover:bg-amber-500 text-heritage-dark text-sm font-bold py-2 rounded-xl text-center transition-all"
        >
          Explore
        </Link>
        {site.virtualTour.available && (
          <Link
            to={`/virtual-tour/${site.id}`}
            className="flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-purple-600/20 border border-heritage-border hover:border-purple-500/40 rounded-xl transition-all"
            title="Virtual Tour"
          >
            <Eye className="h-4 w-4 text-gray-400 hover:text-purple-400" />
          </Link>
        )}
        {site.model3D.available && (
          <Link
            to={`/3d-viewer/${site.id}`}
            className="flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-blue-600/20 border border-heritage-border hover:border-blue-500/40 rounded-xl transition-all"
            title="3D View"
          >
            <Compass className="h-4 w-4 text-gray-400 hover:text-blue-400" />
          </Link>
        )}
      </div>
    </div>
  </div>
);

const SkeletonCard = () => (
  <div className="heritage-card rounded-2xl overflow-hidden">
    <div className="h-52 skeleton" />
    <div className="p-5 space-y-3">
      <div className="h-5 skeleton rounded w-3/4" />
      <div className="h-3 skeleton rounded w-1/2" />
      <div className="h-3 skeleton rounded w-full" />
      <div className="h-3 skeleton rounded w-full" />
      <div className="h-8 skeleton rounded-xl" />
    </div>
  </div>
);

const ExplorePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'visitors'>('rating');
  const [isLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [preservationFilter, setPreservationFilter] = useState('All');

  const filtered = heritageSites
    .filter(site => {
      const matchSearch =
        site.name.toLowerCase().includes(search.toLowerCase()) ||
        site.location.toLowerCase().includes(search.toLowerCase()) ||
        site.historicalPeriod.toLowerCase().includes(search.toLowerCase()) ||
        site.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchCategory = selectedCategory === 'All' || site.category === selectedCategory;
      const matchPreservation = preservationFilter === 'All' || site.preservationStatus === preservationFilter;
      return matchSearch && matchCategory && matchPreservation;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.visitorCount - a.visitorCount;
    });

  return (
    <div className="min-h-screen bg-heritage-dark pt-20 pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-b from-heritage-card to-heritage-dark border-b border-heritage-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">Cultural Discovery</div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3">
                Explore <span className="text-gold">Heritage</span>
              </h1>
              <p className="text-gray-400 max-w-xl">
                Discover India's extraordinary cultural legacy — {heritageSites.length} UNESCO-listed and nationally significant sites.
              </p>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-400">
              <Link to="/map" className="flex items-center space-x-2 border border-heritage-border hover:border-gold/40 rounded-xl px-4 py-2 transition-all hover:text-white">
                <Map className="h-4 w-4" />
                <span>Map View</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, location, period, or keyword..."
              className="w-full bg-heritage-card border border-heritage-border rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="bg-heritage-card border border-heritage-border rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-gold/50 min-w-[140px]"
          >
            <option value="rating">Top Rated</option>
            <option value="visitors">Most Visited</option>
            <option value="name">Alphabetical</option>
          </select>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 border rounded-xl px-4 py-3 text-sm transition-all ${showFilters ? 'border-gold/40 bg-gold/10 text-gold' : 'border-heritage-border text-gray-400 hover:border-gold/30 hover:text-white'}`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-heritage-card border border-heritage-border rounded-xl p-5 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-medium text-gray-400 mb-2 block uppercase tracking-wide">Preservation Status</label>
                <div className="flex flex-wrap gap-2">
                  {['All', 'Excellent', 'Good', 'Fair', 'Poor'].map(status => (
                    <button
                      key={status}
                      onClick={() => setPreservationFilter(status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${preservationFilter === status ? 'bg-gold text-heritage-dark' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 mb-2 block uppercase tracking-wide">Features</label>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1.5 rounded-lg text-xs bg-purple-600/20 text-purple-400 border border-purple-500/30">360° Virtual Tour</button>
                  <button className="px-3 py-1.5 rounded-lg text-xs bg-blue-600/20 text-blue-400 border border-blue-500/30">3D Model</button>
                  <button className="px-3 py-1.5 rounded-lg text-xs bg-gold/10 text-gold border border-gold/30">UNESCO Site</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-gold text-heritage-dark' : 'bg-white/5 border border-heritage-border text-gray-400 hover:border-gold/30 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-400">
            Showing <span className="text-white font-medium">{filtered.length}</span> of {heritageSites.length} heritage sites
            {search && <> matching "<span className="text-gold">{search}</span>"</>}
          </p>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏛️</div>
            <h3 className="text-xl font-serif font-bold mb-2">No sites found</h3>
            <p className="text-gray-400 mb-6">Try a different search term or remove some filters.</p>
            <button onClick={() => { setSearch(''); setSelectedCategory('All'); }} className="bg-gold text-heritage-dark font-bold px-6 py-3 rounded-xl hover:bg-amber-500 transition-all">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(site => (
              <HeritageCard key={site.id} site={site} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
