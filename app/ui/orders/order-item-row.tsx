import Image from "next/image";

interface OrderItemRowProps {
  item: {
    id: string;
    quantity: number;
    book: {
      title: string;
      price: string;
      cover_url?: string | null;
      author?: { name: string } | null;
    };
  };
}

export default function OrderItemRow({ item }: OrderItemRowProps) {
  const lineTotal = (parseFloat(item.book.price) * item.quantity).toFixed(2);

  return (
    <li className="group flex items-center gap-5 p-5 border-b border-zinc-100 dark:border-zinc-800 last:border-b-0">
      {/* Cover */}
      <div className="shrink-0 w-10 h-3.75rem sm:w-12 sm:h-4.5rem overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {item.book.cover_url ? (
          <Image
            src={item.book.cover_url}
            alt={item.book.title}
            width={48}
            height={72}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[10px] font-mono text-zinc-300 dark:text-zinc-600">
              —
            </span>
          </div>
        )}
      </div>

      {/* Title + author */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-2">
          {item.book.title}
        </p>
        {item.book.author && (
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 truncate">
            {item.book.author.name}
          </p>
        )}
        <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-2">
          Qty {item.quantity}
        </p>
      </div>

      {/* Line total */}
      <div className="shrink-0 text-right">
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 tabular-nums">
          ${lineTotal}
        </p>
        <p className="text-[10px] font-mono text-zinc-400 mt-0.5 tabular-nums">
          ${parseFloat(item.book.price).toFixed(2)} ea.
        </p>
      </div>
    </li>
  );
}
