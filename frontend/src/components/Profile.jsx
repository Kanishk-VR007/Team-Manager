import React, { useEffect, useState } from 'react';
import { api, getUser, logout } from '../utils/api';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/users/me').then(data => {
      setProfile(data);
      setLoading(false);
    }).catch(() => { setProfile(getUser()); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-space-md">
        <div className="w-24 h-24 rounded-full bg-surface-container/40 animate-pulse"></div>
        <div className="w-48 h-6 rounded bg-surface-container/40 animate-pulse"></div>
      </div>
    );
  }

  const user = profile || {};
  const initials = (user.name || 'U').charAt(0).toUpperCase();

  return (
    <div className="flex flex-col gap-space-xl max-w-3xl mx-auto">
      <div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Profile</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">Your account information</p>
      </div>

      {/* Profile Card */}
      <div className="rounded-2xl bg-surface-container/60 p-space-xl backdrop-blur-md border border-outline-variant/10 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col sm:flex-row items-center gap-space-xl">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-tertiary flex items-center justify-center text-white font-bold text-3xl shadow-[0_8px_24px_rgba(77,142,255,0.35)]">
            {initials}
          </div>
          <div className="flex flex-col items-center sm:items-start gap-space-xs">
            <h2 className="font-headline-md text-on-surface font-bold text-xl">{user.name || 'Unknown User'}</h2>
            <span className="px-space-md py-1 rounded-full bg-primary-container/20 text-primary font-label-md text-label-md uppercase tracking-wider">
              {(user.role || 'USER').replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-lg">
        {[
          { label: 'Email', value: user.email, icon: 'mail' },
          { label: 'Full Name', value: user.fullName || user.name || '—', icon: 'person' },
          { label: 'Role', value: (user.role || 'DEVELOPER').replace('_', ' '), icon: 'badge' },
          { label: 'Team', value: user.teamName || 'Unassigned', icon: 'groups' },
          { label: 'Workload Score', value: `${user.workloadScore || 0}%`, icon: 'speed' },
          { label: 'GitHub', value: user.githubLink || '—', icon: 'code' },
        ].map((item, i) => (
          <div key={i} className="rounded-xl bg-surface-container/60 p-space-lg backdrop-blur-md border border-outline-variant/10 flex items-start gap-space-md">
            <div className="w-10 h-10 rounded-xl bg-primary-container/15 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            </div>
            <div className="min-w-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant block">{item.label}</span>
              <span className="font-body-md text-on-surface font-medium truncate block">{item.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-space-md">
        <button onClick={logout}
          className="flex items-center gap-space-sm px-space-lg py-space-sm rounded-xl bg-error-container/20 hover:bg-error-container/40 text-error font-label-md font-semibold transition-all duration-200">
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
