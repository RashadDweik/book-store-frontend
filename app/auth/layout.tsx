import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] items-start justify-center bg-zinc-50 px-4 py-6 sm:py-8 md:items-center md:py-12 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        {/* Main Card Contained Frame */}
        <div className="border border-zinc-200 bg-white p-5 sm:p-6 md:p-8 transition-all duration-300 hover:border-zinc-300 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          {children}
        </div>
      </div>
    </div>
  );
}