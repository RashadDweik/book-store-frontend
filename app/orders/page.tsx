import { getOrders } from "@/app/lib/orders/actions";
import Link from "next/link";
import { OrderRead } from "@/app/lib/definitions";

export default async function OrdersPage() {
  const orders: OrderRead[] = await getOrders();

  return (
    <main className="max-w-3xl lg:max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-light mb-10">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-zinc-500">You have no orders yet.</p>
      ) : (
        <ul className="divide-y divide-zinc-100 border-t border-zinc-100">
          {orders.map((order) => (
            <li key={order.id} className="py-6 flex justify-between items-center">
              <div>
                <h2 className="font-medium">Order #{order.id.slice(0, 8)}</h2>
                <p className="text-sm text-zinc-400">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              
              <div className="text-right">
                <span className="block font-medium">${order.total_amount}</span>
                <Link 
                  href={`/orders/${order.id}`}
                  className="text-xs text-zinc-500 hover:text-zinc-900 underline"
                >
                  View Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}