import { getOrderById } from "@/app/lib/orders/actions";
import { CancelOrderButton } from "@/app/ui/orders/cancel-button";
import OrderItemRow from "@/app/ui/orders/order-item-row";
import Link from "next/link";

interface OrderDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: OrderDetailsPageProps) {
  const { id: orderId } = await params;
  const order = await getOrderById(orderId);
  const isCancellable = order.status === "placed";

  return (
    <main className="max-w-2xl sm:max-w-3xl lg:max-w-5xl mx-auto px-4 py-16">

      {/* Back */}
      <Link
        href="/orders"
        className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-10"
      >
        ← All orders
      </Link>

      {/* Section header — matches AuthorGrid */}
      <div className="mb-8 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1">
          Order details
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <h3 className="text-2xl font-light tracking-tight text-zinc-900 dark:text-zinc-50 font-mono">
            #{order.id.slice(0, 8)}
          </h3>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
              {new Date(order.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              {order.status}
            </span>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="border border-zinc-200 dark:border-zinc-800">

        {/* Column labels */}
        <div className="hidden sm:flex items-center gap-4 px-5 py-2.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
          <span className="flex-1 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            Item
          </span>
          <span className="shrink-0 text-[10px] font-mono uppercase tracking-wider text-zinc-400 text-right">
            Subtotal
          </span>
        </div>

        <ul className="bg-white dark:bg-zinc-950">
          {order.items.map((item) => (
            <OrderItemRow key={item.id} item={item} />
          ))}
        </ul>

        {/* Total */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            Total
          </span>
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 tabular-nums">
            ${parseFloat(order.total_amount).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Cancel */}
      {isCancellable && (
        <div className="mt-6 flex justify-end">
          <CancelOrderButton orderId={order.id} />
        </div>
      )}

    </main>
  );
}