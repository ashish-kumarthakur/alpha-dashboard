import React, { useState } from 'react';
import { UserPlus, Shield, CheckCircle, XCircle } from 'lucide-react';

const INITIAL_USERS = [
  { id: 'USR-001', name: 'Ashish Kumar Thakur', email: 'ashish@alpha.io', role: 'Admin', status: 'Active', joins: 'Jan 2026' },
  { id: 'USR-002', name: 'Rohan Sharma', email: 'rohan@alpha.io', role: 'Editor', status: 'Active', joins: 'Feb 2026' },
  { id: 'USR-003', name: 'Priya Patel', email: 'priya@alpha.io', role: 'Viewer', status: 'Suspended', joins: 'Mar 2026' },
];

export default function Users({ auth }) {
  const [users, setUsers] = useState(INITIAL_USERS);

  const toggleStatus = (id) => {
    if (auth.role !== 'admin') {
      alert("Access Denied: Only Admin can modify security profiles.");
      return;
    }
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: user.status === 'Active' ? 'Suspended' : 'Active' } : user
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Identity & Access Management</h1>
          <p className="text-xs text-gray-400 mt-0.5">Control operational privileges and personnel roles</p>
        </div>
        {auth.role === 'admin' && (
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold shadow-sm cursor-pointer">
            <UserPlus size={16} /> Provision New User
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-400">
                <th className="p-4">User Details</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4">Registration Date</th>
                <th className="p-4 text-center">Security Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-slate-100 text-slate-700 font-bold flex items-center justify-center rounded-full text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 leading-tight">{user.name}</h4>
                        <span className="text-xs text-gray-400 font-mono">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      user.role === 'Admin' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      <Shield size={12} /> {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 font-mono text-xs">{user.joins}</td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => toggleStatus(user.id)}
                      disabled={auth.role !== 'admin'}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold transition-all ${
                        user.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                      } ${auth.role === 'admin' ? 'cursor-pointer hover:opacity-80' : 'cursor-not-allowed'}`}
                    >
                      {user.status === 'Active' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                      {user.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}