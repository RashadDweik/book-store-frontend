import Link from "next/link";
import { OrderRead } from "@/app/lib/definitions";

export default function OrderCard({ order }: { order: OrderRead }) {
  return (
    <li>
      <Link
        href={`/orders/${order.id}`}
        className="group relative block border border-zinc-200 bg-white px-5 py-4 sm:px-6 sm:py-5 transition-colors duration-200 hover:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-50"
      >
        {/* Mobile: two-line stacked */}
        <div className="flex items-center justify-between sm:hidden">
          <div>
            <p className="text-sm font-medium font-mono text-zinc-900 dark:text-zinc-100">
              #{order.id.slice(0, 8)}
            </p>
            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-1">
              {new Date(order.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
              <span className="mx-2 text-zinc-200 dark:text-zinc-700">·</span>
              {order.status}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
              ${parseFloat(order.total_amount).toFixed(2)}
            </p>
            <svg
              className="w-3.5 h-3.5 text-zinc-300 transition-colors duration-200 group-hover:text-zinc-900 dark:text-zinc-600 dark:group-hover:text-zinc-50"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </div>
        </div>

        {/* Desktop: 4-column row */}
        <div className="hidden sm:grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-6">

          {/* Order ID */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors mb-1">
              Order
            </p>
            <p className="text-sm font-medium font-mono text-zinc-900 dark:text-zinc-100">
              #{order.id.slice(0, 8)}
            </p>
          </div>

          {/* Date */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
              Placed
            </p>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              {new Date(order.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Status */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
              Status
            </p>
            <p className="text-sm font-mono uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
              {order.status}
            </p>
          </div>

          {/* Total + arrow */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Total
              </p>
              <p className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
                ${parseFloat(order.total_amount).toFixed(2)}
              </p>
            </div>
            <svg
              className="w-3.5 h-3.5 shrink-0 text-zinc-300 transition-colors duration-200 group-hover:text-zinc-900 dark:text-zinc-600 dark:group-hover:text-zinc-50"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </div>

        </div>
      </Link>
    </li>
  );
}