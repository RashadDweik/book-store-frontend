'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react'

export default function AuthForm() {
  const searchParams = useSearchParams();
  const isSignUp = searchParams.get('mode') === 'signup';

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="mb-8 border-b border-zinc-200 pb-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1">
          {isSignUp ? 'Create An Account' : 'Welcome Back'}
        </h2>
        <h3 className="text-2xl font-light tracking-tight text-zinc-900">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h3>
      </div>

      {/* Main Card */}
      <div className="border border-zinc-200 bg-white p-6 sm:p-8 transition-all duration-300 hover:border-zinc-300 shadow-sm">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          
          {isSignUp && (
            <div>
              <label htmlFor="name" className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="John Doe"
                className="w-full border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-300 outline-none transition-colors duration-200 focus:border-zinc-900"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Email Address
              </label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-300 outline-none transition-colors duration-200 focus:border-zinc-900"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="password" className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                Password
              </label>
              {!isSignUp && (
                <Link href="#" className="text-[10px] font-mono text-zinc-400 hover:text-zinc-900 transition-colors">
                  Forgot?
                </Link>
              )}
            </div>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-300 outline-none transition-colors duration-200 focus:border-zinc-900"
            />
          </div>

          {/* Action Button - Inverted Minimal Theme */}
          <button
            type="submit"
            className="w-full bg-zinc-900 text-white text-sm font-medium py-3 px-4 transition-colors duration-200 hover:bg-zinc-800 focus:outline-none"
          >
            {isSignUp ? 'Register' : 'Continue'}
          </button>
        </form>

        {/* Form Footer Switcher */}
        <div className="mt-6 pt-5 border-t border-zinc-100 text-center">
          <p className="text-xs text-zinc-500">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <Link
              href={isSignUp ? '/auth' : '/auth?mode=signup'}
              className="font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-600 transition-colors"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}