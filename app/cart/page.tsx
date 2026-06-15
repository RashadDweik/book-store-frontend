import Link from "next/link";
import { fetchCart } from "@/app/lib/cart/actions";
import { CartItem } from "@/app/lib/definitions";
import { CartItemRow } from "@/app/ui/cart/cart-item";

export default async function Page() {
    
  const cart = await fetchCart();
  const cartItems = cart.items || [];

  const total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.book.price) * item.quantity,
    0
  );

  return (
    <main className="max-w-3xl lg:max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-light mb-2">My Cart</h1>
      <p className="text-sm text-zinc-400 mb-10">
        {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
      </p>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
          <p className="text-zinc-500">Your cart is empty.</p>
          <Link
            href="/"
            className="text-sm border border-zinc-300 px-5 py-2 hover:border-zinc-600 transition-colors"
          >
            Browse Catalog
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Items */}
          <ul className="flex-1 divide-y divide-zinc-100">
            {cartItems.map((item: CartItem) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </ul>

          {/* Order Summary */}
          <div className="lg:w-72 shrink-0">
            <div className="border border-zinc-200 p-6 flex flex-col gap-4">
              <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-500">
                Order Summary
              </h2>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Shipping</span>
                <span className="text-zinc-400">Calculated at checkout</span>
              </div>
              <div className="border-t border-zinc-100 pt-4 flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-zinc-900 text-white text-sm py-3 hover:bg-zinc-700 transition-colors">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}