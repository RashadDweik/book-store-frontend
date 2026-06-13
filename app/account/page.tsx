import AccountSection from "@/app/ui/account/accountSection";
import { redirect } from 'next/navigation';
import { getSession } from '@/app/lib/auth/session';

export default async function Page() {
  // Fetch user data on the server
  const session = await getSession();

  // Guard clause: redirect if no user is found (not authenticated)
  if (!session?.user) {
    redirect('/');
  }

  // Render the component passing the user prop
  return (
    <main className="max-w-2xl mx-auto py-12 px-6">
      <AccountSection user={session.user} />
    </main>
  );
}