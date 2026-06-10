import { BookCard } from "@/app/lib/definitions";
import Link from "next/link";
import Image from "next/image";

export default function Card({ id, title, authors, price, cover_url }: BookCard) {

  const authorsStr = authors?.map(a => (a.name)).join(',') || "Unknown Author"

  return (
    <div className="border flex flex-col border-neutral-800 p-4 rounded bg-snow-800 justify-between h-full">
      <div>
        {/* Book Cover Container */}
        <div className="relative flex w-full aspect-3/4 bg-neutral-800 rounded mb-3 overflow-hidden">
          {cover_url ? (
            <Image
              src={cover_url}
              alt={`Cover of ${title}`}
              fill
              sizes="(max-w-7xl) 25vw, 50vw"
              className="object-cover"
              priority={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-neutral-500">
              No Cover
            </div>
          )}
        </div>

        <h3 className="font-bold text-black text-lg line-clamp-2">{title}</h3>
        {authorsStr}
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <span className="font-mono text-black">${price}</span>
        <Link 
          href={`/book/${id}`}
          className="bg-white text-black px-3 py-1 text-sm rounded hover:bg-neutral-200 transition"
        >
          View
        </Link>
      </div>
    </div>
  );
}