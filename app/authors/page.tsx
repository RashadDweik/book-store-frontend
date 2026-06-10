import AuthorGrid from '@/app/ui/authors/author-grid';
import { fetchAuthors } from '@/app/lib/authors'

export default async function AuthorsPage() {
  // Fetch authors from backend
  const authors = await fetchAuthors();

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* Structural container matching the exact layout padding */}
      <div className="py-12 sm:py-20">
        <AuthorGrid authors={authors} />
      </div>
    </main>
  );
}