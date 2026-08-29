import React, { useState } from 'react';
import { Search, Eye, CheckCircle, AlertTriangle, Clock, X } from 'lucide-react';
import toast from 'react-hot-toast';

const mockReports = [
  { id: 'RPT-001', site: 'Hampi', state: 'Karnataka', issue: 'Vandalism on eastern gateway wall', type: 'Vandalism', severity: 'High', status: 'Under Review', reporter: 'Anon User', date: '2026-08-28', lat: 15.335, lng: 76.46 },
  { id: 'RPT-002', site: 'Ajanta Caves', state: 'Maharashtra', issue: 'Water seepage in Cave 17 damaging paintings', type: 'Environmental Damage', severity: 'Critical', status: 'Assigned', reporter: 'Dr. Priya N.', date: '2026-08-27', lat: 20.551, lng: 75.703 },
  { id: 'RPT-003', site: 'Konark Sun Temple', state: 'Odisha', issue: 'Erosion on carved wheels deteriorating', type: 'Structural Damage', severity: 'Medium', status: 'Pending', reporter: 'Arjun S.', date: '2026-08-25', lat: 19.887, lng: 86.094 },
  { id: 'RPT-004', site: 'Sanchi Stupa', state: 'Madhya Pradesh', issue: 'Vegetation overgrowth near northern torana', type: 'Maintenance', severity: 'Low', status: 'Resolved', reporter: 'Kavya R.', date: '2026-08-20', lat: 23.478, lng: 77.74 },
  { id: 'RPT-005', site: 'Mahabalipuram', state: 'Tamil Nadu', issue: 'Tourist graffiti on Shore Temple walls', type: 'Vandalism', severity: 'High', status: 'Pending', reporter: 'Ravi M.', date: '2026-08-22', lat: 12.617, lng: 80.199 },
  { id: 'RPT-006', site: 'Ellora Caves', state: 'Maharashtra', issue: 'Missing artifact from Cave 16 alcove', type: 'Missing Artifacts', severity: 'Critical', status: 'Assigned', reporter: 'ASI Officer', date: '2026-08-19', lat: 20.025, lng: 75.179 },
];

const severityStyle: Record<string, string> = {
  Critical: 'text-red-400 bg-red-400/10 border-red-400/30',
  High: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  Medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  Low: 'text-green-400 bg-green-400/10 border-green-400/30',
};

const statusStyle: Record<string, string> = {
  Pending: 'text-gray-400',
  'Under Review': 'text-yellow-400',
  Assigned: 'text-blue-400',
  Resolved: 'text-green-400',
};

const ManageReportsPage: React.FC = () => {
  const [reports, setReports] = useState(mockReports);
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedReport, setSelectedReport] = useState<typeof mockReports[0] | null>(null);

  const filtered = reports.filter(r => {
    const matchSearch = r.site.toLowerCase().includes(search.toLowerCase()) || r.issue.toLowerCase().includes(search.toLowerCase());
    const matchSeverity = severityFilter === 'All' || r.severity === severityFilter;
    const matchStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchSearch && matchSeverity && matchStatus;
  });

  const updateStatus = (id: string, newStatus: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    setSelectedReport(prev => prev ? { ...prev, status: newStatus } : null);
    toast.success(`Report ${id} marked as ${newStatus}`);
  };

  const stats = [
    { label: 'Total Reports', value: reports.length, color: 'text-white' },
    { label: 'Critical', value: reports.filter(r => r.severity === 'Critical').length, color: 'text-red-400' },
    { label: 'Pending', value: reports.filter(r => r.status === 'Pending').length, color: 'text-yellow-400' },
    { label: 'Resolved', value: reports.filter(r => r.status === 'Resolved').length, color: 'text-green-400' },
  ];

  return (
    <div className="p-6 lg:p-8 flex-1">
      <div className="mb-6">
        <h1 className="text-2xl font-serif font-bold">Preservation Reports</h1>
        <p className="text-gray-400 text-sm mt-1">Manage and respond to heritage damage reports</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map(({ label, value, color }) => (
          <div key={label} className="heritage-card rounded-xl p-4 text-center">
            <div className={`text-3xl font-bold mb-1 ${color}`}>{value}</div>
            <div className="text-xs text-gray-400">{label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search reports..."
            className="w-full bg-heritage-card border border-heritage-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold/50" />
        </div>
        <select value={severityFilter} onChange={e => setSeverityFilter(e.target.value)}
          className="bg-heritage-card border border-heritage-border rounded-xl px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-gold/50">
          <option value="All">All Severities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="bg-heritage-card border border-heritage-border rounded-xl px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-gold/50">
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Under Review">Under Review</option>
          <option value="Assigned">Assigned</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports List */}
        <div className="lg:col-span-2 heritage-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-heritage-border">
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">ID</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Site</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Severity</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id}
                    className={`border-b border-heritage-border/50 hover:bg-white/5 transition-colors cursor-pointer ${selectedReport?.id === r.id ? 'bg-gold/5' : ''}`}
                    onClick={() => setSelectedReport(r)}>
                    <td className="px-5 py-3 text-xs font-mono text-gray-400">{r.id}</td>
                    <td className="px-5 py-3">
                      <div className="text-sm font-medium">{r.site}</div>
                      <div className="text-xs text-gray-400 truncate max-w-[160px]">{r.issue}</div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${severityStyle[r.severity]}`}>{r.severity}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs ${statusStyle[r.status]}`}>{r.status}</span>
                    </td>
                    <td className="px-5 py-3">
                      <button onClick={e => { e.stopPropagation(); setSelectedReport(r); }}
                        className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                        <Eye className="h-3.5 w-3.5 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="heritage-card rounded-xl p-5">
          {selectedReport ? (
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs font-mono text-gray-400 mb-1">{selectedReport.id}</div>
                  <h3 className="font-serif font-bold text-lg">{selectedReport.site}</h3>
                  <div className="text-xs text-gray-400">{selectedReport.state}</div>
                </div>
                <button onClick={() => setSelectedReport(null)} className="text-gray-400 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3 mb-5">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Issue Type</div>
                  <div className="text-sm font-medium">{selectedReport.type}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Description</div>
                  <div className="text-sm text-gray-300">{selectedReport.issue}</div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Severity</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${severityStyle[selectedReport.severity]}`}>{selectedReport.severity}</span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Reported By</div>
                    <div className="text-sm">{selectedReport.reporter}</div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Date</div>
                  <div className="text-sm">{selectedReport.date}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Coordinates</div>
                  <div className="text-sm font-mono text-gray-300">{selectedReport.lat}°N, {selectedReport.lng}°E</div>
                </div>
              </div>

              <div className="border-t border-heritage-border pt-4">
                <div className="text-xs text-gray-400 mb-3">Update Status</div>
                <div className="grid grid-cols-2 gap-2">
                  {['Under Review', 'Assigned', 'Resolved', 'Pending'].map(s => (
                    <button key={s} onClick={() => updateStatus(selectedReport.id, s)}
                      className={`text-xs py-2 rounded-lg border transition-all ${selectedReport.status === s ? 'border-gold bg-gold/10 text-gold' : 'border-heritage-border bg-white/5 text-gray-400 hover:border-gold/30 hover:text-white'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <AlertTriangle className="h-10 w-10 text-gray-600 mb-3" />
              <p className="text-gray-400 text-sm">Select a report to view details and take action</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageReportsPage;
