'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { loginAction, ActionState } from '@/app/lib/auth';

const initialState: ActionState = { success: false, message: '' };

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <>
      <div className="mb-8 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1">
          Welcome Back
        </h2>
        <h3 className="text-2xl font-light tracking-tight text-zinc-900 dark:text-zinc-50">
          Sign In
        </h3>
      </div>

      <form action={formAction} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
            placeholder="you@example.com"
            className="w-full border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-300 outline-none transition-colors duration-200 focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          />
          {state.errors?.email && (
            <p className="text-red-500 font-mono text-[10px] mt-1">{state.errors.email[0]}</p>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor="password" className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">
              Password
            </label>
            <Link href="/auth/forgot" className="text-[10px] font-mono text-zinc-400 hover:text-zinc-900 transition-colors dark:hover:text-zinc-100">
              Forgot?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className="w-full border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-300 outline-none transition-colors duration-200 focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          />
          {state.errors?.password && (
            <p className="text-red-500 font-mono text-[10px] mt-1">{state.errors.password[0]}</p>
          )}
        </div>

        {state.message && !state.success && (
          <p className="text-red-500 text-xs font-mono">{state.message}</p>
        )}

        <SubmitButton label="Continue" />
      </form>

      <div className="mt-6 pt-5 border-t border-zinc-100 text-center dark:border-zinc-800">
        <p className="text-xs text-zinc-500">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-600 transition-colors dark:text-zinc-100 dark:hover:text-zinc-300">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-zinc-900 text-white text-sm font-medium py-3 px-4 transition-colors duration-200 hover:bg-zinc-800 focus:outline-none disabled:bg-zinc-400 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:disabled:bg-zinc-700"
    >
      {pending ? 'Processing...' : label}
    </button>
  );
}