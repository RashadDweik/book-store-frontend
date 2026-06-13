import { getSession } from "@/app/lib/auth/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import { fetchWishlist } from "../lib/wishlist/wishlist";
import { WishlistResponse } from "../lib/definitions";
import { WishlistItemRow } from "@/app/ui/wishlist/wishlist-item";

export default async function WishlistPage() {
  const session = await getSession();

  if (!session.isAuthenticated) {
    redirect("/auth/login");
  }

  const wishlist: WishlistResponse = await fetchWishlist();
  const wishlistItems = wishlist.items || [];

  return (
    <main className="max-w-3xl lg:max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-light mb-2">My Wishlist</h1>
      <p className="text-sm text-zinc-400 mb-10">
        {wishlistItems.length} {wishlistItems.length === 1 ? "book" : "books"}
      </p>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
          <p className="text-zinc-500">Your wishlist is empty.</p>
          <Link
            href="/"
            className="text-sm border border-zinc-300 px-5 py-2 hover:border-zinc-600 transition-colors"
          >
            Browse Catalog
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-zinc-100">
          {wishlistItems.map((item) => (
            <WishlistItemRow key={item.id} item={item} />
          ))}
        </ul>
      )}
    </main>
  );
}