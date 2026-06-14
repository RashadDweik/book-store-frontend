'use client';

import { logoutAction } from '@/app/lib/auth/logout';
import { User } from '@/app/lib/definitions';

interface AccountSectionProps {
  user?: User | null;
}

export default function AccountSection({ user }: AccountSectionProps) {
  return (
    <div className="w-full max-w-lg">
      {/* Header Segment */}
      <div className="mb-8 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1">
          Personal Workspace
        </h2>
        <h3 className="text-2xl font-light tracking-tight text-zinc-900 dark:text-zinc-50">
          Account Profile
        </h3>
      </div>

      {/* Profile Details Block */}
      <div className="space-y-6">
        <ProfileField label="Full Name" value={user?.name} />
        <ProfileField label="Email Address" value={user?.email} />
        
        {/* System Access / Role Display */}
        <div>
          <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
            System Permissions
          </span>
          <div className="w-full border border-zinc-100 bg-zinc-50/50 px-4 py-2.5 text-sm text-zinc-500 select-none dark:border-zinc-800/60 dark:bg-zinc-950/40 dark:text-zinc-400">
            <span className="font-mono text-xs uppercase tracking-wide">
              {user?.role_id || 'customer'}
            </span>
          </div>
        </div>
      </div>

      {/* Session Management Zone */}
      <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col space-y-3">
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-0.5">
              Session Management
            </h4>
            <p className="text-xs text-zinc-500">
              Exit your current active terminal session on this browser.
            </p>
          </div>
          
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full border border-zinc-200 bg-white text-zinc-900 text-sm font-medium py-2.5 px-4 transition-colors duration-200 hover:bg-zinc-50 hover:border-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-950 dark:hover:border-zinc-50"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Sub-component for repetitive fields
function ProfileField({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
        {label}
      </span>
      <div className="w-full border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 select-all dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
        {value || '—'}
      </div>
    </div>
  );
}