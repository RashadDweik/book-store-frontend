import AccountSection from "@/app/ui/account/accountSection";
import { getSession } from '@/app/lib/auth/session';

export default async function Page() {

  //get the current user session
  const session = await getSession();

  // Render the component passing the user prop
  return (
    <main className="max-w-2xl mx-auto py-12 px-6">
      <AccountSection user={session?.user} />
    </main>
  );
}