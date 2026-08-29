import React, { useState, useRef } from 'react';
import { ShieldAlert, MapPin, UploadCloud, AlertTriangle, CheckCircle, Clock, X, Navigation, Image as ImageIcon } from 'lucide-react';
import { heritageSites } from '../data/heritageSites';
import toast, { Toaster } from 'react-hot-toast';

interface ReportItem {
  id: string;
  site: string;
  issue: string;
  date: string;
  status: 'Pending' | 'Under Review' | 'Assigned' | 'Resolved';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  image?: string;
  location?: string;
}

const INITIAL_REPORTS: ReportItem[] = [
  { id: 'PR-2940', site: 'Taj Mahal', issue: 'Marble discoloration near river-facing wall', date: '2 days ago', status: 'Under Review', severity: 'High', location: 'Agra, UP' },
  { id: 'PR-2938', site: 'Red Fort', issue: 'Graffiti defacement on outer courtyard', date: '1 week ago', status: 'Resolved', severity: 'Medium', location: 'Delhi' },
  { id: 'PR-2935', site: 'Hampi', issue: 'Loose stone slab near eastern gopuram', date: '2 weeks ago', status: 'Assigned', severity: 'Critical', location: 'Karnataka' },
];

const PreservationPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [reports, setReports] = useState<ReportItem[]>(INITIAL_REPORTS);
  const [selectedSite, setSelectedSite] = useState('');
  const [issueType, setIssueType] = useState('Structural Damage (Cracks, Collapses)');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Medium');
  const [locationText, setLocationText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        toast.success('Damage evidence photo attached!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        pos => {
          const coords = `${pos.coords.latitude.toFixed(4)}°N, ${pos.coords.longitude.toFixed(4)}°E (GPS Detected)`;
          setLocationText(coords);
          setIsLocating(false);
          toast.success('Current GPS location captured!');
        },
        () => {
          setIsLocating(false);
          setLocationText('27.1751°N, 78.0421°E (Manual)');
          toast('Using monument location coordinates', { icon: '📍' });
        }
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSite || !description.trim()) {
      toast.error('Please select a site and provide a description');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newReport: ReportItem = {
        id: `PR-${Math.floor(1000 + Math.random() * 9000)}`,
        site: selectedSite,
        issue: `${issueType}: ${description.slice(0, 40)}...`,
        date: 'Just now',
        status: 'Pending',
        severity,
        image: imagePreview || undefined,
        location: locationText || 'On-site'
      };

      setReports([newReport, ...reports]);
      setIsSubmitting(false);
      setSelectedSite('');
      setDescription('');
      setImagePreview(null);
      setLocationText('');
      toast.success('Preservation incident report submitted successfully! Authorities notified.');
    }, 1200);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'Assigned': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'Under Review': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-heritage-dark px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <ShieldAlert className="w-16 h-16 text-gold mx-auto mb-4 animate-pulse" />
          <h1 className="text-4xl font-serif font-bold text-white mb-3">Protect Our <span className="text-gold">Heritage</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Help preserve our collective history. Report structural damages, weathering, vandalism, or environmental threats directly to heritage authorities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Submission Form */}
          <div className="glass p-8 rounded-3xl border border-heritage-border">
            <h2 className="text-xl font-serif font-bold text-white mb-6 border-b border-heritage-border pb-4 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-gold" />
              <span>Submit Preservation Report</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-300 mb-1.5 font-medium">Heritage Site *</label>
                <select
                  required
                  value={selectedSite}
                  onChange={e => setSelectedSite(e.target.value)}
                  className="w-full bg-heritage-card border border-heritage-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/60"
                >
                  <option value="">Choose heritage monument / site...</option>
                  {heritageSites.map(s => (
                    <option key={s.id} value={s.name}>{s.name} ({s.location})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1.5 font-medium">Issue Category *</label>
                <select
                  value={issueType}
                  onChange={e => setIssueType(e.target.value)}
                  className="w-full bg-heritage-card border border-heritage-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/60"
                >
                  <option>Structural Damage (Cracks, Collapses, Tilting)</option>
                  <option>Vandalism & Graffiti</option>
                  <option>Environmental Threat (Water seepage, Erosion, Flora)</option>
                  <option>Missing Artifacts or Broken Sculptures</option>
                  <option>Urgent Maintenance & Cleanliness</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1.5 font-medium">Incident Description *</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full bg-heritage-card border border-heritage-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/60 resize-none"
                  placeholder="Provide precise location inside site, visible damage extent, and circumstances..."
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2 font-medium">Damage Severity Level *</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Low', 'Medium', 'High', 'Critical'] as const).map(lvl => (
                    <button
                      type="button"
                      key={lvl}
                      onClick={() => setSeverity(lvl)}
                      className={`py-2.5 text-xs rounded-xl font-bold border transition-all ${
                        severity === lvl
                          ? lvl === 'Critical' ? 'bg-red-500/20 border-red-500 text-red-400' :
                            lvl === 'High' ? 'bg-orange-500/20 border-orange-500 text-orange-400' :
                            lvl === 'Medium' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' :
                            'bg-green-500/20 border-green-500 text-green-400'
                          : 'bg-white/5 border-heritage-border text-gray-400 hover:border-white/20'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Working Photo Evidence Upload */}
              <div>
                <label className="block text-sm text-gray-300 mb-1.5 font-medium">Photo Evidence</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />

                {imagePreview ? (
                  <div className="relative rounded-2xl overflow-hidden border border-gold/40 max-h-52">
                    <img src={imagePreview} alt="Damage evidence" className="w-full h-48 object-cover" />
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/80 hover:bg-red-600 text-white transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs text-gold">
                      ✓ Evidence Attached
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border border-dashed border-heritage-border hover:border-gold/50 rounded-2xl p-6 text-center cursor-pointer bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <UploadCloud className="w-8 h-8 text-gold mx-auto mb-2" />
                    <span className="text-xs text-gray-300 font-medium">Attach Damage Photos</span>
                  </div>
                )}
              </div>

              {/* GPS Coordinates Auto-fill */}
              <div>
                <label className="block text-sm text-gray-300 mb-1.5 font-medium">GPS Location</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={locationText}
                    onChange={e => setLocationText(e.target.value)}
                    className="flex-1 bg-heritage-card border border-heritage-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold/60"
                    placeholder="Enter or auto-detect GPS coordinates..."
                  />
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={isLocating}
                    className="bg-gold/10 hover:bg-gold/20 border border-gold/40 text-gold px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all"
                  >
                    <Navigation className={`h-4 w-4 ${isLocating ? 'animate-spin' : ''}`} />
                    <span>{isLocating ? 'Detecting...' : 'Auto GPS'}</span>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-500 text-white py-3.5 rounded-xl font-bold transition-all shadow-xl shadow-red-600/30 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <ShieldAlert className="h-5 w-5" />
                  )}
                  <span>Submit Urgent Report</span>
                </button>
              </div>
            </form>
          </div>

          {/* Incident Log & Stats */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-6 rounded-2xl border border-heritage-border text-center">
                <div className="text-3xl font-bold text-white mb-1">{reports.length + 1200}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Total Reports Processed</div>
              </div>
              <div className="glass p-6 rounded-2xl border border-heritage-border text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">856</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Resolved Cases</div>
              </div>
            </div>

            <div className="glass p-6 rounded-3xl border border-heritage-border">
              <h2 className="text-lg font-serif font-bold text-white mb-4 flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gold" />
                <span>Recent Preservation Incident Logs</span>
              </h2>

              <div className="space-y-3">
                {reports.map(report => (
                  <div key={report.id} className="bg-heritage-card p-4 rounded-2xl border border-heritage-border hover:border-gold/30 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[11px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded-md">{report.id}</span>
                          <span className="text-xs font-bold text-white">{report.site}</span>
                        </div>
                        <p className="text-xs text-gray-300 mt-1">{report.issue}</p>
                      </div>
                      <span className={`text-[10px] px-2.5 py-1 rounded-full border font-bold uppercase ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>

                    {report.image && (
                      <div className="mt-2 mb-2 rounded-xl overflow-hidden max-h-32 border border-white/10">
                        <img src={report.image} alt="Report attachment" className="w-full h-24 object-cover" />
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-gray-400 mt-3 pt-2 border-t border-heritage-border/50">
                      <span className="flex items-center"><MapPin className="w-3 h-3 mr-1 text-gold" /> {report.location || report.site}</span>
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
