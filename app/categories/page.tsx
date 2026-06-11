import CategoryGrid from '../ui/categories/category-grid';
import { fetchCategories } from '../lib/categories';

export default async function Page() {
  const categories = await fetchCategories();

  return (
    <main className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="py-12 sm:py-20">
        <CategoryGrid categories={categories} />
      </div>
    </main>
  );
}