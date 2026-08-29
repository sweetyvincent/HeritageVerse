import React, { useState } from 'react';
import { Search, Shield, Mail, Ban, CheckCircle, Edit } from 'lucide-react';
import toast from 'react-hot-toast';

const mockUsers = [
  { id: '1', name: 'Heritage Admin', email: 'admin@heritageverse.com', role: 'admin', points: 5000, status: 'Active', joined: '2025-01-01' },
  { id: '2', name: 'Arjun Sharma', email: 'tourist@heritageverse.com', role: 'tourist', points: 450, status: 'Active', joined: '2026-03-15' },
  { id: '3', name: 'Dr. Priya Nair', email: 'authority@heritageverse.com', role: 'authority', points: 2000, status: 'Active', joined: '2025-06-20' },
  { id: '4', name: 'Kavya Reddy', email: 'student@heritageverse.com', role: 'student', points: 780, status: 'Active', joined: '2026-02-10' },
  { id: '5', name: 'Ramesh Kumar', email: 'ramesh@example.com', role: 'contributor', points: 320, status: 'Active', joined: '2026-05-01' },
  { id: '6', name: 'Lakshmi Devi', email: 'lakshmi@example.com', role: 'researcher', points: 1100, status: 'Suspended', joined: '2025-11-12' },
  { id: '7', name: 'Sanjay Patel', email: 'sanjay@example.com', role: 'tourist', points: 90, status: 'Active', joined: '2026-08-01' },
  { id: '8', name: 'Meera Singh', email: 'meera@example.com', role: 'student', points: 560, status: 'Active', joined: '2026-04-22' },
];

const roleColor: Record<string, string> = {
  admin: 'text-gold bg-gold/10',
  authority: 'text-red-400 bg-red-400/10',
  researcher: 'text-purple-400 bg-purple-400/10',
  contributor: 'text-orange-400 bg-orange-400/10',
  student: 'text-green-400 bg-green-400/10',
  tourist: 'text-blue-400 bg-blue-400/10',
};

const ManageUsersPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(mockUsers);
  const [roleFilter, setRoleFilter] = useState('all');

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const toggleStatus = (id: string, name: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
    toast.success(`${name} is now ${newStatus}`);
  };

  return (
    <div className="p-6 lg:p-8 flex-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold">User Management</h1>
          <p className="text-gray-400 text-sm mt-1">{users.length} registered users</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
            className="w-full bg-heritage-card border border-heritage-border rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold/50" />
        </div>
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
          className="bg-heritage-card border border-heritage-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50">
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="authority">Authority</option>
          <option value="researcher">Researcher</option>
          <option value="contributor">Contributor</option>
          <option value="student">Student</option>
          <option value="tourist">Tourist</option>
        </select>
      </div>

      <div className="heritage-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-heritage-border">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">User</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Role</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Points</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Joined</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => (
                <tr key={user.id} className="border-b border-heritage-border/50 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-heritage-dark font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${roleColor[user.role] || 'text-gray-400 bg-white/5'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gold font-medium">{user.points.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center space-x-1 text-xs ${user.status === 'Active' ? 'text-green-400' : 'text-red-400'}`}>
                      {user.status === 'Active' ? <CheckCircle className="h-3 w-3" /> : <Ban className="h-3 w-3" />}
                      <span>{user.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{user.joined}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => toast.success(`Editing ${user.name}`)} className="p-1.5 bg-blue-400/10 text-blue-400 rounded-lg hover:bg-blue-400/20 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => toggleStatus(user.id, user.name, user.status)}
                        className={`p-1.5 rounded-lg transition-colors ${user.status === 'Active' ? 'bg-red-400/10 text-red-400 hover:bg-red-400/20' : 'bg-green-400/10 text-green-400 hover:bg-green-400/20'}`}>
                        {user.status === 'Active' ? <Ban className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
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

export default ManageUsersPage;
