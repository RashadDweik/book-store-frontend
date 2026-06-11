import { Author } from "@/app/lib/definitions";
import Link from 'next/link';

interface AuthorGridProps {
  authors: Author[];
}

export default function AuthorGrid({ authors }: AuthorGridProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Section Header */}
      <div className="mb-8 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1">
          Meet Our
        </h2>
        <h3 className="text-2xl font-light tracking-tight text-zinc-900 dark:text-zinc-50">
          Authors
        </h3>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {authors.map((author) => (
          <Link
            key={author.id}
            href={{
              pathname: '/',
              query: { authorId: author.id }
            }}
            className="group relative block border border-zinc-200 bg-white p-4 transition-colors duration-200 hover:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-50"
          >
            {/* Compact layout adhering strictly to sharp layout parameters */}
            <div className="flex flex-col h-20 justify-between">
              {/* Top Row: Monospace Role / Arrow Icon */}
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                  Contributor
                </span>
                <svg
                  className="w-3.5 h-3.5 text-zinc-300 transition-colors duration-200 group-hover:text-zinc-900 dark:text-zinc-600 dark:group-hover:text-zinc-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>

              {/* Bottom Row: Author Name */}
              <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {author.name}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}