import AccountSection from "@/app/ui/account/accountSection";
import { redirect } from 'next/navigation';
import { getSession } from '@/app/lib/auth/session';

export default async function Page() {

  const session = await getSession();

  // Render the component passing the user prop
  return (
    <main className="max-w-2xl mx-auto py-12 px-6">
      <AccountSection user={session?.user} />
    </main>
  );
}