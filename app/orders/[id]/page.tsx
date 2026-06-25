import { getOrderById } from "@/app/lib/orders/actions";
import { CancelOrderButton } from "@/app/ui/orders/cancel-button";

interface OrderDetailsPageProps {
  params: Promise<{ id: string }>
}

export default async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const resolvedParams = await params;
  const orderId = resolvedParams.id;
  const order = await getOrderById(orderId);
  const isCancellable = order.status === "placed"; // Adjust based on your backend logic

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-light">Order #{order.id.slice(0, 8)}</h1>
          <p className="text-zinc-400 mt-2">Status: <span className="font-medium text-zinc-900 capitalize">{order.status}</span></p>
        </div>
        {isCancellable && <CancelOrderButton orderId={order.id} />}
      </div>

      <div className="border border-zinc-200 divide-y divide-zinc-100">
        {order.items.map((item) => (
          <div key={item.id} className="p-6 flex justify-between text-sm">
            <span>{item.book.title} × {item.quantity}</span>
            <span>${(parseFloat(item.book.price) * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="p-6 bg-zinc-50 flex justify-between font-bold">
          <span>Total Amount</span>
          <span>${parseFloat(order.total_amount).toFixed(2)}</span>
        </div>
      </div>
    </main>
  );
}