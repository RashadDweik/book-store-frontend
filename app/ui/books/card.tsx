import { BookCard } from "@/app/lib/definitions";
import Link from "next/link";
import Image from "next/image";

export default function Card({ id, title, authors, price, cover_url }: BookCard) {
  const authorsStr = authors?.map(a => a.name).join(', ') || "Unknown Author";

  return (
    <Link
      href={`/book/${id}`}
      className="group relative flex flex-col justify-between h-full bg-white border border-zinc-200 p-4 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.01] hover:border-zinc-900 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-50 dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
    >
      <div>
        {/* Book Cover Container */}
        <div className="relative w-full aspect-3/4 bg-zinc-50 border border-zinc-100 mb-4 overflow-hidden dark:bg-zinc-950 dark:border-zinc-800">
          {cover_url ? (
            <Image
              src={cover_url}
              alt={`Cover of ${title}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              priority={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] font-mono uppercase tracking-wider text-zinc-400">
              No Cover
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium tracking-tight text-zinc-900 dark:text-zinc-50 line-clamp-2 mb-1">
          {title}
        </h3>
        
        {/* Authors */}
        <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 line-clamp-1">
          {authorsStr}
        </p>
      </div>
      
      {/* Footer Details */}
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          ${price}
        </span>
        
        {/* View Action - Acts as a visual cue, inherits native parent hover state styling */}
        <div className="text-[10px] font-mono uppercase tracking-wider border border-zinc-200 bg-white px-3 py-1 text-zinc-900 transition-colors duration-200 group-hover:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:group-hover:border-zinc-50">
          View
        </div>
      </div>
    </Link>
  );
}