import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Search, Filter, MapPin, Star } from 'lucide-react';
import { heritageSites } from '../../data/heritageSites';
import toast from 'react-hot-toast';

const ManageSitesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [sites, setSites] = useState(heritageSites);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = sites.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      setSites(prev => prev.filter(s => s.id !== id));
      toast.success(`${name} removed successfully`);
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'Excellent': return 'text-green-400 bg-green-400/10';
      case 'Good': return 'text-blue-400 bg-blue-400/10';
      case 'Fair': return 'text-yellow-400 bg-yellow-400/10';
      case 'Poor': return 'text-orange-400 bg-orange-400/10';
      default: return 'text-red-400 bg-red-400/10';
    }
  };

  return (
    <div className="p-6 lg:p-8 flex-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold">Heritage Sites</h1>
          <p className="text-gray-400 text-sm mt-1">{sites.length} sites in the database</p>
        </div>
        <button onClick={() => { setShowAddModal(true); toast.success('Add site form opened'); }}
          className="flex items-center space-x-2 bg-gold text-heritage-dark font-bold px-4 py-2 rounded-xl hover:bg-gold-light transition-all">
          <Plus className="h-4 w-4" /> <span>Add Site</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search heritage sites..."
          className="w-full bg-heritage-card border border-heritage-border rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold/50" />
      </div>

      {/* Table */}
      <div className="heritage-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-heritage-border">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Site</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Category</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Visitors</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Rating</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(site => (
                <tr key={site.id} className="border-b border-heritage-border/50 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img src={site.images[0]} alt={site.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <div className="font-medium">{site.name}</div>
                        <div className="text-sm text-gray-400 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />{site.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-gold/10 text-gold text-xs px-2 py-1 rounded-full">{site.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColor(site.preservationStatus)}`}>{site.preservationStatus}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{(site.visitorCount / 1000000).toFixed(1)}M</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-gold fill-gold" />
                      <span className="text-sm">{site.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Link to={`/heritage/${site.slug}`} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button onClick={() => toast.success(`Editing ${site.name}`)} className="p-1.5 bg-blue-400/10 hover:bg-blue-400/20 rounded-lg transition-colors text-blue-400">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(site.id, site.name)} className="p-1.5 bg-red-400/10 hover:bg-red-400/20 rounded-lg transition-colors text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageSitesPage;
