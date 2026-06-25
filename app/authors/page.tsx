import AuthorGrid from '@/app/ui/authors/author-grid';
import { fetchAuthors } from '@/app/lib/authors/actions';

export default async function AuthorsPage() {
  const authors = await fetchAuthors();

  return (
    // Replaced bg-zinc-50 with pure white (dark:zinc-950) to make the grid item cards pop seamlessly against their borders
    <main className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="py-12 sm:py-20">
        <AuthorGrid authors={authors} />
      </div>
    </main>
  );
}