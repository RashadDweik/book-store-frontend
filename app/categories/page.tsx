import CategoryGrid from '../ui/categories/category-grid';
import { fetchCategories } from '../lib/categories';

export default async function Page() {
  // Fetch categories from backend
  const categories = await fetchCategories();

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* Structural container to pad out the page body beautifully */}
      <div className="py-12 sm:py-20">
        <CategoryGrid categories={categories} />
      </div>
    </main>
  );
}