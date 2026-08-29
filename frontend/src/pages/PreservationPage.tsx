import React, { useState } from 'react';
import { ShieldAlert, MapPin, UploadCloud, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const PreservationPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Report submitted successfully! Authorities have been notified.');
    }, 1500);
  };

  const reports = [
    { id: 'PR-2940', site: 'Taj Mahal', issue: 'Structural Damage', date: '2 days ago', status: 'Under Review', severity: 'High' },
    { id: 'PR-2938', site: 'Red Fort', issue: 'Vandalism (Graffiti)', date: '1 week ago', status: 'Resolved', severity: 'Medium' }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Resolved': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'Under Review': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-heritage-dark px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12">
          <ShieldAlert className="w-16 h-16 text-gold mx-auto mb-4" />
          <h1 className="text-4xl font-serif font-bold text-white mb-4">Protect Our <span className="text-gold">Heritage</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Help preserve history. Report structural damage, vandalism, or environmental threats directly to preservation authorities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Form */}
          <div className="glass p-8 rounded-2xl border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-gray-800 pb-4">Submit New Report</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Heritage Site</label>
                <select required className="w-full bg-heritage-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold">
                  <option value="">Select a site...</option>
                  <option>Taj Mahal</option>
                  <option>Red Fort</option>
                  <option>Hampi Ruins</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Issue Type</label>
                <select required className="w-full bg-heritage-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold">
                  <option>Structural Damage (Cracks, Collapses)</option>
                  <option>Vandalism (Graffiti, Defacement)</option>
                  <option>Environmental Threat (Water logging, Tree growth)</option>
                  <option>Missing Artifacts</option>
                  <option>Maintenance Required</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea required rows={4} className="w-full bg-heritage-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold resize-none" placeholder="Provide specific details about the issue..."></textarea>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Severity</label>
                <div className="grid grid-cols-4 gap-2">
                  {['Low', 'Medium', 'High', 'Critical'].map(level => (
                    <label key={level} className="cursor-pointer">
                      <input type="radio" name="severity" className="peer sr-only" value={level} required />
                      <div className="text-center py-2 text-xs rounded border border-gray-700 bg-heritage-dark text-gray-400 peer-checked:bg-gold/20 peer-checked:text-gold peer-checked:border-gold transition-colors">
                        {level}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Location</label>
                <div className="flex gap-2">
                  <button type="button" className="bg-heritage-dark border border-gray-700 rounded-lg px-4 py-3 text-gray-400 hover:text-gold hover:border-gold transition-colors flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </button>
                  <input type="text" className="w-full bg-heritage-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold" placeholder="GPS Coordinates (Auto-filled)" readOnly />
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" disabled={isSubmitting} className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition-colors">
                  {isSubmitting ? 'Submitting...' : 'Submit Emergency Report'}
                </button>
              </div>
            </form>
          </div>

          {/* Stats & History */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-6 rounded-xl border border-gray-800 text-center">
                <div className="text-3xl font-bold text-white mb-1">1,204</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Total Reports</div>
              </div>
              <div className="glass p-6 rounded-xl border border-gray-800 text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">856</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Resolved</div>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center"><AlertTriangle className="w-5 h-5 text-gold mr-2" /> Recent Reports</h3>
              <div className="space-y-4">
                {reports.map((report, idx) => (
                  <div key={idx} className="bg-heritage-dark p-4 rounded-xl border border-gray-800">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs text-gray-500 font-mono bg-black px-2 py-0.5 rounded">{report.id}</span>
                        <h4 className="font-bold text-white text-sm mt-1">{report.issue}</h4>
                      </div>
                      <span className={`text-[10px] px-2 py-1 rounded border font-bold uppercase ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-gray-400 mt-3 gap-4">
                      <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {report.site}</span>
                      <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {report.date}</span>
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

export default PreservationPage;
