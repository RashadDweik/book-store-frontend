import { getOrders } from "@/app/lib/orders/actions";
import { OrderRead } from "@/app/lib/definitions";
import OrderCard from "@/app/ui/orders/order-card";

export default async function OrdersPage() {
  const orders: OrderRead[] = await getOrders();

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16">

      {/* Section header — matches AuthorGrid */}
      <div className="mb-8 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1">
          Your
        </h2>
        <h3 className="text-2xl font-light tracking-tight text-zinc-900 dark:text-zinc-50">
          Orders
        </h3>
      </div>

      {orders.length === 0 ? (
        <div className="border border-zinc-200 dark:border-zinc-800 px-6 py-14 text-center">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            No orders placed yet
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </ul>
      )}

    </main>
  );
}