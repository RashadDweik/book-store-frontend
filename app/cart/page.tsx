import Link from "next/link";
import { fetchCart } from "@/app/lib/cart/actions";
import { CartItem } from "@/app/lib/definitions";
import { CartItemRow } from "@/app/ui/cart/cart-item";
import { CheckoutForm } from "@/app/ui/orders/checkout-form";

export default async function Page() {
  const cart = await fetchCart();
  const cartItems = cart.items || [];

  const total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.book.price) * item.quantity,
    0
  );

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16">

      {/* Section header */}
      <div className="mb-8 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1">
          Your
        </h2>
        <h3 className="text-2xl font-light tracking-tight text-zinc-900 dark:text-zinc-50">
          Cart
        </h3>
        {cartItems.length > 0 && (
          <p className="text-xs font-mono text-zinc-400 mt-1">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </p>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="border border-zinc-200 dark:border-zinc-800 px-6 py-14 flex flex-col items-center gap-5 text-center">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            Your cart is empty
          </p>
          <Link
            href="/"
            className="text-xs font-mono uppercase tracking-wider border border-zinc-200 dark:border-zinc-700 px-5 py-2.5 text-zinc-600 dark:text-zinc-400 hover:border-zinc-900 dark:hover:border-zinc-50 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
          >
            Browse Catalog
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* Items */}
          <div className="flex-1 border border-zinc-200 dark:border-zinc-800">

            {/* Column labels */}
            <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] items-center gap-6 px-6 py-2.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Item</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Qty</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 w-16 text-right">Subtotal</span>
              <span className="w-[14px]" />
            </div>

            <ul className="bg-white dark:bg-zinc-950">
              {cartItems.map((item: CartItem) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </ul>
          </div>

          {/* Order summary */}
          <div className="lg:w-72 shrink-0">
            <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">

              <div className="px-5 py-3.5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                  Order Summary
                </span>
              </div>

              <div className="p-5 flex flex-col gap-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Subtotal</span>
                  <span className="text-sm tabular-nums text-zinc-900 dark:text-zinc-100">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Shipping</span>
                  <span className="text-xs font-mono text-zinc-400">At checkout</span>
                </div>

                <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 flex justify-between items-baseline">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-900 dark:text-zinc-100">Total</span>
                  <span className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">${total.toFixed(2)}</span>
                </div>

                <div className="pt-1">
                  <CheckoutForm />
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </main>
  );
}